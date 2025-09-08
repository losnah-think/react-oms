"use client";
import React, { useState } from "react";
import Link from "next/link";

// 쇼핑몰 정보 타입
interface Mall {
  id: string;
  name: string;
  platform: string;
  status: string;
  lastSync: string;
  productCount: number;
  icon: string;
}

// 쇼핑몰별 상품 정보 타입
interface MallProduct {
  id: string;
  productId: string;
  productName: string;
  mallId: string;
  mallName: string;
  mallProductId: string;
  mallProductName: string;
  mallPrice: number;
  originalPrice: number;
  mallCategory: string;
  status: string;
  stockSync: boolean;
  lastUpdated: string;
}

// 더미 데이터
const MALLS: Mall[] = [
  {
    id: "naver",
    name: "네이버 스마트스토어",
    platform: "NAVER",
    status: "연동중",
    lastSync: "2024-01-15T10:30:00",
    productCount: 245,
    icon: "🟢"
  },
  {
    id: "coupang",
    name: "쿠팡",
    platform: "COUPANG", 
    status: "연동중",
    lastSync: "2024-01-15T10:25:00",
    productCount: 180,
    icon: "🟡"
  },
  {
    id: "gmarket",
    name: "G마켓",
    platform: "GMARKET",
    status: "일시정지",
    lastSync: "2024-01-14T15:20:00",
    productCount: 98,
    icon: "🔴"
  },
  {
    id: "11st",
    name: "11번가",
    platform: "11ST",
    status: "연동중",
    lastSync: "2024-01-15T09:45:00",
    productCount: 67,
    icon: "🟢"
  }
];

const MALL_PRODUCTS: MallProduct[] = [
  {
    id: "mp001",
    productId: "P001",
    productName: "프리미엄 코튼 티셔츠",
    mallId: "naver",
    mallName: "네이버 스마트스토어",
    mallProductId: "NS12345",
    mallProductName: "[특가] 프리미엄 코튼 기본 티셔츠",
    mallPrice: 29900,
    originalPrice: 25000,
    mallCategory: "의류 > 상의 > 티셔츠",
    status: "판매중",
    stockSync: true,
    lastUpdated: "2024-01-15T10:30:00"
  },
  {
    id: "mp002",
    productId: "P001",
    productName: "프리미엄 코튼 티셔츠",
    mallId: "coupang",
    mallName: "쿠팡",
    mallProductId: "CP78901",
    mallProductName: "프리미엄 코튼 베이직 티셔츠 남녀공용",
    mallPrice: 31900,
    originalPrice: 25000,
    mallCategory: "패션의류 > 남성의류 > 상의",
    status: "판매중",
    stockSync: true,
    lastUpdated: "2024-01-15T10:25:00"
  },
  {
    id: "mp003",
    productId: "P002",
    productName: "데님 청바지",
    mallId: "gmarket",
    mallName: "G마켓",
    mallProductId: "GM45678",
    mallProductName: "스키니핏 데님 청바지",
    mallPrice: 59900,
    originalPrice: 45000,
    mallCategory: "패션잡화 > 의류 > 바지",
    status: "일시정지",
    stockSync: false,
    lastUpdated: "2024-01-14T15:20:00"
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "연동중": "bg-green-100 text-green-800 border-green-200",
    "판매중": "bg-blue-100 text-blue-800 border-blue-200",
    "일시정지": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "품절": "bg-red-100 text-red-800 border-red-200",
    "연동오류": "bg-red-100 text-red-800 border-red-200"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[status] || colors["연동중"]}`}>
      {status}
    </span>
  );
};

const formatPrice = (price: number) => 
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(price);

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString("ko-KR", { 
    month: "short", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

const MallProductsPage = () => {
  const [selectedMall, setSelectedMall] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = MALL_PRODUCTS.filter(product => {
    const matchesMall = selectedMall === "all" || product.mallId === selectedMall;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.mallProductName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMall && matchesStatus && matchesSearch;
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 간소화된 헤더 */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">🛒 쇼핑몰별 상품 관리</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              � 전체 동기화
            </button>
          </div>
        </div>
      </div>

      {/* 필터링 */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
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
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="판매중">판매중</option>
              <option value="일시정지">일시정지</option>
              <option value="품절">품절</option>
              <option value="연동오류">연동오류</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="상품명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              onClick={() => {
                setSelectedMall("all");
                setSelectedStatus("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 테이블 컨테이너 - 가득 차게 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-white">
          {/* 테이블 헤더 */}
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="text-sm font-medium text-gray-900">
              상품 목록 ({filteredProducts.length}개)
            </h2>
          </div>

          {/* 스크롤 가능한 테이블 영역 */}
          <div className="overflow-auto h-full pb-16">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품 정보</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">쇼핑몰</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">쇼핑몰 상품명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">재고연동</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                        <div className="text-sm text-gray-500">{product.productId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {MALLS.find(m => m.id === product.mallId)?.icon}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {product.mallName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.mallProductName}</div>
                        <div className="text-sm text-gray-500">{product.mallProductId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{formatPrice(product.mallPrice)}</div>
                        <div className="text-xs text-gray-500">원가: {formatPrice(product.originalPrice)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.stockSync ? (
                          <span className="text-green-600 text-sm">✅ 연동</span>
                        ) : (
                          <span className="text-red-600 text-sm">❌ 미연동</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">수정</button>
                        <button className="text-green-600 hover:text-green-800 text-sm">동기화</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">해당 조건의 상품이 없습니다</h3>
                <p className="text-gray-500">다른 조건으로 검색해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallProductsPage;
