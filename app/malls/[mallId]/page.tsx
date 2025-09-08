"use client";
import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// 타입 정의
interface MallProduct {
  id: string;
  name: string;
  code: string;
  mallProductId: string;
  mallPrice: number;
  stockQuantity: number;
  status: 'active' | 'inactive' | 'soldout' | 'suspended';
  lastSync: string;
  syncStatus: 'success' | 'failed' | 'pending';
  category: string;
  mallCategory: string;
  image: string;
  salesRank?: number;
  reviewCount: number;
  rating: number;
  tags: string[];
}

interface MallInfo {
  id: string;
  name: string;
  platform: string;
  icon: string;
  apiStatus: string;
  lastSync: string;
  totalProducts: number;
  activeProducts: number;
  description: string;
}

// 쇼핑몰 정보 더미 데이터
const MALL_INFO: Record<string, MallInfo> = {
  naver: {
    id: "naver",
    name: "네이버 스마트스토어",
    platform: "NAVER",
    icon: "🟢",
    apiStatus: "연동 정상",
    lastSync: "2024-01-15T10:30:00",
    totalProducts: 245,
    activeProducts: 210,
    description: "네이버 스마트스토어와 연동된 상품들을 관리합니다."
  },
  coupang: {
    id: "coupang",
    name: "쿠팡",
    platform: "COUPANG",
    icon: "🟡",
    apiStatus: "연동 정상",
    lastSync: "2024-01-15T10:25:00",
    totalProducts: 180,
    activeProducts: 165,
    description: "쿠팡 파트너스를 통한 상품 판매 관리 페이지입니다."
  },
  gmarket: {
    id: "gmarket",
    name: "G마켓",
    platform: "GMARKET",
    icon: "🔴",
    apiStatus: "일시정지",
    lastSync: "2024-01-14T15:20:00",
    totalProducts: 98,
    activeProducts: 45,
    description: "G마켓 오픈마켓 상품 관리 및 동기화를 담당합니다."
  },
  "11st": {
    id: "11st",
    name: "11번가",
    platform: "11ST",
    icon: "🟢",
    apiStatus: "연동 정상",
    lastSync: "2024-01-15T09:45:00",
    totalProducts: 67,
    activeProducts: 58,
    description: "11번가 오픈마켓과의 상품 연동 관리 시스템입니다."
  }
};

// 상품 더미 데이터 생성
function generateMallProducts(mallId: string): MallProduct[] {
  const statuses: MallProduct['status'][] = ['active', 'inactive', 'soldout', 'suspended'];
  const syncStatuses: MallProduct['syncStatus'][] = ['success', 'failed', 'pending'];
  const categories = ['의류', '액세서리', '신발', '가방', '시계', '주얼리'];
  const mallCategories = {
    naver: ['패션잡화', '의류', '신발', '가방/지갑'],
    coupang: ['패션의류', '패션잡화', '신발/잡화', '가방'],
    gmarket: ['의류', '잡화', '신발', '가방'],
    "11st": ['패션의류', '패션잡화', '신발/가방', '액세서리']
  };
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `MP-${mallId}-${1000 + i}`,
    name: `${mallId.toUpperCase()} 상품 ${i + 1}`,
    code: `CODE-${1000 + i}`,
    mallProductId: `${mallId.toUpperCase()}-${10000 + i}`,
    mallPrice: (15000 + i * 500) + Math.floor(Math.random() * 5000),
    stockQuantity: Math.floor(Math.random() * 100),
    status: statuses[i % statuses.length],
    lastSync: `2024-01-${String(Math.max(1, 15 - i % 15)).padStart(2, "0")}T${String(9 + i % 12).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}:00`,
    syncStatus: syncStatuses[i % syncStatuses.length],
    category: categories[i % categories.length],
    mallCategory: (mallCategories[mallId as keyof typeof mallCategories] || mallCategories.naver)[i % 4],
    image: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?auto=format&fit=crop&w=300&q=80`,
    salesRank: i < 20 ? i + 1 : undefined,
    reviewCount: Math.floor(Math.random() * 200),
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    tags: [`태그${i % 5 + 1}`, `키워드${i % 3 + 1}`].slice(0, Math.floor(Math.random() * 3) + 1)
  }));
}

// UI 컴포넌트들
const StatusBadge = ({ status }: { status: MallProduct['status'] }) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-gray-100 text-gray-800 border-gray-200", 
    soldout: "bg-red-100 text-red-800 border-red-200",
    suspended: "bg-yellow-100 text-yellow-800 border-yellow-200"
  };
  
  const labels = {
    active: "판매중",
    inactive: "비활성",
    soldout: "품절",
    suspended: "중단됨"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const SyncStatusBadge = ({ status }: { status: MallProduct['syncStatus'] }) => {
  const styles = {
    success: "bg-blue-100 text-blue-800",
    failed: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
  };
  
  const labels = {
    success: "✓ 동기화됨",
    failed: "✗ 실패",
    pending: "⏳ 대기중"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${styles[status]}`}>
      {labels[status]}
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

const MallDetailPage = () => {
  const params = useParams();
  const mallId = params.mallId as string;
  
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [syncStatusFilter, setSyncStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('lastSync');
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const mallInfo = MALL_INFO[mallId];
  const allProducts = useMemo(() => generateMallProducts(mallId), [mallId]);

  // 필터링
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }
    
    if (syncStatusFilter !== 'all') {
      filtered = filtered.filter(p => p.syncStatus === syncStatusFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query) ||
        p.mallProductId.toLowerCase().includes(query)
      );
    }
    
    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.mallPrice - a.mallPrice;
        case 'stock':
          return b.stockQuantity - a.stockQuantity;
        case 'rating':
          return b.rating - a.rating;
        case 'lastSync':
        default:
          return new Date(b.lastSync).getTime() - new Date(a.lastSync).getTime();
      }
    });
    
    return filtered;
  }, [allProducts, statusFilter, syncStatusFilter, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  if (!mallInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤷‍♂️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">쇼핑몰을 찾을 수 없습니다</h1>
          <Link href="/malls" className="text-blue-600 hover:text-blue-700">
            쇼핑몰 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const selectAllProducts = () => {
    setSelectedProducts(paginatedProducts.map(p => p.id));
  };

  const clearSelection = () => {
    setSelectedProducts([]);
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
            <div className="flex items-center gap-4">
              <span className="text-4xl">{mallInfo.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{mallInfo.name}</h1>
                <p className="text-gray-600 mt-1">{mallInfo.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                🔄 전체 동기화
              </button>
              <Link 
                href="/malls/analytics"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📊 통합 분석
              </Link>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                📊 성과 분석
              </button>
              <Link
                href={`/malls/${mallId}/settings`}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ⚙️ 설정
              </Link>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📦</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">전체 상품</p>
                <p className="text-2xl font-bold text-gray-900">{mallInfo.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">활성 상품</p>
                <p className="text-2xl font-bold text-gray-900">{mallInfo.activeProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">🔄</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">API 상태</p>
                <p className="text-lg font-bold text-gray-900">{mallInfo.apiStatus}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">최근 동기화</p>
                <p className="text-lg font-bold text-gray-900">{formatDate(mallInfo.lastSync)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔍 상품 검색</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="상품명, 코드, 쇼핑몰ID 검색..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📊 상품 상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="active">판매중</option>
                <option value="inactive">비활성</option>
                <option value="soldout">품절</option>
                <option value="suspended">중단됨</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔄 동기화 상태</label>
              <select
                value={syncStatusFilter}
                onChange={(e) => setSyncStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="success">동기화됨</option>
                <option value="failed">실패</option>
                <option value="pending">대기중</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">⚡ 정렬</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lastSync">최근 동기화순</option>
                <option value="name">상품명순</option>
                <option value="price">가격순</option>
                <option value="stock">재고순</option>
                <option value="rating">평점순</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              총 <strong className="text-gray-900">{filteredProducts.length}</strong>개 상품 (페이지: {page}/{totalPages})
            </div>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedProducts.length}개 선택됨
                </span>
                <button
                  onClick={clearSelection}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  선택 해제
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 일괄 작업 버튼 */}
        {selectedProducts.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                🔄 선택 상품 동기화
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                ✅ 활성화
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                ❌ 비활성화
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                💰 가격 일괄 수정
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                📦 재고 일괄 수정
              </button>
            </div>
          </div>
        )}

        {/* 상품 목록 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">상품 목록</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={selectAllProducts}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  현재 페이지 전체 선택
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-700">
                  📤 목록 내보내기
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className="flex items-start pt-1">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="h-4 w-4 accent-blue-500 rounded"
                    />
                  </div>

                  <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                          <StatusBadge status={product.status} />
                          <SyncStatusBadge status={product.syncStatus} />
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1 text-sm text-gray-600 mb-3">
                          <div><span className="text-gray-500">내부 코드:</span> {product.code}</div>
                          <div><span className="text-gray-500">쇼핑몰 ID:</span> {product.mallProductId}</div>
                          <div><span className="text-gray-500">카테고리:</span> {product.category} → {product.mallCategory}</div>
                          <div><span className="text-gray-500">재고:</span> {product.stockQuantity}개</div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-bold text-blue-600">{formatPrice(product.mallPrice)}</span>
                          {product.salesRank && (
                            <span className="text-orange-600">🏆 판매 랭킹 #{product.salesRank}</span>
                          )}
                          {product.rating > 0 && (
                            <span className="text-yellow-600">⭐ {product.rating} ({product.reviewCount})</span>
                          )}
                        </div>

                        {product.tags.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            {product.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-2">
                          마지막 동기화: {formatDate(product.lastSync)}
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
                            상세보기
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-200">
                            수정
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200">
                            동기화
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {paginatedProducts.length === 0 && (
              <div className="p-16 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <div className="text-xl font-semibold text-gray-600 mb-2">검색 결과가 없습니다</div>
                <div className="text-gray-500">필터 조건을 다시 확인해주세요</div>
              </div>
            )}
          </div>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
              >
                <span>←</span>
                <span>이전 페이지</span>
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  페이지 <span className="font-bold text-blue-600">{page}</span> / <span className="font-bold">{totalPages}</span>
                </span>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          pageNum === page
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" 
                disabled={page === totalPages} 
                onClick={() => setPage(page + 1)}
              >
                <span>다음 페이지</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MallDetailPage;
