"use client";
import React, { useState } from "react";

// 판매처 타입
interface SalesChannel {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'disconnected';
  apiVersion: string;
  lastSync?: string;
  productCount?: number;
}

// 상품 데이터 타입
interface ExternalProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  status: string;
  createdAt: string;
  channel: string;
  description?: string;
  options?: { name: string; value: string }[];
}

// 판매처 데이터
const SALES_CHANNELS: SalesChannel[] = [
  {
    id: "cafe24",
    name: "카페24",
    logo: "☕",
    status: "connected",
    apiVersion: "v2.0",
    lastSync: "2024-01-15T10:30:00",
    productCount: 1245
  },
  {
    id: "wemall",
    name: "위사몰",
    logo: "🛍️",
    status: "disconnected",
    apiVersion: "v1.5",
    productCount: 0
  },
  {
    id: "makeshop",
    name: "메이크샵",
    logo: "🏪",
    status: "connected",
    apiVersion: "v3.0",
    lastSync: "2024-01-14T16:20:00",
    productCount: 856
  },
  {
    id: "godo",
    name: "고도몰5",
    logo: "🌐",
    status: "connected",
    apiVersion: "v2.5",
    lastSync: "2024-01-15T09:45:00",
    productCount: 672
  },
  {
    id: "naver",
    name: "네이버 스마트스토어",
    logo: "🔍",
    status: "disconnected",
    apiVersion: "v1.0",
    productCount: 0
  }
];

// 더미 외부 상품 데이터
const EXTERNAL_PRODUCTS: ExternalProduct[] = [
  {
    id: "ext001",
    name: "프리미엄 코튼 티셔츠",
    category: "의류 > 상의 > 티셔츠",
    brand: "베이직웨어",
    price: 29000,
    stock: 150,
    image: "👕",
    status: "판매중",
    createdAt: "2024-01-10T09:00:00",
    channel: "카페24",
    description: "100% 순면 소재로 제작된 프리미엄 티셔츠",
    options: [
      { name: "색상", value: "화이트,블랙,그레이" },
      { name: "사이즈", value: "S,M,L,XL" }
    ]
  },
  {
    id: "ext002",
    name: "슬림핏 청바지",
    category: "의류 > 하의 > 청바지",
    brand: "데님스타일",
    price: 89000,
    stock: 85,
    image: "👖",
    status: "판매중",
    createdAt: "2024-01-12T14:30:00",
    channel: "메이크샵",
    description: "모던한 슬림핏 디자인의 프리미엄 청바지",
    options: [
      { name: "색상", value: "인디고,라이트블루,블랙" },
      { name: "사이즈", value: "28,30,32,34,36" }
    ]
  },
  {
    id: "ext003",
    name: "크로스백",
    category: "잡화 > 가방 > 크로스백",
    brand: "어반스타일",
    price: 45000,
    stock: 32,
    image: "👜",
    status: "품절",
    createdAt: "2024-01-08T11:15:00",
    channel: "고도몰5",
    description: "실용적이고 스타일리시한 크로스백"
  }
];

const ApiIntegrationPage = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showProductModal, setShowProductModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ExternalProduct | null>(null);
  const [importStep, setImportStep] = useState<'select' | 'authenticate' | 'fetch' | 'mapping' | 'preview' | 'import'>('select');

  const handleChannelConnect = async (channelId: string) => {
    setIsConnecting(true);
    setSelectedChannel(channelId);
    
    // 연결 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 채널 상태 업데이트 (실제로는 상태 관리 라이브러리 사용)
    const channelIndex = SALES_CHANNELS.findIndex(c => c.id === channelId);
    if (channelIndex !== -1) {
      SALES_CHANNELS[channelIndex].status = 'connected';
      SALES_CHANNELS[channelIndex].lastSync = new Date().toISOString();
    }
    
    setIsConnecting(false);
    setImportStep('fetch');
  };

  const handleFetchProducts = async () => {
    setIsLoading(true);
    
    // 상품 불러오기 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    setImportStep('mapping');
  };

  const toggleProductSelection = (productId: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const handleBulkImport = () => {
    if (selectedProducts.size > 0) {
      setImportStep('preview');
    }
  };

  const formatPrice = (price: number) => price.toLocaleString();
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString("ko-KR", { 
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      "connected": "bg-green-100 text-green-800 border-green-200",
      "disconnected": "bg-red-100 text-red-800 border-red-200",
      "판매중": "bg-blue-100 text-blue-800 border-blue-200",
      "품절": "bg-gray-100 text-gray-800 border-gray-200"
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[status] || colors["disconnected"]}`}>
        {status === "connected" ? "연결됨" : status === "disconnected" ? "연결안됨" : status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            🔄 외부 API 상품 정보 수신
          </h1>
          <p className="text-gray-600 mt-2">외부 판매처에서 상품 정보를 자동으로 불러와 등록합니다</p>
        </div>

        {/* 진행 단계 표시 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className={`flex items-center ${importStep === 'select' ? 'text-blue-600' : importStep === 'authenticate' || importStep === 'fetch' || importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${importStep === 'select' ? 'bg-blue-100' : importStep === 'authenticate' || importStep === 'fetch' || importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">판매처 선택</span>
              </div>
              
              <div className={`flex items-center ${importStep === 'authenticate' ? 'text-blue-600' : importStep === 'fetch' || importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${importStep === 'authenticate' ? 'bg-blue-100' : importStep === 'fetch' || importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">API 인증</span>
              </div>

              <div className={`flex items-center ${importStep === 'fetch' ? 'text-blue-600' : importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${importStep === 'fetch' ? 'bg-blue-100' : importStep === 'mapping' || importStep === 'preview' || importStep === 'import' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium">상품 조회</span>
              </div>

              <div className={`flex items-center ${importStep === 'mapping' ? 'text-blue-600' : importStep === 'preview' || importStep === 'import' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${importStep === 'mapping' ? 'bg-blue-100' : importStep === 'preview' || importStep === 'import' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  4
                </div>
                <span className="ml-2 text-sm font-medium">매핑 설정</span>
              </div>

              <div className={`flex items-center ${importStep === 'preview' ? 'text-blue-600' : importStep === 'import' ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${importStep === 'preview' ? 'bg-blue-100' : importStep === 'import' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  5
                </div>
                <span className="ml-2 text-sm font-medium">등록</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: 판매처 선택 */}
        {importStep === 'select' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">판매처 선택</h2>
              <p className="text-sm text-gray-600 mt-1">상품 정보를 가져올 판매처를 선택하세요</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SALES_CHANNELS.map((channel) => (
                  <div
                    key={channel.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                      selectedChannel === channel.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{channel.logo}</div>
                      <StatusBadge status={channel.status} />
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{channel.name}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>API 버전:</span>
                        <span className="font-medium">{channel.apiVersion}</span>
                      </div>
                      {channel.lastSync && (
                        <div className="flex justify-between">
                          <span>마지막 동기화:</span>
                          <span className="font-medium">{formatDate(channel.lastSync)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>상품 수:</span>
                        <span className="font-medium">{channel.productCount || 0}개</span>
                      </div>
                    </div>

                    {channel.status === 'disconnected' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChannelConnect(channel.id);
                        }}
                        disabled={isConnecting}
                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {isConnecting && selectedChannel === channel.id ? '연결 중...' : 'API 연결'}
                      </button>
                    )}

                    {channel.status === 'connected' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImportStep('fetch');
                        }}
                        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        상품 불러오기
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 상품 조회 */}
        {importStep === 'fetch' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">상품 정보 조회</h2>
              <p className="text-sm text-gray-600 mt-1">선택한 판매처에서 상품 정보를 불러오고 있습니다</p>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">상품 정보를 불러오는 중...</h3>
                  <p className="text-gray-500">잠시만 기다려주세요. 상품 데이터를 처리하고 있습니다.</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">상품 조회를 시작하세요</h3>
                  <p className="text-gray-500 mb-6">선택한 판매처에서 상품 정보를 불러옵니다</p>
                  <button
                    onClick={handleFetchProducts}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    상품 정보 불러오기 시작
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: 매핑 설정 (상품 선택) */}
        {importStep === 'mapping' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">불러온 상품 목록</h2>
                  <p className="text-sm text-gray-600 mt-1">등록할 상품을 선택하고 매핑 정보를 확인하세요</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {selectedProducts.size}개 선택됨
                  </span>
                  <button
                    onClick={handleBulkImport}
                    disabled={selectedProducts.size === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    선택 상품 등록
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {EXTERNAL_PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-4 transition-all ${
                      selectedProducts.has(product.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      
                      <div className="text-4xl">{product.image}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-gray-500">카테고리: {product.category}</span>
                              <span className="text-gray-500">브랜드: {product.brand}</span>
                              <span className="text-gray-500">재고: {product.stock}개</span>
                            </div>

                            {product.options && product.options.length > 0 && (
                              <div className="mt-2">
                                <div className="flex flex-wrap gap-2">
                                  {product.options.map((option, index) => (
                                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                      {option.name}: {option.value}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {formatPrice(product.price)}원
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <StatusBadge status={product.status} />
                              <span className="text-xs text-gray-500">{product.channel}</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowProductModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                            >
                              상세보기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: 미리보기 및 등록 */}
        {importStep === 'preview' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">등록 미리보기</h2>
              <p className="text-sm text-gray-600 mt-1">선택한 {selectedProducts.size}개 상품을 등록합니다</p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {EXTERNAL_PRODUCTS.filter(p => selectedProducts.has(p.id)).map((product) => (
                  <div key={product.id} className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">✅</div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {product.category} | {formatPrice(product.price)}원 | 재고 {product.stock}개
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8 gap-3">
                <button
                  onClick={() => setImportStep('mapping')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  이전 단계
                </button>
                <button
                  onClick={() => setImportStep('import')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  상품 등록 완료
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 완료 페이지 */}
        {importStep === 'import' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-12 text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">상품 등록이 완료되었습니다!</h2>
              <p className="text-gray-600 mb-8">{selectedProducts.size}개의 상품이 성공적으로 등록되었습니다.</p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setImportStep('select');
                    setSelectedProducts(new Set());
                    setSelectedChannel(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  다시 시작
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  상품 목록 보기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 상품 상세보기 모달 */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowProductModal(false)}></div>
            
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">상품 상세 정보</h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-8xl text-center mb-4">{selectedProduct.image}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">가격:</span>
                        <span className="font-semibold">{formatPrice(selectedProduct.price)}원</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">재고:</span>
                        <span className="font-semibold">{selectedProduct.stock}개</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">상태:</span>
                        <StatusBadge status={selectedProduct.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">판매처:</span>
                        <span className="font-semibold">{selectedProduct.channel}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">카테고리 매핑</h4>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">외부 카테고리</p>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">내부 카테고리 (매핑됨)</p>
                      <p className="font-medium text-blue-900">의류 &gt; 상의 &gt; 티셔츠</p>
                    </div>

                    <h4 className="font-semibold text-gray-900 mb-3">브랜드 매핑</h4>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">외부 브랜드</p>
                      <p className="font-medium">{selectedProduct.brand}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600">내부 브랜드 (매핑됨)</p>
                      <p className="font-medium text-blue-900">{selectedProduct.brand}</p>
                    </div>

                    {selectedProduct.options && selectedProduct.options.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-900 mb-3">옵션 정보</h4>
                        <div className="space-y-2">
                          {selectedProduct.options.map((option, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3">
                              <p className="text-sm text-gray-600">{option.name}</p>
                              <p className="font-medium">{option.value}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  닫기
                </button>
                <button
                  onClick={() => {
                    toggleProductSelection(selectedProduct.id);
                    setShowProductModal(false);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedProducts.has(selectedProduct.id)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {selectedProducts.has(selectedProduct.id) ? '선택 해제' : '선택'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiIntegrationPage;
