"use client";
import React, { useState } from "react";

// 카테고리 매핑 타입
interface CategoryMapping {
  id: string;
  internalCategory: string;
  internalCategoryPath: string[];
  mallId: string;
  mallName: string;
  mallCategory: string;
  mallCategoryCode: string;
  mappingStatus: string;
  productCount: number;
  lastUpdated: string;
}

// 더미 데이터
const CATEGORY_MAPPINGS: CategoryMapping[] = [
  {
    id: "cm001",
    internalCategory: "상의 > 티셔츠",
    internalCategoryPath: ["상의", "티셔츠"],
    mallId: "naver",
    mallName: "네이버 스마트스토어",
    mallCategory: "의류 > 남성의류 > 상의 > 티셔츠",
    mallCategoryCode: "50002454",
    mappingStatus: "매핑완료",
    productCount: 45,
    lastUpdated: "2024-01-15T10:30:00"
  },
  {
    id: "cm002",
    internalCategory: "상의 > 티셔츠",
    internalCategoryPath: ["상의", "티셔츠"],
    mallId: "coupang",
    mallName: "쿠팡",
    mallCategory: "패션의류 > 남성의류 > 상의",
    mallCategoryCode: "194176",
    mappingStatus: "매핑완료",
    productCount: 38,
    lastUpdated: "2024-01-15T09:45:00"
  },
  {
    id: "cm003",
    internalCategory: "하의 > 청바지",
    internalCategoryPath: ["하의", "청바지"],
    mallId: "naver",
    mallName: "네이버 스마트스토어",
    mallCategory: "의류 > 남성의류 > 하의 > 청바지",
    mallCategoryCode: "50002461",
    mappingStatus: "매핑완료",
    productCount: 28,
    lastUpdated: "2024-01-14T16:20:00"
  },
  {
    id: "cm004",
    internalCategory: "잡화 > 가방",
    internalCategoryPath: ["잡화", "가방"],
    mallId: "gmarket",
    mallName: "G마켓",
    mallCategory: "패션잡화 > 가방 > 백팩",
    mallCategoryCode: "200001783",
    mappingStatus: "매핑필요",
    productCount: 0,
    lastUpdated: "2024-01-10T14:15:00"
  },
  {
    id: "cm005",
    internalCategory: "상의 > 셔츠",
    internalCategoryPath: ["상의", "셔츠"],
    mallId: "11st",
    mallName: "11번가",
    mallCategory: "패션의류 > 남성패션 > 상의",
    mallCategoryCode: "40200",
    mappingStatus: "매핑오류",
    productCount: 12,
    lastUpdated: "2024-01-12T11:30:00"
  }
];

const MALLS = [
  { id: "naver", name: "네이버 스마트스토어", icon: "🟢" },
  { id: "coupang", name: "쿠팡", icon: "🟡" },
  { id: "gmarket", name: "G마켓", icon: "🔴" },
  { id: "11st", name: "11번가", icon: "🟢" }
];

const INTERNAL_CATEGORIES = [
  { path: ["상의"], name: "상의" },
  { path: ["상의", "티셔츠"], name: "상의 > 티셔츠" },
  { path: ["상의", "셔츠"], name: "상의 > 셔츠" },
  { path: ["하의"], name: "하의" },
  { path: ["하의", "청바지"], name: "하의 > 청바지" },
  { path: ["하의", "팬츠"], name: "하의 > 팬츠" },
  { path: ["잡화"], name: "잡화" },
  { path: ["잡화", "가방"], name: "잡화 > 가방" },
  { path: ["잡화", "신발"], name: "잡화 > 신발" }
];

const StatusBadge = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    "매핑완료": "bg-green-100 text-green-800 border-green-200",
    "매핑필요": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "매핑오류": "bg-red-100 text-red-800 border-red-200",
    "검토중": "bg-blue-100 text-blue-800 border-blue-200"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[status] || colors["매핑필요"]}`}>
      {status}
    </span>
  );
};

const formatDate = (dateString: string) => 
  new Date(dateString).toLocaleDateString("ko-KR", { 
    month: "short", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

const CategoryMappingPage = () => {
  const [selectedMall, setSelectedMall] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<CategoryMapping | null>(null);

  // 새 매핑 생성용 상태
  const [newMapping, setNewMapping] = useState({
    internalCategory: "",
    mallId: "",
    mallCategory: "",
    mallCategoryCode: ""
  });

  const filteredMappings = CATEGORY_MAPPINGS.filter(mapping => {
    const matchesMall = selectedMall === "all" || mapping.mallId === selectedMall;
    const matchesStatus = selectedStatus === "all" || mapping.mappingStatus === selectedStatus;
    const matchesSearch = mapping.internalCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mapping.mallCategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMall && matchesStatus && matchesSearch;
  });

  const openMappingModal = (mapping?: CategoryMapping) => {
    if (mapping) {
      setSelectedMapping(mapping);
      setNewMapping({
        internalCategory: mapping.internalCategory,
        mallId: mapping.mallId,
        mallCategory: mapping.mallCategory,
        mallCategoryCode: mapping.mallCategoryCode
      });
    } else {
      setSelectedMapping(null);
      setNewMapping({
        internalCategory: "",
        mallId: "",
        mallCategory: "",
        mallCategoryCode: ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMapping(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🗂️ 카테고리 매핑 관리
              </h1>
              <p className="text-gray-600 mt-2">내부 카테고리와 각 쇼핑몰의 카테고리를 매핑합니다</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => openMappingModal()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ➕ 매핑 추가
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                🔄 자동 매핑
              </button>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => setSelectedStatus("매핑완료")}
            className={`bg-white rounded-xl shadow-sm border p-6 text-left transition-all hover:shadow-md ${
              selectedStatus === "매핑완료" ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">매핑 완료</p>
                <p className="text-2xl font-bold text-gray-900">
                  {CATEGORY_MAPPINGS.filter(m => m.mappingStatus === "매핑완료").length}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus("매핑필요")}
            className={`bg-white rounded-xl shadow-sm border p-6 text-left transition-all hover:shadow-md ${
              selectedStatus === "매핑필요" ? "border-yellow-500 ring-2 ring-yellow-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">⏳</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">매핑 필요</p>
                <p className="text-2xl font-bold text-gray-900">
                  {CATEGORY_MAPPINGS.filter(m => m.mappingStatus === "매핑필요").length}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus("매핑오류")}
            className={`bg-white rounded-xl shadow-sm border p-6 text-left transition-all hover:shadow-md ${
              selectedStatus === "매핑오류" ? "border-red-500 ring-2 ring-red-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600">❌</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">매핑 오류</p>
                <p className="text-2xl font-bold text-gray-900">
                  {CATEGORY_MAPPINGS.filter(m => m.mappingStatus === "매핑오류").length}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedStatus("all")}
            className={`bg-white rounded-xl shadow-sm border p-6 text-left transition-all hover:shadow-md ${
              selectedStatus === "all" ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 상품 수</p>
                <p className="text-2xl font-bold text-gray-900">
                  {CATEGORY_MAPPINGS.reduce((sum, m) => sum + m.productCount, 0)}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* 필터링 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">매핑 상태</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">전체 상태</option>
                <option value="매핑완료">매핑완료</option>
                <option value="매핑필요">매핑필요</option>
                <option value="매핑오류">매핑오류</option>
                <option value="검토중">검토중</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 검색</label>
              <input
                type="text"
                placeholder="카테고리명을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedMall("all");
                  setSelectedStatus("all");
                  setSearchTerm("");
                }}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                🔄 필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 매핑 목록 테이블 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              카테고리 매핑 목록 ({filteredMappings.length}개)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">내부 카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">쇼핑몰</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">쇼핑몰 카테고리</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">카테고리 코드</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상품 수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">최종 업데이트</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMappings.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{mapping.internalCategory}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {MALLS.find(m => m.id === mapping.mallId)?.icon}
                        </span>
                        <span className="text-sm text-gray-900">{mapping.mallName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{mapping.mallCategory}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 font-mono">{mapping.mallCategoryCode}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{mapping.productCount}개</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={mapping.mappingStatus} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(mapping.lastUpdated)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openMappingModal(mapping)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          수정
                        </button>
                        <button className="text-green-600 hover:text-green-800 text-sm">검증</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMappings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🗂️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">해당 조건의 매핑이 없습니다</h3>
              <p className="text-gray-500">새로운 카테고리 매핑을 추가해보세요.</p>
            </div>
          )}
        </div>
      </div>

      {/* 매핑 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
            
            <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedMapping ? "카테고리 매핑 수정" : "카테고리 매핑 추가"}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">내부 카테고리</label>
                    <select
                      value={newMapping.internalCategory}
                      onChange={(e) => setNewMapping({...newMapping, internalCategory: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">카테고리 선택</option>
                      {INTERNAL_CATEGORIES.map((cat, index) => (
                        <option key={index} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">쇼핑몰</label>
                    <select
                      value={newMapping.mallId}
                      onChange={(e) => setNewMapping({...newMapping, mallId: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">쇼핑몰 선택</option>
                      {MALLS.map((mall) => (
                        <option key={mall.id} value={mall.id}>{mall.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">쇼핑몰 카테고리</label>
                    <input
                      type="text"
                      placeholder="예: 의류 > 남성의류 > 상의 > 티셔츠"
                      value={newMapping.mallCategory}
                      onChange={(e) => setNewMapping({...newMapping, mallCategory: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 코드</label>
                    <input
                      type="text"
                      placeholder="예: 50002454"
                      value={newMapping.mallCategoryCode}
                      onChange={(e) => setNewMapping({...newMapping, mallCategoryCode: e.target.value})}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {selectedMapping ? "수정" : "추가"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMappingPage;
