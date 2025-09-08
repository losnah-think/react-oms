// 쇼핑몰별 CSV 데이터 매핑 및 처리 로직

/**
 * 플랫폼별 CSV 컬럼 매핑 정의
 */
export const PLATFORM_MAPPINGS = {
  cafe24: {
    name: 'Cafe24',
    requiredColumns: ['상품코드', '상품명', '판매가'],
    columnMappings: {
      productCode: ['상품코드', 'product_code'],
      productName: ['상품명', 'product_name'],
      price: ['판매가', 'sell_price'],
      category: ['상품분류', 'category'],
      brand: ['브랜드', 'brand'],
      stock: ['재고수량', 'stock_qty'],
      description: ['상품설명', 'description'],
      images: ['이미지URL', 'image_url'],
      status: ['진열상태', 'display_yn']
    },
    characteristics: {
      encoding: 'EUC-KR',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'number'
    }
  },

  wisa: {
    name: '위사몰',
    requiredColumns: ['product_code', 'product_name', 'price'],
    columnMappings: {
      productCode: ['product_code', 'prd_code'],
      productName: ['product_name', 'prd_name'],
      price: ['price', 'sell_price'],
      category: ['category', 'cate_name'],
      brand: ['brand', 'brand_name'],
      stock: ['stock', 'stock_qty'],
      description: ['description', 'prd_desc'],
      images: ['image_url', 'img_url'],
      status: ['status', 'use_yn']
    },
    characteristics: {
      encoding: 'UTF-8',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'number'
    }
  },

  godo5: {
    name: '고도몰5',
    requiredColumns: ['goods_no', 'goods_nm', 'goods_price'],
    columnMappings: {
      productCode: ['goods_no', 'goodsNo'],
      productName: ['goods_nm', 'goodsNm'],
      price: ['goods_price', 'goodsPrice'],
      category: ['cate_cd', 'cateCd'],
      brand: ['brand_cd', 'brandCd'],
      stock: ['stock_cnt', 'stockCnt'],
      description: ['goods_desc', 'goodsDesc'],
      images: ['image_nm', 'imageNm'],
      status: ['disp_yn', 'dispYn']
    },
    characteristics: {
      encoding: 'UTF-8',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'number'
    }
  },

  smartstore: {
    name: '네이버 스마트스토어',
    requiredColumns: ['상품ID', '상품명', '판매가격'],
    columnMappings: {
      productCode: ['상품ID', 'product_id'],
      productName: ['상품명', 'product_name'],
      price: ['판매가격', 'sale_price'],
      category: ['카테고리', 'category'],
      brand: ['브랜드명', 'brand_name'],
      stock: ['재고량', 'stock'],
      description: ['상품상세', 'description'],
      images: ['대표이미지', 'main_image'],
      status: ['판매상태', 'sale_status']
    },
    characteristics: {
      encoding: 'UTF-8',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'string_with_comma'
    }
  },

  sellmate: {
    name: '자사',
    requiredColumns: ['공급처', '상품코드', '상품명', '옵션명'],
    columnMappings: {
      productCode: ['상품코드', '자체상품코드'],
      productName: ['상품명', '사입상품명'],
      price: ['대표판매가', '원가', '공급가'],
      category: ['상품분류', '상품출고분류'],
      brand: ['브랜드'],
      stock: ['현재재고', '안정재고'],
      description: ['상품설명'],
      images: ['대표이미지주소'],
      status: ['판매여부', '품절여부'],
      supplier: ['공급처'],
      optionName: ['옵션명', '사입옵션명'],
      barcode: ['바코드번호', '바코드번호2', '바코드번호3'],
      optionCode: ['옵션코드'],
      designer: ['상품디자이너'],
      registrar: ['상품등록자'],
      purchasePrice: ['원가'],
      supplyPrice: ['공급가'],
      marginPrice: ['마진금액'],
      salePrice: ['시중가'],
      consumerPrice: ['소비자가'],
      color: ['색상'],
      size: ['사이즈']
    },
    characteristics: {
      encoding: 'UTF-8',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'number',
      hasOptions: true,
      multiRowOptions: true
    }
  },

  makeshop: {
    name: '메이크샵',
    requiredColumns: ['prd_no', 'prd_name', 'prd_price'],
    columnMappings: {
      productCode: ['prd_no', 'product_no'],
      productName: ['prd_name', 'product_name'],
      price: ['prd_price', 'product_price'],
      category: ['ctg_no', 'category_no'],
      brand: ['brand_name', 'brand'],
      stock: ['stock_qty', 'stock'],
      description: ['prd_detail', 'detail'],
      images: ['prd_img', 'product_image'],
      status: ['prd_status', 'status']
    },
    characteristics: {
      encoding: 'EUC-KR',
      delimiter: ',',
      hasHeader: true,
      priceFormat: 'number'
    }
  }
};

/**
 * CSV 헤더 분석을 통한 플랫폼 감지
 * @param {string[]} headers - CSV 헤더 배열
 * @returns {object} - 감지 결과 (platform, confidence)
 */
export const detectPlatform = (headers) => {
  const results = [];
  
  // 셀메이트(자사) 고유 식별자 확인
  const sellmateUniqueColumns = ['공급처', '옵션코드', '사입상품명', '상품디자이너', '상품등록자', '자체상품코드'];
  const hasSellmateUnique = sellmateUniqueColumns.filter(col => 
    headers.some(header => header === col)
  ).length;
  
  // Cafe24 고유 식별자 확인 (셀메이트와 구분하기 위해)
  const cafe24UniqueColumns = ['상품분류', '진열상태', 'display_yn'];
  const hasCafe24Unique = cafe24UniqueColumns.filter(col => 
    headers.some(header => header.includes(col))
  ).length;
  
  Object.keys(PLATFORM_MAPPINGS).forEach(platform => {
    const mapping = PLATFORM_MAPPINGS[platform];
    let matches = 0;
    let totalColumns = 0;
    
    // 각 매핑 컬럼에 대해 헤더에서 찾기
    Object.values(mapping.columnMappings).forEach(columnVariations => {
      totalColumns++;
      const found = columnVariations.some(variation => 
        headers.some(header => 
          header.toLowerCase().includes(variation.toLowerCase()) ||
          variation.toLowerCase().includes(header.toLowerCase())
        )
      );
      if (found) matches++;
    });
    
    // 필수 컬럼이 모두 있는지 확인
    const hasRequiredColumns = mapping.requiredColumns.every(required =>
      headers.some(header => 
        header.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(header.toLowerCase())
      )
    );
    
    let confidence = Math.round((matches / totalColumns) * 100);
    
    // 셀메이트(자사) 특별 처리 - 고유 컬럼이 많을수록 신뢰도 증가
    if (platform === 'sellmate') {
      if (hasSellmateUnique >= 3) {
        confidence += 30; // 보너스 점수
      }
      // Cafe24 특성이 있으면 신뢰도 감소
      if (hasCafe24Unique > 0) {
        confidence -= 20;
      }
    }
    
    // Cafe24 특별 처리 - 셀메이트 특성이 있으면 신뢰도 감소
    if (platform === 'cafe24') {
      if (hasSellmateUnique >= 2) {
        confidence -= 30; // 셀메이트일 가능성이 높으면 Cafe24 신뢰도 감소
      }
    }
    
    // 최대 100으로 제한
    confidence = Math.min(100, Math.max(0, confidence));
    
    results.push({
      platform,
      name: mapping.name,
      matches,
      totalColumns,
      confidence,
      hasRequiredColumns,
      uniqueScore: platform === 'sellmate' ? hasSellmateUnique : 0
    });
  });
  
  // 가장 높은 신뢰도를 가진 플랫폼 선택
  const bestMatch = results
    .filter(result => result.hasRequiredColumns)
    .sort((a, b) => b.confidence - a.confidence)[0];
  
  return bestMatch || { platform: 'unknown', confidence: 0 };
};

/**
 * 플랫폼별 데이터 변환
 * @param {string} platform - 감지된 플랫폼
 * @param {object[]} rawData - 원본 CSV 데이터
 * @returns {object[]} - 표준화된 상품 데이터
 */
export const transformPlatformData = (platform, rawData) => {
  const mapping = PLATFORM_MAPPINGS[platform];
  if (!mapping) {
    throw new Error(`Unsupported platform: ${platform}`);
  }
  
  return rawData.map(row => {
    const transformed = {
      platform,
      originalData: row // 원본 데이터 보존
    };
    
    // 각 표준 필드에 대해 매핑
    Object.keys(mapping.columnMappings).forEach(standardField => {
      const columnVariations = mapping.columnMappings[standardField];
      
      // 첫 번째로 매칭되는 컬럼의 값 사용
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
    
    // 가격 데이터 정규화
    if (transformed.price) {
      transformed.price = normalizePrice(transformed.price, mapping.characteristics.priceFormat);
    }
    
    return transformed;
  });
};

/**
 * 가격 데이터 정규화
 * @param {string|number} price - 원본 가격
 * @param {string} format - 가격 형식
 * @returns {number} - 정규화된 가격
 */
const normalizePrice = (price, format) => {
  if (typeof price === 'number') {
    return price;
  }
  
  let cleanPrice = String(price).replace(/[^\d]/g, ''); // 숫자가 아닌 문자 제거
  
  switch (format) {
    case 'string_with_comma':
      cleanPrice = String(price).replace(/,/g, '');
      break;
    case 'number':
      cleanPrice = String(price).replace(/[^\d.]/g, '');
      break;
    default:
      cleanPrice = String(price).replace(/[^\d]/g, '');
  }
  
  return parseInt(cleanPrice) || 0;
};

/**
 * 백엔드 API 연동을 위한 데이터 전송
 * @param {string} platform - 감지된 플랫폼
 * @param {object[]} transformedData - 변환된 데이터
 * @returns {Promise} - API 응답
 */
export const sendToBackend = async (platform, transformedData) => {
  try {
    const response = await fetch('/api/products/csv-import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        platform,
        data: transformedData,
        timestamp: new Date().toISOString(),
        totalCount: transformedData.length
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('백엔드 전송 실패:', error);
    throw error;
  }
};

/**
 * CSV 파일 검증
 * @param {File} file - 업로드된 CSV 파일
 * @returns {object} - 검증 결과
 */
export const validateCSVFile = (file) => {
  const errors = [];
  const warnings = [];
  
  // 파일 크기 체크 (10MB 제한)
  if (file.size > 10 * 1024 * 1024) {
    errors.push('파일 크기가 10MB를 초과합니다.');
  }
  
  // 파일 확장자 체크
  if (!file.name.toLowerCase().endsWith('.csv')) {
    errors.push('CSV 파일만 업로드 가능합니다.');
  }
  
  // MIME 타입 체크
  if (file.type && !['text/csv', 'application/csv'].includes(file.type)) {
    warnings.push('파일 형식이 정확하지 않을 수 있습니다.');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};
