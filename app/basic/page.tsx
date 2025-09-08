'use client';

import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Icon3D } from '../components/ui/Icons3D';
import { Illustration3D } from '../components/ui/Illustrations3D';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

// 샘플 상품 데이터
const SAMPLE_PRODUCTS = [
  {
    id: 'SKU-1001-1',
    name: '프리미엄 코튼 티셔츠',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    price: 29000,
    originalPrice: 35000,
    discountPrice: 20000,
    profit: 9000,
    status: '출시 1개월',
    category: '의류 > 티셔츠',
    registration: '2024-09-01',
    hot: true,
    badges: ['출시 1개월', '베스트 1개월', '적립금'],
    code: 'CODE-1001',
    brand: '8801234567890',
    quantity: 120
  },
  {
    id: 'SKU-1002-1', 
    name: '멀티 움선 후드티',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
    price: 59000,
    originalPrice: 70000,
    discountPrice: 45000,
    profit: 14000,
    status: '출시 4개월',
    category: '의류 > 후드티',
    registration: '2024-05-15',
    hot: true,
    badges: ['출시 4개월', '베스트 V개월', '매장한정'],
    code: 'CODE-1002',
    brand: '상품 > 후드티',
    quantity: 85,
    soldOut: '품절 별지 (4개월)'
  },
  {
    id: 'SKU-1003-1',
    name: '클래식 데님 팬츠',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop',
    price: 89000,
    originalPrice: 105000,
    discountPrice: 65000,
    profit: 24000,
    status: '출시 2개월',
    category: '의류 > 팬츠',
    registration: '2024-07-20',
    hot: true,
    badges: ['출시 2개월', '베스트 2개월', '적립금'],
    code: 'CODE-1003',
    brand: '의류 > 그',
    quantity: 200,
    soldOut: '품절 별지 (2개월)'
  }
];

// 차트 데이터
const SALES_DATA = [
  { month: '1월', sales: 65, profit: 28, orders: 45 },
  { month: '2월', sales: 78, profit: 35, orders: 52 },
  { month: '3월', sales: 90, profit: 42, orders: 68 },
  { month: '4월', sales: 81, profit: 38, orders: 58 },
  { month: '5월', sales: 105, profit: 48, orders: 75 },
  { month: '6월', sales: 95, profit: 45, orders: 68 }
];

const CATEGORY_DATA = [
  { name: '의류', value: 45, color: '#3B82F6' },
  { name: '전자제품', value: 30, color: '#10B981' },
  { name: '스포츠', value: 15, color: '#F59E0B' },
  { name: '기타', value: 10, color: '#EF4444' }
];

const PERFORMANCE_DATA = [
  { name: '이번달', target: 100, actual: 85, color: '#3B82F6' },
  { name: '지난달', target: 100, actual: 92, color: '#10B981' },
  { name: '3개월전', target: 100, actual: 78, color: '#F59E0B' }
];

export default function BasicPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="기초 관리"
        description="상품, 브랜드, 카테고리 등 기본 정보를 관리합니다"
        breadcrumb={[
          { label: '기초 관리', href: '/basic' }
        ]}
      />

      {/* 빠른 액세스 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/basic/brands">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">브랜드 관리</p>
                <p className="text-2xl font-bold text-blue-900">5</p>
                <p className="text-xs text-blue-500 mt-1">등록된 브랜드</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-xl group-hover:scale-110 transition-transform">
                <Icon3D.Basic />
              </div>
            </div>
          </Card>
        </Link>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">카테고리 관리</p>
              <p className="text-2xl font-bold text-green-900">12</p>
              <p className="text-xs text-green-500 mt-1">활성 카테고리</p>
            </div>
            <div className="p-3 bg-green-200 rounded-xl">
              <Icon3D.Categories />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">상품 관리</p>
              <p className="text-2xl font-bold text-purple-900">234</p>
              <p className="text-xs text-purple-500 mt-1">등록된 상품</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-xl">
              <Icon3D.Products />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">재고 관리</p>
              <p className="text-2xl font-bold text-orange-900">1,205</p>
              <p className="text-xs text-orange-500 mt-1">총 재고 수량</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-xl">
              <Icon3D.Inventory />
            </div>
          </div>
        </Card>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 월별 매출 현황 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">월별 매출 현황</h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">매출</span>
              <div className="w-3 h-3 bg-green-500 rounded-full ml-4"></div>
              <span className="text-sm text-gray-600">수익</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
                <Bar 
                  dataKey="profit" 
                  fill="#10B981" 
                  radius={[4, 4, 0, 0]}
                  className="drop-shadow-sm"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 카테고리별 분포 */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">카테고리별 상품 분포</h3>
            <Button variant="outline" size="sm">
              <Icon3D.Settings />
              설정
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  className="drop-shadow-lg"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* 성과 지표 */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">월별 목표 달성률</h3>
          <div className="flex gap-2">
            <Badge variant="success">목표 달성</Badge>
            <Badge variant="secondary">진행중</Badge>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PERFORMANCE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                domain={[0, 120]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#E5E7EB" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="목표"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                className="drop-shadow-sm"
                name="실제"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 상품 목록 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">최신 등록 상품</h2>
          <Button variant="outline">
            전체보기
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* 상품 이미지 */}
                  <div className="lg:w-48 h-48 lg:h-auto relative bg-gray-100">
                    {product.hot && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant="danger" className="px-2 py-1 text-xs font-bold">
                          HOT
                        </Badge>
                      </div>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* 기본 정보 */}
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.badges.map((badge, index) => (
                            <Badge 
                              key={index}
                              variant={index === 0 ? "success" : index === 1 ? "secondary" : "default"}
                              className="text-xs px-2 py-1"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        {product.soldOut && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                            <Icon3D.Alert />
                            {product.soldOut}
                          </div>
                        )}
                      </div>

                      {/* 상품 상세 정보 */}
                      <div className="lg:w-80">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-gray-500 mb-1">상품코드</p>
                            <p className="font-semibold text-gray-900">{product.code}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 mb-1">재고</p>
                            <p className="font-semibold text-gray-900">{product.quantity}개</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 mb-1">등록일</p>
                            <p className="font-semibold text-gray-900">{product.registration}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 mb-1">카테고리</p>
                            <p className="font-semibold text-gray-900 text-xs truncate">{product.category}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <Badge variant="secondary" className="text-xs mb-2">
                                SKU: {product.id}
                              </Badge>
                              <p className="text-xs text-gray-500">브랜드: {product.brand}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 가격 정보 */}
                      <div className="lg:w-32 text-right space-y-2">
                        <div className="text-lg font-bold text-blue-600">
                          ₩{product.price.toLocaleString()}
                        </div>
                        
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">정가:</span>
                            <span className="line-through text-gray-400">
                              ₩{product.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">할인:</span>
                            <span className="text-orange-600 font-semibold">
                              ₩{product.discountPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-500">이익:</span>
                            <span className="text-green-600 font-bold">
                              ₩{product.profit.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-3">
                          <Button size="sm" variant="outline" className="p-2">
                            <Icon3D.Edit />
                          </Button>
                          <Button size="sm" variant="outline" className="p-2">
                            <Icon3D.Copy />
                          </Button>
                          <Button size="sm" variant="outline" className="p-2">
                            <Icon3D.Share />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 빠른 작업 */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/basic/brands">
            <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
              <Icon3D.Basic />
              <span className="text-sm">브랜드 추가</span>
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
            <Icon3D.Categories />
            <span className="text-sm">카테고리 관리</span>
          </Button>
          
          <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
            <Icon3D.Products />
            <span className="text-sm">상품 등록</span>
          </Button>
          
          <Button variant="outline" className="w-full h-16 flex flex-col gap-2">
            <Icon3D.Settings />
            <span className="text-sm">설정</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
