"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 더미 데이터
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
  const [selectedTab, setSelectedTab] = useState("basic");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const product = PRODUCT_DATA;

  const tabs = [
    { id: "basic", name: "기본 정보", icon: "📋" },
    { id: "variants", name: "옵션 관리", icon: "⚙️" },
    { id: "inventory", name: "재고 정보", icon: "📦" },
    { id: "sales", name: "판매 현황", icon: "📊" },
    { id: "history", name: "변경 이력", icon: "📝" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 브레드크럼 & 액션 버튼 */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
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
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                💾 저장
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                📝 수정
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                🗑️ 삭제
              </button>
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
