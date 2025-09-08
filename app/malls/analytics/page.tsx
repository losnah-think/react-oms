"use client";
import React, { useState } from "react";
import Link from "next/link";

// 더미 통계 데이터
const ANALYTICS_DATA = {
  overview: {
    totalRevenue: 125480000,
    totalOrders: 1247,
    averageOrderValue: 100620,
    conversionRate: 3.2,
    topSellingCategory: "의류 > 티셔츠",
    growthRate: 15.3
  },
  mallComparison: [
    {
      id: "naver",
      name: "네이버 스마트스토어",
      icon: "🟢",
      revenue: 65400000,
      orders: 654,
      avgOrderValue: 100000,
      conversionRate: 4.1,
      growth: 18.5
    },
    {
      id: "coupang",
      name: "쿠팡",
      icon: "🟡",
      revenue: 38200000,
      orders: 382,
      avgOrderValue: 100000,
      conversionRate: 2.8,
      growth: 12.7
    },
    {
      id: "gmarket",
      name: "G마켓",
      icon: "🔴",
      revenue: 12800000,
      orders: 128,
      avgOrderValue: 100000,
      conversionRate: 2.1,
      growth: -5.2
    },
    {
      id: "11st",
      name: "11번가",
      icon: "🟢",
      revenue: 9080000,
      orders: 83,
      avgOrderValue: 109400,
      conversionRate: 2.5,
      growth: 8.3
    }
  ],
  categoryAnalysis: [
    { category: "의류 > 티셔츠", revenue: 45600000, orderCount: 456, growthRate: 22.5 },
    { category: "의류 > 셔츠", revenue: 32400000, orderCount: 324, growthRate: 15.8 },
    { category: "하의 > 팬츠", revenue: 28700000, orderCount: 287, growthRate: 8.2 },
    { category: "잡화 > 가방", revenue: 18700000, orderCount: 180, growthRate: -3.1 }
  ],
  timeSeriesData: {
    daily: [
      { date: "01-09", revenue: 4200000, orders: 42 },
      { date: "01-10", revenue: 3800000, orders: 38 },
      { date: "01-11", revenue: 5100000, orders: 51 },
      { date: "01-12", revenue: 4600000, orders: 46 },
      { date: "01-13", revenue: 3900000, orders: 39 },
      { date: "01-14", revenue: 4800000, orders: 48 },
      { date: "01-15", revenue: 5200000, orders: 52 }
    ],
    issues: [
      { mall: "G마켓", issue: "API 연결 불안정", severity: "높음", lastOccurred: "2024-01-14T15:20:00" },
      { mall: "쿠팡", issue: "재고 동기화 지연", severity: "중간", lastOccurred: "2024-01-15T08:30:00" },
      { mall: "네이버", issue: "이미지 업로드 실패", severity: "낮음", lastOccurred: "2024-01-15T10:15:00" }
    ]
  }
};

const formatPrice = (price: number) => 
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(price);

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString("ko-KR", { 
    month: "short", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

const GrowthIndicator = ({ value }: { value: number }) => (
  <span className={`inline-flex items-center gap-1 text-sm ${
    value >= 0 ? 'text-green-600' : 'text-red-600'
  }`}>
    {value >= 0 ? '📈' : '📉'}
    {Math.abs(value).toFixed(1)}%
  </span>
);

const SeverityBadge = ({ severity }: { severity: string }) => {
  const colors = {
    "높음": "bg-red-100 text-red-800 border-red-200",
    "중간": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "낮음": "bg-green-100 text-green-800 border-green-200"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
      colors[severity as keyof typeof colors] || colors["중간"]
    }`}>
      {severity}
    </span>
  );
};

const MallAnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [selectedMalls, setSelectedMalls] = useState<string[]>(["naver", "coupang", "gmarket", "11st"]);

  const toggleMallSelection = (mallId: string) => {
    setSelectedMalls(prev => 
      prev.includes(mallId) 
        ? prev.filter(id => id !== mallId)
        : [...prev, mallId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/malls" className="text-gray-600 hover:text-gray-800">
              ← 쇼핑몰 목록
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                📊 통합 분석 대시보드
              </h1>
              <p className="text-gray-600 mt-2">전체 쇼핑몰의 성과를 종합적으로 분석하고 비교합니다</p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">일별</option>
                <option value="weekly">주별</option>
                <option value="monthly">월별</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                📤 리포트 내보내기
              </button>
            </div>
          </div>
        </div>

        {/* 전체 성과 개요 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 매출</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(ANALYTICS_DATA.overview.totalRevenue)}</p>
                <GrowthIndicator value={ANALYTICS_DATA.overview.growthRate} />
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 주문</p>
                <p className="text-xl font-bold text-gray-900">{ANALYTICS_DATA.overview.totalOrders.toLocaleString()}</p>
                <GrowthIndicator value={12.5} />
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">평균 주문금액</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(ANALYTICS_DATA.overview.averageOrderValue)}</p>
                <GrowthIndicator value={5.2} />
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">💳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">전환율</p>
                <p className="text-xl font-bold text-gray-900">{ANALYTICS_DATA.overview.conversionRate}%</p>
                <GrowthIndicator value={8.7} />
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">TOP 카테고리</p>
                <p className="text-sm font-bold text-gray-900">{ANALYTICS_DATA.overview.topSellingCategory}</p>
                <GrowthIndicator value={22.5} />
              </div>
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-indigo-600">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">성장률</p>
                <p className="text-xl font-bold text-gray-900">{ANALYTICS_DATA.overview.growthRate}%</p>
                <span className="text-sm text-green-600">📈 증가 중</span>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">📈</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 쇼핑몰별 성과 비교 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">🏪 쇼핑몰별 성과 비교</h2>
                <div className="flex items-center gap-2">
                  {ANALYTICS_DATA.mallComparison.map((mall) => (
                    <button
                      key={mall.id}
                      onClick={() => toggleMallSelection(mall.id)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        selectedMalls.includes(mall.id)
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {mall.icon} {mall.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {ANALYTICS_DATA.mallComparison
                  .filter(mall => selectedMalls.includes(mall.id))
                  .map((mall) => (
                    <div key={mall.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{mall.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900">{mall.name}</div>
                            <div className="text-sm text-gray-600">매출 비중: {((mall.revenue / ANALYTICS_DATA.overview.totalRevenue) * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                        <GrowthIndicator value={mall.growth} />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-600">매출</p>
                          <p className="font-bold text-gray-900">{formatPrice(mall.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">주문수</p>
                          <p className="font-bold text-gray-900">{mall.orders.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">전환율</p>
                          <p className="font-bold text-gray-900">{mall.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 카테고리 분석 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">📊 카테고리별 분석</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {ANALYTICS_DATA.categoryAnalysis.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{category.category}</span>
                        <GrowthIndicator value={category.growthRate} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formatPrice(category.revenue)}</span>
                        <span>{category.orderCount} 주문</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ 
                            width: `${(category.revenue / ANALYTICS_DATA.categoryAnalysis[0].revenue) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 일별 성과 트렌드 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">📈 일별 성과 트렌드</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4">
              {ANALYTICS_DATA.timeSeriesData.daily.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <div className="text-xs text-gray-600 mb-1">{day.date}</div>
                    <div className="font-bold text-gray-900 text-sm">{formatPrice(day.revenue)}</div>
                    <div className="text-xs text-gray-600">{day.orders} 주문</div>
                  </div>
                  <div 
                    className="bg-blue-600 rounded-full mx-auto"
                    style={{
                      width: '8px',
                      height: `${(day.revenue / Math.max(...ANALYTICS_DATA.timeSeriesData.daily.map(d => d.revenue))) * 40 + 10}px`
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 이슈 및 알림 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">⚠️ 최근 이슈 및 알림</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                전체 보기
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {ANALYTICS_DATA.timeSeriesData.issues.map((issue, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <span className="text-red-600">⚠️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{issue.mall} - {issue.issue}</div>
                      <div className="text-sm text-gray-600">마지막 발생: {formatDate(issue.lastOccurred)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity={issue.severity} />
                    <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                      해결하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallAnalyticsPage;
