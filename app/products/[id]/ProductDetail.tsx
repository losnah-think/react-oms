"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// HTML 에디터 컴포넌트
const HTMLEditor = ({ value, onChange, placeholder }: { 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* 에디터 툴바 */}
      <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">상세 설명</span>
          <span className="text-xs text-gray-500">(HTML 편집 가능)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreviewMode(false)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              !isPreviewMode 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 편집
          </button>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              isPreviewMode 
                ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            👁️ 미리보기
          </button>
        </div>
      </div>
      
      {/* 에디터 영역 */}
      <div className="min-h-[300px]">
        {!isPreviewMode ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[300px] p-4 border-0 resize-none focus:outline-none focus:ring-0 font-mono text-sm"
            style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
          />
        ) : (
          <div className="p-4 prose prose-sm max-w-none">
            {value ? (
              <div 
                dangerouslySetInnerHTML={{ __html: value }}
                className="text-gray-800 leading-relaxed"
              />
            ) : (
              <div className="text-gray-500 italic text-center py-8">
                미리보기할 내용이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 에디터 도움말 */}
      {!isPreviewMode && (
        <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
          <div className="flex flex-wrap gap-4">
            <span><code>&lt;h1&gt;</code> - 제목</span>
            <span><code>&lt;p&gt;</code> - 문단</span>
            <span><code>&lt;strong&gt;</code> - 굵게</span>
            <span><code>&lt;em&gt;</code> - 기울임</span>
            <span><code>&lt;ul&gt;&lt;li&gt;</code> - 목록</span>
            <span><code>&lt;img src=""&gt;</code> - 이미지</span>
            <span><code>&lt;a href=""&gt;</code> - 링크</span>
          </div>
        </div>
      )}
    </div>
  );
};

// 더미 데이터 (HTML 상세 설명 추가)
const PRODUCT_DATA = {
  id: "P-1001",
  name: "프리미엄 코튼 티셔츠",
  code: "SHIRT-001",
  supplierName: "Fashion House Co.",
  category: "상의 > 티셔츠",
  brand: "Premium Basic",
  description: `고급스러운 프리미엄 코튼 소재로 제작된 베이직 티셔츠입니다. 
부드럽고 편안한 착용감과 우수한 내구성을 자랑하며, 
다양한 스타일에 매치하기 좋은 심플한 디자인이 특징입니다.`,
  detailHtml: `<h2>🌟 프리미엄 코튼 티셔츠의 특징</h2>
<p>최고급 100% 코튼 소재로 제작된 <strong>프리미엄 베이직 티셔츠</strong>입니다.</p>

<h3>📦 상품 특징</h3>
<ul>
  <li><strong>소재</strong>: 100% 프리미엄 코튼</li>
  <li><strong>두께</strong>: 중간 두께 (200gsm)</li>
  <li><strong>핏</strong>: 레귤러 핏</li>
  <li><strong>시즌</strong>: 사계절 착용 가능</li>
</ul>

<h3>🎨 컬러 옵션</h3>
<p>다양한 컬러로 준비되어 있어 <em>개인 취향에 맞게 선택</em>하실 수 있습니다.</p>
<ul>
  <li>🤍 화이트 - 깔끔하고 베이직한 컬러</li>
  <li>🖤 블랙 - 세련되고 고급스러운 컬러</li>
  <li>🩶 그레이 - 어떤 스타일에도 매치하기 좋은 컬러</li>
</ul>

<h3>📏 사이즈 가이드</h3>
<table border="1" style="border-collapse: collapse; width: 100%; margin: 16px 0;">
  <tr style="background-color: #f9f9f9;">
    <th style="padding: 8px; text-align: center;">사이즈</th>
    <th style="padding: 8px; text-align: center;">가슴둘레 (cm)</th>
    <th style="padding: 8px; text-align: center;">총장 (cm)</th>
    <th style="padding: 8px; text-align: center;">어깨너비 (cm)</th>
  </tr>
  <tr>
    <td style="padding: 8px; text-align: center;"><strong>S</strong></td>
    <td style="padding: 8px; text-align: center;">94</td>
    <td style="padding: 8px; text-align: center;">66</td>
    <td style="padding: 8px; text-align: center;">44</td>
  </tr>
  <tr>
    <td style="padding: 8px; text-align: center;"><strong>M</strong></td>
    <td style="padding: 8px; text-align: center;">99</td>
    <td style="padding: 8px; text-align: center;">69</td>
    <td style="padding: 8px; text-align: center;">47</td>
  </tr>
  <tr>
    <td style="padding: 8px; text-align: center;"><strong>L</strong></td>
    <td style="padding: 8px; text-align: center;">104</td>
    <td style="padding: 8px; text-align: center;">72</td>
    <td style="padding: 8px; text-align: center;">50</td>
  </tr>
</table>

<h3>🧺 세탁 방법</h3>
<div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 16px; margin: 16px 0;">
  <p><strong>💡 세탁 TIP</strong></p>
  <ul>
    <li>찬물(30°C 이하)에서 세탁해주세요</li>
    <li>표백제 사용을 금지합니다</li>
    <li>건조기 사용 시 저온으로 설정해주세요</li>
    <li>다림질 시 중온(150°C)으로 설정해주세요</li>
  </ul>
</div>

<h3>✨ 고객 리뷰</h3>
<blockquote style="border-left: 4px solid #10b981; padding-left: 16px; margin: 16px 0; font-style: italic; color: #374151;">
  "정말 부드럽고 착용감이 좋아요! 여러 번 세탁해도 늘어나지 않고 모양이 그대로 유지됩니다." <br>
  <strong>- 김○○ 고객님</strong>
</blockquote>

<p style="text-align: center; margin: 32px 0; padding: 16px; background-color: #fef3c7; border-radius: 8px;">
  <strong>🎉 지금 주문하면 무료배송! 📦</strong>
</p>`,
  images: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
  ],
  salePrice: 29000,
  purchasePrice: 15000,
  supplyPrice: 20000,
  marginPrice: 9000,
  marginRate: 31.0,
  stockQuantity: 245,
  stockStatus: "재고있음",
  createdAt: "2025-01-15T09:30:00",
  updatedAt: "2025-01-20T14:22:00",
  status: "판매중",
  variants: [
    {
      id: "V-1001-1",
      attrs: { 색상: "화이트", 사이즈: "S" },
      sku: "SHIRT-001-WH-S",
      price: 29000,
      stock: 45,
      barcode: ["8801234567890"]
    },
    {
      id: "V-1001-2", 
      attrs: { 색상: "화이트", 사이즈: "M" },
      sku: "SHIRT-001-WH-M",
      price: 29000,
      stock: 67,
      barcode: ["8801234567891"]
    },
    {
      id: "V-1001-3",
      attrs: { 색상: "화이트", 사이즈: "L" },
      sku: "SHIRT-001-WH-L", 
      price: 29000,
      stock: 52,
      barcode: ["8801234567892"]
    },
    {
      id: "V-1001-4",
      attrs: { 색상: "블랙", 사이즈: "S" },
      sku: "SHIRT-001-BK-S",
      price: 29000,
      stock: 33,
      barcode: ["8801234567893"]
    },
    {
      id: "V-1001-5",
      attrs: { 색상: "블랙", 사이즈: "M" },
      sku: "SHIRT-001-BK-M",
      price: 29000,
      stock: 48,
      barcode: ["8801234567894"]
    }
  ],
  tags: ["베이직", "코튼", "사계절", "인기상품"],
  salesData: {
    totalSales: 1247,
    thisMonth: 89,
    avgRating: 4.7,
    reviewCount: 234
  }
};

const formatPrice = (price: number) => 
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(price);

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString("ko-KR", { 
    year: "numeric", month: "long", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "판매중": "bg-green-100 text-green-800 border-green-200",
    "품절": "bg-red-100 text-red-800 border-red-200", 
    "판매중지": "bg-gray-100 text-gray-800 border-gray-200",
    "재고있음": "bg-blue-100 text-blue-800 border-blue-200"
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[status] || colors["재고있음"]}`}>
      {status}
    </span>
  );
};

const ProductDetail = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("detail"); // 기본 탭을 상세 설명으로 변경
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [detailHtml, setDetailHtml] = useState(PRODUCT_DATA.detailHtml);
  const [isEditing, setIsEditing] = useState(false);
  const product = PRODUCT_DATA;

  const tabs = [
    { id: "detail", name: "상세 설명", icon: "📄" }, // 첫 번째로 이동
    { id: "basic", name: "기본 정보", icon: "📋" },
    { id: "variants", name: "옵션 관리", icon: "⚙️" },
    { id: "inventory", name: "재고 정보", icon: "📦" },
    { id: "sales", name: "판매 현황", icon: "📊" },
    { id: "history", name: "변경 이력", icon: "📝" }
  ];

  const handleSave = () => {
    // 실제로는 API 호출로 저장
    console.log('상세 설명 저장:', detailHtml);
    setIsEditing(false);
    alert('상세 설명이 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 브레드크럼 & 액션 버튼 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← 목록으로
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <span>상품 관리</span>
                <span>›</span>
                <span>상품 목록</span>
                <span>›</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    💾 저장
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setDetailHtml(product.detailHtml); // 원본으로 복원
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    ❌ 취소
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    📝 상세설명 수정
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    ⚙️ 상품 설정
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    🗑️ 삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* 상품 기본 정보 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 이미지 영역 */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* 썸네일 이미지들 */}
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <StatusBadge status={product.status} />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>상품코드: <span className="font-mono font-medium text-gray-900">{product.code}</span></span>
                  <span>•</span>
                  <span>브랜드: <span className="font-medium text-gray-900">{product.brand}</span></span>
                </div>

                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* 가격 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-sm text-blue-600 font-medium mb-1">판매가</div>
                  <div className="text-2xl font-bold text-blue-900">{formatPrice(product.salePrice)}</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="text-sm text-green-600 font-medium mb-1">마진률</div>
                  <div className="text-2xl font-bold text-green-900">{product.marginRate}%</div>
                </div>
              </div>

              {/* 재고 & 판매 정보 */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{product.stockQuantity}</div>
                  <div className="text-sm text-gray-600">총 재고</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">{product.salesData.totalSales}</div>
                  <div className="text-sm text-gray-600">총 판매량</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900">★{product.salesData.avgRating}</div>
                  <div className="text-sm text-gray-600">평균 평점</div>
                </div>
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* 상세 설명 탭 (첫 번째) */}
            {selectedTab === "detail" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">📄 상품 상세 설명</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      ✏️ 편집하기
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <HTMLEditor
                      value={detailHtml}
                      onChange={setDetailHtml}
                      placeholder="상품의 상세 설명을 HTML 형태로 입력하세요..."
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setDetailHtml(product.detailHtml);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        💾 저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="p-6 prose prose-lg max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ __html: detailHtml }}
                        className="text-gray-800 leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 기본 정보 탭 */}
            {selectedTab === "basic" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">상품 기본 정보</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">상품명</span>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">상품코드</span>
                        <span className="font-mono font-medium text-gray-900">{product.code}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">카테고리</span>
                        <span className="text-gray-900">{product.category}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">공급처</span>
                        <span className="text-gray-900">{product.supplierName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">등록일</span>
                        <span className="text-gray-900">{formatDate(product.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">가격 정보</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">판매가</span>
                        <span className="font-bold text-blue-600">{formatPrice(product.salePrice)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">매입가</span>
                        <span className="text-gray-900">{formatPrice(product.purchasePrice)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">공급가</span>
                        <span className="text-gray-900">{formatPrice(product.supplyPrice)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">마진</span>
                        <span className="font-bold text-green-600">{formatPrice(product.marginPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 옵션 관리 탭 */}
            {selectedTab === "variants" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">상품 옵션 ({product.variants.length}개)</h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">옵션</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">SKU</th>
                        <th className="py-4 px-6 text-right text-sm font-medium text-gray-900">가격</th>
                        <th className="py-4 px-6 text-right text-sm font-medium text-gray-900">재고</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-900">바코드</th>
                        <th className="py-4 px-6 text-center text-sm font-medium text-gray-900">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {product.variants.map((variant) => (
                        <tr key={variant.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              {Object.entries(variant.attrs).map(([key, value]) => (
                                <span key={key} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-mono text-sm text-gray-900">{variant.sku}</td>
                          <td className="py-4 px-6 text-right font-medium text-gray-900">{formatPrice(variant.price)}</td>
                          <td className="py-4 px-6 text-right">
                            <span className={`font-medium ${variant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {variant.stock}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">{variant.barcode.join(", ")}</td>
                          <td className="py-4 px-6 text-center">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              수정
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 다른 탭들은 간단히 표시 */}
            {selectedTab === "inventory" && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">재고 정보</h3>
                <p className="text-gray-600">재고 관련 상세 정보가 표시됩니다.</p>
              </div>
            )}

            {selectedTab === "sales" && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">판매 현황</h3>
                <p className="text-gray-600">판매 통계 및 분석 데이터가 표시됩니다.</p>
              </div>
            )}

            {selectedTab === "history" && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">변경 이력</h3>
                <p className="text-gray-600">상품 변경 이력이 시간순으로 표시됩니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
