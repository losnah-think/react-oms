"use client";
import React from "react";
import Link from "next/link";

// 쇼핑몰 통계 타입
interface MallStats {
  id: string;
  name: string;
  platform: string;
  status: string;
  lastSync: string;
  productCount: number;
  mappedCategories: number;
  additionalInfoCount: number;
  icon: string;
  salesData: {
    todaySales: number;
    monthSales: number;
    orderCount: number;
  };
}

// 더미 데이터
const MALL_STATS: MallStats[] = [
  {
    id: "naver",
    name: "네이버 스마트스토어",
    platform: "NAVER",
    status: "연동중",
    lastSync: "2024-01-15T10:30:00",
    productCount: 245,
    mappedCategories: 12,
    additionalInfoCount: 180,
    icon: "🟢",
    salesData: {
      todaySales: 2450000,
      monthSales: 45600000,
      orderCount: 89
    }
  },
  {
    id: "coupang",
    name: "쿠팡",
    platform: "COUPANG",
    status: "연동중",
    lastSync: "2024-01-15T10:25:00",
    productCount: 180,
    mappedCategories: 8,
    additionalInfoCount: 120,
    icon: "🟡",
    salesData: {
      todaySales: 1890000,
      monthSales: 38200000,
      orderCount: 67
    }
  },
  {
    id: "gmarket",
    name: "G마켓",
    platform: "GMARKET",
    status: "일시정지",
    lastSync: "2024-01-14T15:20:00",
    productCount: 98,
    mappedCategories: 5,
    additionalInfoCount: 45,
    icon: "🔴",
    salesData: {
      todaySales: 0,
      monthSales: 12800000,
      orderCount: 0
    }
  },
  {
    id: "11st",
    name: "11번가",
    platform: "11ST",
    status: "연동중",
    lastSync: "2024-01-15T09:45:00",
    productCount: 67,
    mappedCategories: 6,
    additionalInfoCount: 35,
    icon: "🟢",
    salesData: {
      todaySales: 890000,
      monthSales: 18500000,
      orderCount: 23
    }
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "연동중": "bg-green-100 text-green-800 border-green-200",
    "일시정지": "bg-yellow-100 text-yellow-800 border-yellow-200",
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

const MallManagementPage = () => {
  const totalStats = {
    totalProducts: MALL_STATS.reduce((sum, mall) => sum + mall.productCount, 0),
    totalCategories: MALL_STATS.reduce((sum, mall) => sum + mall.mappedCategories, 0),
    totalAdditionalInfo: MALL_STATS.reduce((sum, mall) => sum + mall.additionalInfoCount, 0),
    todayTotalSales: MALL_STATS.reduce((sum, mall) => sum + mall.salesData.todaySales, 0),
    monthTotalSales: MALL_STATS.reduce((sum, mall) => sum + mall.salesData.monthSales, 0),
    totalOrders: MALL_STATS.reduce((sum, mall) => sum + mall.salesData.orderCount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🛒 쇼핑몰 관리 대시보드
              </h1>
              <p className="text-gray-600 mt-2">각 쇼핑몰별 상품, 카테고리, 부가정보를 통합 관리합니다</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/malls/analytics"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📊 통합 분석
              </Link>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                🔄 전체 동기화
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                ⚙️ 쇼핑몰 설정
              </button>
            </div>
          </div>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 상품</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">🗂️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">매핑 카테고리</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalCategories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">부가 정보</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalAdditionalInfo}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">오늘 매출</p>
                <p className="text-lg font-bold text-gray-900">{formatPrice(totalStats.todayTotalSales)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">월 매출</p>
                <p className="text-lg font-bold text-gray-900">{formatPrice(totalStats.monthTotalSales)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">오늘 주문</p>
                <p className="text-2xl font-bold text-gray-900">{totalStats.totalOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 액세스 메뉴 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/malls/products"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">쇼핑몰별 상품 관리</h3>
                <p className="text-gray-600 text-sm">각 쇼핑몰별 상품 정보를 관리하고 동기화합니다</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/malls/additional"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">쇼핑몰별 부가 정보</h3>
                <p className="text-gray-600 text-sm">검색키워드, 배송정보, 프로모션 등을 관리합니다</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>

          <Link
            href="/malls/categories"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🗂️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">카테고리 매핑</h3>
                <p className="text-gray-600 text-sm">내부 카테고리와 쇼핑몰 카테고리를 매핑합니다</p>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </Link>
        </div>

        {/* 쇼핑몰별 상세 현황 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">쇼핑몰별 현황</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MALL_STATS.map((mall) => (
                <div key={mall.id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{mall.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{mall.name}</h3>
                        <p className="text-sm text-gray-600">{mall.platform}</p>
                      </div>
                    </div>
                    <StatusBadge status={mall.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">등록 상품</p>
                      <p className="text-xl font-bold text-gray-900">{mall.productCount}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">매핑 카테고리</p>
                      <p className="text-xl font-bold text-gray-900">{mall.mappedCategories}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">오늘 매출</p>
                      <p className="text-sm font-bold text-blue-600">
                        {mall.salesData.todaySales ? formatPrice(mall.salesData.todaySales) : '-'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">월 매출</p>
                      <p className="text-sm font-bold text-green-600">{formatPrice(mall.salesData.monthSales)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">오늘 주문</p>
                      <p className="text-sm font-bold text-orange-600">{mall.salesData.orderCount}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>부가정보: {mall.additionalInfoCount}개</span>
                    <span>마지막 동기화: {formatDate(mall.lastSync)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/malls/${mall.id}`}
                      className="flex-1 px-3 py-2 text-sm text-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      상품 관리
                    </Link>
                    <button className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                      동기화
                    </button>
                    <Link
                      href={`/malls/${mall.id}/settings`}
                      className="px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      설정
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallManagementPage;
