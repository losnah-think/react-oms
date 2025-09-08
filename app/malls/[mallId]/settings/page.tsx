"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// 쇼핑몰 정보 타입
interface MallConfig {
  id: string;
  name: string;
  platform: string;
  icon: string;
  apiKey: string;
  secretKey: string;
  isConnected: boolean;
  lastConnectionTest: string;
  syncInterval: number; // 분 단위
  autoSync: boolean;
  priceMarkup: number; // 마크업 비율 (%)
  stockBuffer: number; // 재고 버퍼
  categoryMapping: boolean;
  imageSync: boolean;
  descriptionSync: boolean;
  keywordSync: boolean;
}

// 더미 설정 데이터
const MALL_CONFIGS: Record<string, MallConfig> = {
  naver: {
    id: "naver",
    name: "네이버 스마트스토어",
    platform: "NAVER",
    icon: "🟢",
    apiKey: "naver_api_key_***********",
    secretKey: "naver_secret_***********",
    isConnected: true,
    lastConnectionTest: "2024-01-15T10:30:00",
    syncInterval: 30,
    autoSync: true,
    priceMarkup: 15,
    stockBuffer: 5,
    categoryMapping: true,
    imageSync: true,
    descriptionSync: true,
    keywordSync: true
  },
  coupang: {
    id: "coupang",
    name: "쿠팡",
    platform: "COUPANG",
    icon: "🟡",
    apiKey: "coupang_vendor_key_***********",
    secretKey: "coupang_access_key_***********",
    isConnected: true,
    lastConnectionTest: "2024-01-15T10:25:00",
    syncInterval: 60,
    autoSync: true,
    priceMarkup: 20,
    stockBuffer: 10,
    categoryMapping: true,
    imageSync: true,
    descriptionSync: false,
    keywordSync: true
  },
  gmarket: {
    id: "gmarket",
    name: "G마켓",
    platform: "GMARKET",
    icon: "🔴",
    apiKey: "",
    secretKey: "",
    isConnected: false,
    lastConnectionTest: "2024-01-14T15:20:00",
    syncInterval: 120,
    autoSync: false,
    priceMarkup: 25,
    stockBuffer: 3,
    categoryMapping: false,
    imageSync: false,
    descriptionSync: false,
    keywordSync: false
  },
  "11st": {
    id: "11st",
    name: "11번가",
    platform: "11ST",
    icon: "🟢",
    apiKey: "11st_key_***********",
    secretKey: "11st_secret_***********",
    isConnected: true,
    lastConnectionTest: "2024-01-15T09:45:00",
    syncInterval: 45,
    autoSync: true,
    priceMarkup: 18,
    stockBuffer: 8,
    categoryMapping: true,
    imageSync: true,
    descriptionSync: true,
    keywordSync: false
  }
};

const MallSettingsPage = () => {
  const params = useParams();
  const mallId = params.mallId as string;
  
  const [config, setConfig] = useState<MallConfig | null>(MALL_CONFIGS[mallId] || null);
  const [isSaving, setIsSaving] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [showKeys, setShowKeys] = useState(false);

  if (!config) {
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

  const handleSave = async () => {
    setIsSaving(true);
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('설정이 저장되었습니다!');
  };

  const testConnection = async () => {
    setTestingConnection(true);
    // API 연결 테스트 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingConnection(false);
    
    const isSuccess = Math.random() > 0.3; // 70% 성공률
    if (isSuccess) {
      setConfig(prev => prev ? {
        ...prev,
        isConnected: true,
        lastConnectionTest: new Date().toISOString()
      } : prev);
      alert('연결 테스트가 성공했습니다!');
    } else {
      alert('연결 테스트가 실패했습니다. API 키를 확인해주세요.');
    }
  };

  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString("ko-KR", { 
      year: "numeric",
      month: "short", 
      day: "numeric", 
      hour: "2-digit", 
      minute: "2-digit"
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/malls" className="text-gray-600 hover:text-gray-800">
              ← 쇼핑몰 목록
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/malls/${mallId}`} className="text-gray-600 hover:text-gray-800">
              {config.name}
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{config.icon}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{config.name} 설정</h1>
                <p className="text-gray-600 mt-1">{config.platform} API 연동 및 동기화 설정을 관리합니다</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={testConnection}
                disabled={testingConnection}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {testingConnection ? '🔄 테스트 중...' : '🔗 연결 테스트'}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? '💾 저장 중...' : '💾 설정 저장'}
              </button>
            </div>
          </div>
        </div>

        {/* 연결 상태 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${config.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {config.isConnected ? '연결됨' : '연결 안됨'}
                </h3>
                <p className="text-sm text-gray-600">
                  마지막 확인: {formatDate(config.lastConnectionTest)}
                </p>
              </div>
            </div>
            
            {config.isConnected && (
              <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                <span>✅</span>
                <span>API 정상 작동 중</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API 설정 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🔐 API 인증 정보
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API 키 / Vendor ID
                </label>
                <div className="relative">
                  <input
                    type={showKeys ? "text" : "password"}
                    value={config.apiKey}
                    onChange={(e) => setConfig(prev => prev ? {...prev, apiKey: e.target.value} : prev)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="API 키를 입력하세요..."
                  />
                  <button
                    onClick={() => setShowKeys(!showKeys)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showKeys ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secret Key / Access Key
                </label>
                <input
                  type={showKeys ? "text" : "password"}
                  value={config.secretKey}
                  onChange={(e) => setConfig(prev => prev ? {...prev, secretKey: e.target.value} : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="시크릿 키를 입력하세요..."
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">API 키 표시</span>
                  <button
                    onClick={() => setShowKeys(!showKeys)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showKeys ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showKeys ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 동기화 설정 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🔄 동기화 설정
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">자동 동기화</div>
                  <div className="text-sm text-gray-600">설정된 간격으로 자동 동기화</div>
                </div>
                <button
                  onClick={() => setConfig(prev => prev ? {...prev, autoSync: !prev.autoSync} : prev)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.autoSync ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.autoSync ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  동기화 간격 (분)
                </label>
                <select
                  value={config.syncInterval}
                  onChange={(e) => setConfig(prev => prev ? {...prev, syncInterval: Number(e.target.value)} : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={15}>15분</option>
                  <option value={30}>30분</option>
                  <option value={60}>1시간</option>
                  <option value={120}>2시간</option>
                  <option value={360}>6시간</option>
                  <option value={720}>12시간</option>
                  <option value={1440}>24시간</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  가격 마크업 (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={config.priceMarkup}
                    onChange={(e) => setConfig(prev => prev ? {...prev, priceMarkup: Number(e.target.value)} : prev)}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="100"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-500 text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  재고 버퍼
                </label>
                <input
                  type="number"
                  value={config.stockBuffer}
                  onChange={(e) => setConfig(prev => prev ? {...prev, stockBuffer: Number(e.target.value)} : prev)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  placeholder="실제 재고에서 차감할 수량"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 동기화 옵션 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              ⚙️ 동기화 옵션
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">카테고리 매핑</div>
                    <div className="text-sm text-gray-600">자동 카테고리 매핑 활성화</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => prev ? {...prev, categoryMapping: !prev.categoryMapping} : prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.categoryMapping ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.categoryMapping ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">이미지 동기화</div>
                    <div className="text-sm text-gray-600">상품 이미지를 자동으로 업로드</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => prev ? {...prev, imageSync: !prev.imageSync} : prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.imageSync ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.imageSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">상품 설명 동기화</div>
                    <div className="text-sm text-gray-600">상품 상세 설명을 동기화</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => prev ? {...prev, descriptionSync: !prev.descriptionSync} : prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.descriptionSync ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.descriptionSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">키워드 동기화</div>
                    <div className="text-sm text-gray-600">검색 키워드를 자동 동기화</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => prev ? {...prev, keywordSync: !prev.keywordSync} : prev)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.keywordSync ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.keywordSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 위험 구역 */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
            ⚠️ 위험 구역
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">연동 초기화</div>
                <div className="text-sm text-red-700">모든 동기화 데이터를 삭제하고 처음부터 다시 연동</div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                초기화
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">연동 해제</div>
                <div className="text-sm text-red-700">이 쇼핑몰과의 연동을 완전히 해제</div>
              </div>
              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                연동 해제
              </button>
            </div>
          </div>
        </div>

        {/* 도움말 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            💡 설정 도움말
          </h3>
          
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex gap-3">
              <span className="font-medium min-w-0">• API 인증:</span>
              <span>각 쇼핑몰의 판매자 센터에서 API 키를 발급받아 입력하세요.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium min-w-0">• 동기화 간격:</span>
              <span>너무 짧은 간격은 API 제한에 걸릴 수 있으니 주의하세요.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium min-w-0">• 가격 마크업:</span>
              <span>공급가에서 자동으로 마진을 추가하여 판매가를 설정합니다.</span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium min-w-0">• 재고 버퍼:</span>
              <span>실제 재고보다 적게 표시하여 재고 부족 상황을 방지합니다.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallSettingsPage;
