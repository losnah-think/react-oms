"use client";
import React, { useState } from "react";

// 쇼핑몰별 부가정보 타입
interface MallAdditionalInfo {
  id: string;
  productId: string;
  productName: string;
  mallId: string;
  mallName: string;
  
  // 검색 키워드
  searchKeywords: string[];
  
  // 상품 옵션 정보
  deliveryInfo: {
    freeDeliveryThreshold: number;
    deliveryFee: number;
    deliveryDays: string;
    returnPeriod: number;
  };
  
  // 마케팅 정보
  promotionInfo: {
    discountRate: number;
    promotionPeriod: string;
    couponAvailable: boolean;
    specialOffer: string;
  };
  
  // A/S 및 보증
  warrantyInfo: {
    warrantyPeriod: number;
    asCenter: string;
    asPhone: string;
  };
  
  // 상세 설명 
  detailDescription: string;
  careInstructions: string;
  
  // 쇼핑몰 특화 정보
  mallSpecificInfo: Record<string, any>;
  
  lastUpdated: string;
}

// 더미 데이터
const ADDITIONAL_INFO: MallAdditionalInfo[] = [
  {
    id: "ai001",
    productId: "P001",
    productName: "프리미엄 코튼 티셔츠",
    mallId: "naver",
    mallName: "네이버 스마트스토어",
    searchKeywords: ["코튼", "티셔츠", "베이직", "남녀공용", "기본템"],
    deliveryInfo: {
      freeDeliveryThreshold: 30000,
      deliveryFee: 3000,
      deliveryDays: "1-2일",
      returnPeriod: 7
    },
    promotionInfo: {
      discountRate: 15,
      promotionPeriod: "2024.01.15 - 2024.01.31",
      couponAvailable: true,
      specialOffer: "첫 구매 고객 5% 추가 할인"
    },
    warrantyInfo: {
      warrantyPeriod: 3,
      asCenter: "고객센터",
      asPhone: "1588-1234"
    },
    detailDescription: "100% 프리미엄 코튼 소재로 제작된 고품질 베이직 티셔츠입니다.",
    careInstructions: "찬물 세탁, 건조기 사용 금지, 다림질 시 중온",
    mallSpecificInfo: {
      naverBrand: "프리미엄베이직",
      naverOrigin: "대한민국",
      naverManufacturer: "OEM제조사"
    },
    lastUpdated: "2024-01-15T10:30:00"
  },
  {
    id: "ai002",
    productId: "P001",
    productName: "프리미엄 코튼 티셔츠",
    mallId: "coupang",
    mallName: "쿠팡",
    searchKeywords: ["코튼", "기본", "티셔츠", "남성", "여성"],
    deliveryInfo: {
      freeDeliveryThreshold: 12900,
      deliveryFee: 2500,
      deliveryDays: "당일/익일",
      returnPeriod: 14
    },
    promotionInfo: {
      discountRate: 20,
      promotionPeriod: "2024.01.10 - 2024.01.25",
      couponAvailable: false,
      specialOffer: "로켓와우 무료배송"
    },
    warrantyInfo: {
      warrantyPeriod: 1,
      asCenter: "쿠팡 고객센터",
      asPhone: "1588-7000"
    },
    detailDescription: "로켓배송 가능한 프리미엄 코튼 베이직 티셔츠",
    careInstructions: "물세탁 가능, 표백제 사용 금지",
    mallSpecificInfo: {
      coupangVendor: "프리미엄의류",
      rocketDelivery: true,
      adultOnly: false
    },
    lastUpdated: "2024-01-15T09:45:00"
  }
];

const MALLS = [
  { id: "naver", name: "네이버 스마트스토어", icon: "🟢" },
  { id: "coupang", name: "쿠팡", icon: "🟡" },
  { id: "gmarket", name: "G마켓", icon: "🔴" },
  { id: "11st", name: "11번가", icon: "🟢" }
];

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString("ko-KR", { 
    year: "numeric", month: "short", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

const MallAdditionalPage = () => {
  const [selectedMall, setSelectedMall] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<MallAdditionalInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredInfo = ADDITIONAL_INFO.filter(info => {
    const matchesMall = selectedMall === "all" || info.mallId === selectedMall;
    const matchesSearch = info.productName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMall && matchesSearch;
  });

  const openModal = (product: MallAdditionalInfo) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                📝 쇼핑몰별 부가 정보 관리
              </h1>
              <p className="text-gray-600 mt-2">각 쇼핑몰별로 필요한 추가 정보를 관리합니다</p>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              ➕ 부가 정보 추가
            </button>
          </div>
        </div>

        {/* 필터링 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">쇼핑몰 선택</label>
              <select
                value={selectedMall}
                onChange={(e) => setSelectedMall(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 쇼핑몰</option>
                {MALLS.map((mall) => (
                  <option key={mall.id} value={mall.id}>{mall.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상품명 검색</label>
              <input
                type="text"
                placeholder="상품명을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedMall("all");
                  setSearchTerm("");
                }}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔄 필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 부가정보 카드 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInfo.map((info) => (
            <div key={info.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {MALLS.find(m => m.id === info.mallId)?.icon}
                  </span>
                  <h3 className="font-semibold text-gray-900">{info.mallName}</h3>
                </div>
                <button
                  onClick={() => openModal(info)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  상세보기
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{info.productName}</h4>
                  <p className="text-sm text-gray-600">상품코드: {info.productId}</p>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">무료배송 기준</span>
                    <span className="font-medium">{info.deliveryInfo.freeDeliveryThreshold.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">할인율</span>
                    <span className="font-medium text-red-600">{info.promotionInfo.discountRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">검색키워드</span>
                    <span className="font-medium">{info.searchKeywords.length}개</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    마지막 업데이트: {formatDate(info.lastUpdated)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  수정
                </button>
                <button className="flex-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  복사
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredInfo.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">해당 조건의 부가 정보가 없습니다</h3>
            <p className="text-gray-500">새로운 부가 정보를 추가해보세요.</p>
          </div>
        )}
      </div>

      {/* 상세 정보 모달 */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
            
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">부가 정보 상세</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 기본 정보 */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">기본 정보</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">상품명:</span>
                          <span className="font-medium">{selectedProduct.productName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">쇼핑몰:</span>
                          <span className="font-medium">{selectedProduct.mallName}</span>
                        </div>
                      </div>
                    </div>

                    {/* 배송 정보 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">배송 정보</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">무료배송 기준:</span>
                          <span>{selectedProduct.deliveryInfo.freeDeliveryThreshold.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">배송비:</span>
                          <span>{selectedProduct.deliveryInfo.deliveryFee.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">배송일:</span>
                          <span>{selectedProduct.deliveryInfo.deliveryDays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">교환/반품:</span>
                          <span>{selectedProduct.deliveryInfo.returnPeriod}일</span>
                        </div>
                      </div>
                    </div>

                    {/* 프로모션 정보 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">프로모션</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">할인율:</span>
                          <span className="text-red-600 font-medium">{selectedProduct.promotionInfo.discountRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">기간:</span>
                          <span>{selectedProduct.promotionInfo.promotionPeriod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">쿠폰사용:</span>
                          <span>{selectedProduct.promotionInfo.couponAvailable ? "가능" : "불가"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 추가 정보 */}
                  <div className="space-y-4">
                    {/* 검색 키워드 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">검색 키워드</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedProduct.searchKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 상세 설명 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">상세 설명</h4>
                      <p className="text-sm text-gray-600">{selectedProduct.detailDescription}</p>
                    </div>

                    {/* 관리 정보 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">관리 정보</h4>
                      <p className="text-sm text-gray-600">{selectedProduct.careInstructions}</p>
                    </div>

                    {/* A/S 정보 */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">A/S 정보</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">보증기간:</span>
                          <span>{selectedProduct.warrantyInfo.warrantyPeriod}개월</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">A/S센터:</span>
                          <span>{selectedProduct.warrantyInfo.asCenter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">연락처:</span>
                          <span>{selectedProduct.warrantyInfo.asPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  닫기
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MallAdditionalPage;
