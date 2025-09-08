// API 엔드포인트: /api/products/csv-import
// 쇼핑몰별 CSV 데이터를 받아서 처리하는 백엔드 API

import { NextResponse } from 'next/server';
import { transformPlatformData, PLATFORM_MAPPINGS } from '../../../../lib/csv-processor';

export async function POST(request) {
  try {
    const body = await request.json();
    const { platform, data, timestamp, totalCount } = body;

    // 입력 데이터 검증
    if (!platform || !data || !Array.isArray(data)) {
      return NextResponse.json(
        { success: false, error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 지원하는 플랫폼인지 확인
    if (!PLATFORM_MAPPINGS[platform]) {
      return NextResponse.json(
        { success: false, error: `지원하지 않는 플랫폼입니다: ${platform}` },
        { status: 400 }
      );
    }

    console.log(`[CSV Import] 플랫폼: ${platform}, 데이터 개수: ${totalCount}`);

    // 플랫폼별 데이터 처리
    const processedData = await processPlatformData(platform, data);

    // 데이터베이스 저장 (실제 구현 필요)
    const savedProducts = await saveProductsToDatabase(processedData);

    // 처리 결과 반환
    return NextResponse.json({
      success: true,
      message: '데이터 처리가 완료되었습니다.',
      data: {
        platform,
        totalReceived: totalCount,
        totalProcessed: processedData.length,
        totalSaved: savedProducts.length,
        timestamp,
        processedAt: new Date().toISOString(),
        summary: generateProcessingSummary(processedData)
      }
    });

  } catch (error) {
    console.error('[CSV Import] 처리 중 오류:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '서버 내부 오류가 발생했습니다.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * 플랫폼별 데이터 처리 로직
 */
async function processPlatformData(platform, rawData) {
  const processed = [];
  const errors = [];

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    
    try {
      // 기본 데이터 변환
      const transformed = transformSingleProduct(platform, row);
      
      // 플랫폼별 특수 처리
      const specialized = await applyPlatformSpecificLogic(platform, transformed);
      
      // 데이터 검증
      const validated = validateProductData(specialized);
      
      if (validated.isValid) {
        processed.push({
          ...specialized,
          rowIndex: i + 1,
          originalData: row
        });
      } else {
        errors.push({
          rowIndex: i + 1,
          errors: validated.errors,
          data: row
        });
      }
    } catch (error) {
      errors.push({
        rowIndex: i + 1,
        errors: [`처리 중 오류: ${error.message}`],
        data: row
      });
    }
  }

  if (errors.length > 0) {
    console.warn(`[CSV Import] ${errors.length}개 행에서 오류 발생:`, errors);
  }

  return { processed, errors };
}

/**
 * 단일 상품 데이터 변환
 */
function transformSingleProduct(platform, row) {
  const mapping = PLATFORM_MAPPINGS[platform];
  const transformed = {
    platform,
    source: 'csv_import',
    importedAt: new Date().toISOString()
  };

  // 표준 필드 매핑
  Object.keys(mapping.columnMappings).forEach(standardField => {
    const columnVariations = mapping.columnMappings[standardField];
    
    for (const variation of columnVariations) {
      const matchingKey = Object.keys(row).find(key =>
        key.toLowerCase().includes(variation.toLowerCase()) ||
        variation.toLowerCase().includes(key.toLowerCase())
      );
      
      if (matchingKey && row[matchingKey]) {
        transformed[standardField] = row[matchingKey];
        break;
      }
    }
  });

  return transformed;
}

/**
 * 플랫폼별 특수 로직 적용
 */
async function applyPlatformSpecificLogic(platform, data) {
  switch (platform) {
    case 'cafe24':
      return applyCafe24Logic(data);
    case 'wisa':
      return applyWisaLogic(data);
    case 'godo5':
      return applyGodo5Logic(data);
    case 'smartstore':
      return applySmartstoreLogic(data);
    case 'makeshop':
      return applyMakeshopLogic(data);
    case 'sellmate':
      return applySellmateLogic(data);
    default:
      return data;
  }
}

// 각 플랫폼별 특수 처리 함수들
function applyCafe24Logic(data) {
  // Cafe24 특수 로직
  if (data.price) {
    data.price = parseInt(data.price.toString().replace(/[^\d]/g, '')) || 0;
  }
  
  // Cafe24 카테고리 코드 처리
  if (data.category) {
    data.categoryCode = data.category;
    data.categoryPath = resolveCafe24CategoryPath(data.category);
  }
  
  return data;
}

function applyWisaLogic(data) {
  // 위사몰 특수 로직
  if (data.status) {
    data.isActive = data.status.toLowerCase() === 'y' || data.status === '1';
  }
  
  return data;
}

function applyGodo5Logic(data) {
  // 고도몰5 특수 로직
  if (data.productCode) {
    data.productCode = data.productCode.toString().padStart(8, '0'); // 8자리로 패딩
  }
  
  return data;
}

function applySmartstoreLogic(data) {
  // 네이버 스마트스토어 특수 로직
  if (data.price && typeof data.price === 'string') {
    data.price = parseInt(data.price.replace(/,/g, '')) || 0;
  }
  
  // 네이버 카테고리 매핑
  if (data.category) {
    data.naverCategoryId = resolveNaverCategoryId(data.category);
  }
  
  return data;
}

function applyMakeshopLogic(data) {
  // 메이크샵 특수 로직
  if (data.brand) {
    data.brandId = resolveMakeshopBrandId(data.brand);
  }
  
  return data;
}

function applySellmateLogic(data) {
  // 셀메이트(자사) 특수 로직
  
  // 가격 정보 우선순위 처리 (대표판매가 > 공급가 > 원가)
  if (data.price) {
    // 대표판매가가 있으면 우선 사용
    const representativePrice = data.대표판매가 || data.price;
    data.price = parseInt(representativePrice.toString().replace(/[^\d]/g, '')) || 0;
  }
  
  // 옵션 처리
  if (data.optionName && data.optionName !== '단일옵션') {
    data.hasOptions = true;
    data.optionType = 'multiple';
  } else {
    data.hasOptions = false;
    data.optionType = 'single';
  }
  
  // 재고 상태 처리
  if (data.stock) {
    data.currentStock = parseInt(data.stock) || 0;
  }
  
  // 판매 상태 처리
  if (data.status) {
    data.isActive = data.status !== '품절' && data.status !== 'N';
  }
  
  // 공급처 정보 처리
  if (data.supplier) {
    data.supplierName = data.supplier;
  }
  
  // 색상/사이즈 옵션 분리
  if (data.color || data.size) {
    data.optionAttributes = {};
    if (data.color) data.optionAttributes.color = data.color;
    if (data.size) data.optionAttributes.size = data.size;
  }
  
  // 바코드 배열 처리
  if (data.barcode) {
    const barcodes = [data.barcode, data.바코드번호2, data.바코드번호3]
      .filter(Boolean)
      .filter(code => code.trim() !== '');
    data.barcodes = barcodes;
  }
  
  // 이미지 URL 검증
  if (data.images && data.images.startsWith('http')) {
    data.imageUrl = data.images;
  }
  
  return data;
}

/**
 * 상품 데이터 검증
 */
function validateProductData(data) {
  const errors = [];
  
  // 필수 필드 검증
  if (!data.productCode) {
    errors.push('상품코드가 없습니다.');
  }
  
  if (!data.productName || data.productName.trim().length === 0) {
    errors.push('상품명이 없습니다.');
  }
  
  if (!data.price || isNaN(data.price) || data.price < 0) {
    errors.push('올바르지 않은 가격입니다.');
  }
  
  // 상품명 길이 검증
  if (data.productName && data.productName.length > 200) {
    errors.push('상품명이 너무 깁니다. (최대 200자)');
  }
  
  // 가격 범위 검증
  if (data.price > 100000000) {
    errors.push('가격이 너무 높습니다. (최대 1억원)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 데이터베이스 저장 (Mock 함수 - 실제 구현 필요)
 */
async function saveProductsToDatabase(processedData) {
  // 실제 환경에서는 데이터베이스 연동 로직 구현
  console.log(`[DB] ${processedData.processed.length}개 상품 저장 중...`);
  
  // Mock 저장 로직
  const saved = processedData.processed.map(product => ({
    ...product,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  console.log(`[DB] ${saved.length}개 상품 저장 완료`);
  return saved;
}

/**
 * 처리 요약 생성
 */
function generateProcessingSummary(processedData) {
  const { processed, errors } = processedData;
  
  return {
    totalProcessed: processed.length,
    totalErrors: errors.length,
    successRate: Math.round((processed.length / (processed.length + errors.length)) * 100),
    platforms: [...new Set(processed.map(p => p.platform))],
    priceRange: {
      min: Math.min(...processed.map(p => p.price || 0)),
      max: Math.max(...processed.map(p => p.price || 0)),
      average: Math.round(processed.reduce((sum, p) => sum + (p.price || 0), 0) / processed.length)
    }
  };
}

// 유틸리티 함수들 (실제 구현 필요)
function resolveCafe24CategoryPath(categoryCode) {
  // Cafe24 카테고리 코드를 경로로 변환
  return `카테고리/${categoryCode}`;
}

function resolveNaverCategoryId(categoryName) {
  // 네이버 카테고리명을 ID로 변환
  const categoryMap = {
    '의류': '50000000',
    '신발': '50000001',
    // ... 추가 매핑
  };
  return categoryMap[categoryName] || '50000000';
}

function resolveMakeshopBrandId(brandName) {
  // 메이크샵 브랜드명을 ID로 변환
  return brandName ? brandName.toLowerCase().replace(/\s/g, '_') : null;
}
