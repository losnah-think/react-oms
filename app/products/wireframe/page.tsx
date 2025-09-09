"use client";
import React, { useState } from "react";

// ---------- 컴포넌트 스타일링 ----------
const WireframeBox: React.FC<{
  children: React.ReactNode;
  className?: string;
  label?: string;
  description?: string;
  specs?: string;
}> = ({ children, className = "", label, description, specs }) => (
  <div className={`border-2 border-dashed border-gray-400 bg-gray-50 p-4 rounded-lg ${className}`}>
    {label && (
      <div className="mb-2">
        <span className="bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">{label}</span>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        {specs && <p className="text-xs text-blue-600 mt-1 font-mono">{specs}</p>}
      </div>
    )}
    {children}
  </div>
);

const SpecBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
    <h4 className="font-bold text-blue-900 mb-2">{title}</h4>
    <div className="text-sm text-blue-800">{children}</div>
  </div>
);

// ---------- 메인 컴포넌트 ----------
const ProductManagementWireframe: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("전체");
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 페이지 헤더 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">상품 관리 페이지 - 와이어프레임</h1>
              <p className="text-blue-100 mt-1">완전한 기능 명세서 및 개발 가이드</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <h3 className="font-semibold mb-2">🎯 페이지 목적 및 핵심 기능</h3>
            <ul className="text-sm space-y-1 text-blue-100">
              <li>• 상품 목록 조회, 검색, 필터링</li>
              <li>• 상품 일괄 선택 및 액션 수행</li>
              <li>• 상품 등록, 수정, 삭제 관리</li>
              <li>• 재고 현황 및 판매 데이터 확인</li>
              <li>• CSV 파일 업로드/다운로드</li>
            </ul>
          </div>
        </div>

        {/* 1. 페이지 헤더 영역 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">1. 페이지 헤더 영역</h2>
          
          <WireframeBox 
            label="PAGE_HEADER"
            description="페이지 제목, 경로, 주요 액션 버튼"
            specs="Grid: 24컬럼, Height: 80px, Responsive: flex-col on mobile"
          >
            <div className="grid grid-cols-24 gap-4 items-center min-h-[80px]">
              <div className="col-span-12">
                <WireframeBox label="BREADCRUMB">
                  <div className="h-6 bg-gray-200 rounded flex items-center px-2">
                    <span className="text-xs text-gray-500">홈 &gt; 상품관리 &gt; 상품목록</span>
                  </div>
                </WireframeBox>
                <div className="mt-2">
                  <WireframeBox label="PAGE_TITLE">
                    <h1 className="text-2xl font-bold text-gray-800">상품 관리</h1>
                  </WireframeBox>
                </div>
              </div>
              
              <div className="col-span-12 flex justify-end gap-3">
                <WireframeBox label="ACTION_BUTTONS" className="flex gap-2">
                  <div className="px-4 py-2 bg-green-500 text-white rounded text-sm">+ 상품 등록</div>
                  <div className="px-4 py-2 bg-blue-500 text-white rounded text-sm">📤 엑셀 다운로드</div>
                  <div className="px-4 py-2 bg-purple-500 text-white rounded text-sm">📥 엑셀 업로드</div>
                </WireframeBox>
              </div>
            </div>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 페이지 헤더">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> PageHeader, Breadcrumb, ActionButton</p>
              <p><strong>상태관리:</strong> 업로드 진행상태, 선택된 상품 수</p>
              <p><strong>API:</strong> POST /api/products/upload, GET /api/products/export</p>
              <p><strong>권한:</strong> 상품등록(CREATE), 엑셀다운로드(READ), 업로드(ADMIN)</p>
              <p><strong>이벤트:</strong> onClick, onFileUpload, onExport</p>
              <p><strong>반응형:</strong> 모바일에서 버튼들 세로 정렬, 768px 브레이크포인트</p>
            </div>
          </SpecBox>
        </section>

        {/* 2. 검색 및 필터 영역 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">2. 검색 및 필터 영역</h2>
          
          <WireframeBox 
            label="SEARCH_FILTER_AREA"
            description="다중 검색 조건 및 필터링 컨트롤"
            specs="Grid: 24컬럼, Collapsible: true, Animation: slide-down 300ms"
          >
            {/* 기본 검색바 */}
            <div className="grid grid-cols-24 gap-4 mb-4">
              <div className="col-span-8">
                <WireframeBox label="SEARCH_INPUT">
                  <div className="relative">
                    <div className="h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center px-3">
                      <span className="text-gray-400 text-sm">🔍 상품명, 코드 검색...</span>
                    </div>
                  </div>
                </WireframeBox>
              </div>
              
              <div className="col-span-4">
                <WireframeBox label="SEARCH_TYPE">
                  <select className="w-full h-10 border-2 border-gray-300 rounded-lg px-3 text-sm">
                    <option>전체</option>
                    <option>상품명</option>
                    <option>상품코드</option>
                    <option>바코드</option>
                  </select>
                </WireframeBox>
              </div>
              
              <div className="col-span-3">
                <WireframeBox label="SEARCH_BUTTON">
                  <button className="w-full h-10 bg-blue-500 text-white rounded-lg text-sm font-medium">검색</button>
                </WireframeBox>
              </div>
              
              <div className="col-span-3">
                <WireframeBox label="FILTER_TOGGLE">
                  <button className="w-full h-10 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border-2 border-gray-300">
                    상세 필터 ▼
                  </button>
                </WireframeBox>
              </div>
              
              <div className="col-span-6 flex gap-2">
                <WireframeBox label="RESET_BUTTON" className="flex-1">
                  <button className="w-full h-10 bg-gray-500 text-white rounded-lg text-sm">초기화</button>
                </WireframeBox>
              </div>
            </div>

            {/* 상세 필터 (접기/펼치기) */}
            <div className="border-t pt-4">
              <WireframeBox label="ADVANCED_FILTERS" description="펼침/접힘 상태에 따라 표시">
                <div className="grid grid-cols-24 gap-4">
                  {/* 첫 번째 행 */}
                  <div className="col-span-6">
                    <WireframeBox label="CATEGORY_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">카테고리</label>
                      <select className="w-full h-8 border border-gray-300 rounded text-sm">
                        <option>전체</option>
                        <option>상의</option>
                        <option>하의</option>
                        <option>신발</option>
                      </select>
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="BRAND_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">브랜드</label>
                      <select className="w-full h-8 border border-gray-300 rounded text-sm">
                        <option>전체</option>
                        <option>브랜드A</option>
                        <option>브랜드B</option>
                      </select>
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="STATUS_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">판매상태</label>
                      <select className="w-full h-8 border border-gray-300 rounded text-sm">
                        <option>전체</option>
                        <option>판매중</option>
                        <option>품절</option>
                        <option>중단</option>
                      </select>
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="STOCK_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">재고관리</label>
                      <select className="w-full h-8 border border-gray-300 rounded text-sm">
                        <option>전체</option>
                        <option>관리함</option>
                        <option>관리안함</option>
                      </select>
                    </WireframeBox>
                  </div>

                  {/* 두 번째 행 */}
                  <div className="col-span-6">
                    <WireframeBox label="PRICE_RANGE">
                      <label className="text-xs text-gray-600 block mb-1">가격 범위</label>
                      <div className="flex gap-1 items-center">
                        <input className="flex-1 h-8 border border-gray-300 rounded text-sm px-2" placeholder="최소" />
                        <span className="text-xs">~</span>
                        <input className="flex-1 h-8 border border-gray-300 rounded text-sm px-2" placeholder="최대" />
                      </div>
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="DATE_RANGE">
                      <label className="text-xs text-gray-600 block mb-1">등록일</label>
                      <div className="flex gap-1 items-center">
                        <input type="date" className="flex-1 h-8 border border-gray-300 rounded text-xs" />
                        <span className="text-xs">~</span>
                        <input type="date" className="flex-1 h-8 border border-gray-300 rounded text-xs" />
                      </div>
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="SUPPLIER_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">공급업체</label>
                      <input className="w-full h-8 border border-gray-300 rounded text-sm px-2" placeholder="공급업체명" />
                    </WireframeBox>
                  </div>
                  
                  <div className="col-span-6">
                    <WireframeBox label="TAG_FILTER">
                      <label className="text-xs text-gray-600 block mb-1">태그</label>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">세일</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">신상품</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">베스트</span>
                      </div>
                    </WireframeBox>
                  </div>
                </div>
              </WireframeBox>
            </div>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 검색 및 필터">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> SearchBar, FilterGroup, DateRangePicker, MultiSelect</p>
              <p><strong>상태관리:</strong> searchParams, filterState, isAdvancedOpen</p>
              <p><strong>API:</strong> GET /api/products?search=&category=&brand=&status=</p>
              <p><strong>쿼리스트링:</strong> URL에 검색조건 반영, 브라우저 뒒로가기 지원</p>
              <p><strong>성능:</strong> debounce 300ms, useMemo로 필터옵션 캐싱</p>
              <p><strong>유효성검사:</strong> 가격범위 숫자검증, 날짜 유효성, 최대길이 제한</p>
              <p><strong>접근성:</strong> 키보드 네비게이션, 스크린리더 라벨, ARIA 속성</p>
            </div>
          </SpecBox>
        </section>

        {/* 3. 상품 목록 컨트롤 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">3. 목록 컨트롤 영역</h2>
          
          <WireframeBox 
            label="LIST_CONTROLS"
            description="목록 표시 옵션, 정렬, 일괄 액션"
            specs="Grid: 24컬럼, Sticky: top-120px, Z-index: 10"
          >
            <div className="grid grid-cols-24 gap-4 items-center">
              {/* 좌측: 결과 정보 및 선택 */}
              <div className="col-span-8 flex items-center gap-4">
                <WireframeBox label="RESULT_COUNT">
                  <span className="text-sm text-gray-600">총 <strong>1,247</strong>개 상품</span>
                </WireframeBox>
                
                <WireframeBox label="SELECT_ALL">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-600">전체선택 (0)</span>
                  </label>
                </WireframeBox>
              </div>
              
              {/* 중앙: 일괄 액션 */}
              <div className="col-span-8 flex justify-center gap-2">
                <WireframeBox label="BATCH_ACTIONS" className="flex gap-2">
                  <button className="px-3 py-2 bg-red-500 text-white rounded text-xs opacity-50" disabled>삭제 (0)</button>
                  <button className="px-3 py-2 bg-orange-500 text-white rounded text-xs opacity-50" disabled>상태변경 (0)</button>
                  <button className="px-3 py-2 bg-green-500 text-white rounded text-xs opacity-50" disabled>카테고리이동 (0)</button>
                </WireframeBox>
              </div>
              
              {/* 우측: 정렬 및 표시 옵션 */}
              <div className="col-span-8 flex justify-end items-center gap-3">
                <WireframeBox label="SORT_OPTIONS">
                  <select className="h-8 border border-gray-300 rounded text-sm px-2">
                    <option>등록일 최신순</option>
                    <option>등록일 오래된순</option>
                    <option>상품명 가나다순</option>
                    <option>가격 높은순</option>
                    <option>가격 낮은순</option>
                  </select>
                </WireframeBox>
                
                <WireframeBox label="VIEW_OPTIONS">
                  <div className="flex border border-gray-300 rounded">
                    <button className="px-3 py-1 bg-blue-500 text-white text-xs">카드뷰</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 text-xs">테이블뷰</button>
                  </div>
                </WireframeBox>
                
                <WireframeBox label="PAGE_SIZE">
                  <select className="h-8 border border-gray-300 rounded text-sm px-2">
                    <option>20개씩</option>
                    <option>50개씩</option>
                    <option>100개씩</option>
                  </select>
                </WireframeBox>
              </div>
            </div>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 목록 컨트롤">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> ListControls, BatchActions, SortDropdown, ViewToggle</p>
              <p><strong>상태관리:</strong> selectedItems[], sortBy, viewMode, pageSize</p>
              <p><strong>API:</strong> DELETE /api/products/batch, PUT /api/products/batch</p>
              <p><strong>이벤트:</strong> onSelectAll, onBatchAction, onSortChange</p>
              <p><strong>성능:</strong> 선택상태 useMemo 최적화, 가상화 스크롤 고려</p>
              <p><strong>UX:</strong> 선택개수 실시간 업데이트, 액션 버튼 활성화/비활성화</p>
            </div>
          </SpecBox>
        </section>

        {/* 4. 상품 목록 영역 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">4. 상품 목록 영역</h2>
          
          <WireframeBox 
            label="PRODUCT_LIST"
            description="상품 카드/테이블 목록, 무한스크롤 또는 페이지네이션"
            specs="Grid: 24컬럼 반복, Virtual Scroll: react-window, LazyLoad: 이미지"
          >
            {/* 상품 카드 예시 (3개) */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-6 last:mb-0">
                <WireframeBox label={`PRODUCT_CARD_${item}`} className="p-4">
                  <div className="grid grid-cols-24 gap-4 items-stretch min-h-[120px]">
                    {/* 체크박스 */}
                    <div className="col-span-1 flex items-start pt-2">
                      <WireframeBox label="CHECKBOX">
                        <input type="checkbox" className="w-4 h-4" />
                      </WireframeBox>
                    </div>
                    
                    {/* 상품 이미지 */}
                    <div className="col-span-3 flex items-center">
                      <WireframeBox label="PRODUCT_IMAGE" className="w-full">
                        <div className="w-20 h-20 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">이미지</span>
                        </div>
                      </WireframeBox>
                    </div>
                    
                    {/* 상품 정보 */}
                    <div className="col-span-10 flex items-center">
                      <WireframeBox label="PRODUCT_INFO" className="w-full">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-800 text-lg">프리미엄 코튼 티셔츠 {item}</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <span>코드: PRD{item.toString().padStart(3, '0')}</span>
                            <span>카테고리: 상의</span>
                            <span>브랜드: 베이직웨어</span>
                            <span>등록일: 2025-09-0{item}</span>
                          </div>
                          <div className="flex gap-2 pt-1">
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">판매중</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">재고관리</span>
                          </div>
                        </div>
                      </WireframeBox>
                    </div>
                    
                    {/* 재고 정보 */}
                    <div className="col-span-3 flex items-center">
                      <WireframeBox label="STOCK_INFO" className="w-full">
                        <div className="text-center space-y-1 py-2">
                          <div className="text-sm font-semibold text-gray-800">재고: 150개</div>
                          <div className="text-xs text-gray-500">안전재고: 20개</div>
                          <div className="text-xs text-red-600">부족: 5개</div>
                        </div>
                      </WireframeBox>
                    </div>
                    
                    {/* 가격 정보 */}
                    <div className="col-span-4 flex items-center">
                      <WireframeBox label="PRICE_INFO" className="w-full">
                        <div className="text-right space-y-1 py-2">
                          <div className="text-xl font-bold text-blue-600">₩{(29000 + item * 1000).toLocaleString()}</div>
                          <div className="text-xs text-gray-500">원가: ₩{(15000 + item * 500).toLocaleString()}</div>
                          <div className="text-xs text-green-600">마진: ₩{(14000 + item * 500).toLocaleString()} (48%)</div>
                        </div>
                      </WireframeBox>
                    </div>
                    
                    {/* 액션 버튼 */}
                    <div className="col-span-3 flex items-center justify-center">
                      <WireframeBox label="ACTION_BUTTONS" className="flex flex-col gap-2 w-full">
                        <button className="w-full py-1 px-2 text-blue-500 hover:bg-blue-50 rounded text-xs border border-blue-200">편집</button>
                        <button className="w-full py-1 px-2 text-green-500 hover:bg-green-50 rounded text-xs border border-green-200">복사</button>
                        <button className="w-full py-1 px-2 text-red-500 hover:bg-red-50 rounded text-xs border border-red-200">삭제</button>
                      </WireframeBox>
                    </div>
                  </div>
                </WireframeBox>
              </div>
            ))}
            
            {/* 로딩 상태 */}
            <WireframeBox label="LOADING_STATE" className="text-center py-8 mt-6">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-2">상품 목록을 불러오는 중...</p>
            </WireframeBox>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 상품 목록">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> ProductCard, ProductList, VirtualizedList, LazyImage</p>
              <p><strong>상태관리:</strong> products[], loading, hasMore, selectedIds</p>
              <p><strong>API:</strong> GET /api/products?page=&limit=&sort=&filters</p>
              <p><strong>성능최적화:</strong> React.memo, useCallback, 이미지 lazy loading</p>
              <p><strong>무한스크롤:</strong> Intersection Observer, 스크롤 위치 복원</p>
              <p><strong>에러처리:</strong> 네트워크 오류, 타임아웃, 재시도 로직</p>
              <p><strong>스켈레톤:</strong> 로딩 중 placeholder UI</p>
            </div>
          </SpecBox>
        </section>

        {/* 5. 페이지네이션 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">5. 페이지네이션</h2>
          
          <WireframeBox 
            label="PAGINATION"
            description="페이지 네비게이션 및 페이지 정보"
            specs="Centered, Max 7 pages visible, Responsive design"
          >
            <div className="flex justify-center items-center gap-4 py-4">
              <WireframeBox label="PAGE_INFO">
                <span className="text-sm text-gray-600">1,247개 중 1-20개 표시</span>
              </WireframeBox>
              
              <WireframeBox label="PAGE_CONTROLS" className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded text-sm opacity-50" disabled>이전</button>
                <button className="px-3 py-2 bg-blue-500 text-white rounded text-sm">1</button>
                <button className="px-3 py-2 border border-gray-300 rounded text-sm">2</button>
                <button className="px-3 py-2 border border-gray-300 rounded text-sm">3</button>
                <span className="text-gray-400">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded text-sm">63</button>
                <button className="px-3 py-2 border border-gray-300 rounded text-sm">다음</button>
              </WireframeBox>
              
              <WireframeBox label="PAGE_JUMP">
                <div className="flex items-center gap-2 text-sm">
                  <span>페이지 이동:</span>
                  <input className="w-16 h-8 border border-gray-300 rounded text-center" placeholder="1" />
                  <button className="px-2 py-1 bg-gray-500 text-white rounded text-xs">이동</button>
                </div>
              </WireframeBox>
            </div>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 페이지네이션">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> Pagination, PageJump, PageInfo</p>
              <p><strong>상태관리:</strong> currentPage, totalPages, pageSize</p>
              <p><strong>URL 동기화:</strong> 페이지 번호 쿼리스트링 반영</p>
              <p><strong>키보드지원:</strong> Enter키 페이지 이동, 화살표 키 네비게이션</p>
              <p><strong>접근성:</strong> ARIA labels, 현재 페이지 표시</p>
            </div>
          </SpecBox>
        </section>

        {/* 6. 사이드패널/모달 */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">6. 상품 상세/편집 패널</h2>
          
          <WireframeBox 
            label="SIDE_PANEL"
            description="상품 상세 정보 및 편집 폼"
            specs="Width: 480px, Slide animation, Overlay backdrop"
          >
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
              <h3 className="font-bold text-blue-900 mb-4">상품 상세 정보 패널</h3>
              
              <div className="space-y-4">
                {/* 패널 헤더 */}
                <WireframeBox label="PANEL_HEADER" className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">프리미엄 코튼 티셔츠</h2>
                  <button className="text-gray-500">✕</button>
                </WireframeBox>
                
                {/* 탭 네비게이션 */}
                <WireframeBox label="TAB_NAVIGATION">
                  <div className="flex border-b">
                    <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600 font-medium">기본정보</button>
                    <button className="px-4 py-2 text-gray-500">재고관리</button>
                    <button className="px-4 py-2 text-gray-500">판매이력</button>
                    <button className="px-4 py-2 text-gray-500">리뷰관리</button>
                  </div>
                </WireframeBox>
                
                {/* 폼 필드들 */}
                <WireframeBox label="FORM_FIELDS" className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">상품명 *</label>
                    <input className="w-full h-10 border border-gray-300 rounded px-3" value="프리미엄 코튼 티셔츠" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">상품코드 *</label>
                      <input className="w-full h-10 border border-gray-300 rounded px-3" value="PRD001" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">바코드</label>
                      <input className="w-full h-10 border border-gray-300 rounded px-3" placeholder="바코드 입력" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">카테고리 *</label>
                    <select className="w-full h-10 border border-gray-300 rounded px-3">
                      <option>상의</option>
                      <option>하의</option>
                      <option>신발</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">판매가 *</label>
                      <input className="w-full h-10 border border-gray-300 rounded px-3" value="29000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">원가</label>
                      <input className="w-full h-10 border border-gray-300 rounded px-3" value="15000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">공급가</label>
                      <input className="w-full h-10 border border-gray-300 rounded px-3" value="20000" />
                    </div>
                  </div>
                </WireframeBox>
                
                {/* 액션 버튼 */}
                <WireframeBox label="PANEL_ACTIONS" className="flex justify-end gap-3 pt-4 border-t">
                  <button className="px-4 py-2 border border-gray-300 rounded text-gray-700">취소</button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">저장</button>
                </WireframeBox>
              </div>
            </div>
          </WireframeBox>

          <SpecBox title="🔧 개발 명세 - 사이드패널">
            <div className="space-y-2">
              <p><strong>컴포넌트:</strong> SidePanel, TabContainer, FormField, ImageUpload</p>
              <p><strong>상태관리:</strong> panelOpen, activeTab, formData, validation</p>
              <p><strong>API:</strong> GET /api/products/:id, PUT /api/products/:id</p>
              <p><strong>유효성검사:</strong> 실시간 validation, 필수필드 체크</p>
              <p><strong>애니메이션:</strong> slide-in/out 300ms, backdrop fade</p>
              <p><strong>이미지업로드:</strong> 드래그앤드롭, 미리보기, 압축</p>
              <p><strong>자동저장:</strong> debounced auto-save, 변경사항 추적</p>
            </div>
          </SpecBox>
        </section>

        {/* 7. 기술적 요구사항 */}
        <section className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">7. 🛠️ 기술적 요구사항 및 구현 가이드</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecBox title="📡 API 설계">
              <div className="space-y-2 font-mono text-xs">
                <p><strong>GET</strong> /api/products?page=1&limit=20&sort=created_desc</p>
                <p><strong>POST</strong> /api/products (상품 생성)</p>
                <p><strong>PUT</strong> /api/products/:id (상품 수정)</p>
                <p><strong>DELETE</strong> /api/products/:id (상품 삭제)</p>
                <p><strong>POST</strong> /api/products/batch (일괄 처리)</p>
                <p><strong>POST</strong> /api/products/upload (엑셀 업로드)</p>
                <p><strong>GET</strong> /api/products/export (엑셀 다운로드)</p>
              </div>
            </SpecBox>

            <SpecBox title="📊 데이터 구조">
              <div className="space-y-1 font-mono text-xs">
                <p>Product: id, name, code, category, price, stock</p>
                <p>Category: id, name, parent_id, level</p>
                <p>Brand: id, name, logo_url</p>
                <p>Variant: id, product_id, sku, price, stock</p>
                <p>Image: id, product_id, url, alt, order</p>
              </div>
            </SpecBox>

            <SpecBox title="🔧 성능 최적화">
              <div className="space-y-1 text-xs">
                <p>• React.memo로 불필요한 리렌더링 방지</p>
                <p>• useMemo로 필터링 결과 캐싱</p>
                <p>• useCallback으로 이벤트 핸들러 최적화</p>
                <p>• 이미지 lazy loading 및 WebP 지원</p>
                <p>• 가상화 스크롤 (react-window)</p>
                <p>• 검색 debouncing (300ms)</p>
              </div>
            </SpecBox>

            <SpecBox title="🎨 디자인 토큰">
              <div className="space-y-1 text-xs">
                <p>• Primary: #007BED</p>
                <p>• Success: #10b981</p>
                <p>• Warning: #f59e0b</p>
                <p>• Error: #ef4444</p>
                <p>• Gray: #6b7280</p>
                <p>• Font: Pretendard, system-ui</p>
                <p>• Border Radius: 8px</p>
              </div>
            </SpecBox>

            <SpecBox title="♿ 접근성 (A11y)">
              <div className="space-y-1 text-xs">
                <p>• 키보드 네비게이션 지원</p>
                <p>• ARIA labels 및 roles</p>
                <p>• 스크린 리더 호환</p>
                <p>• 색상 대비 4.5:1 이상</p>
                <p>• Focus indicator 제공</p>
                <p>• Skip to content 링크</p>
              </div>
            </SpecBox>

            <SpecBox title="📱 반응형 디자인">
              <div className="space-y-1 text-xs">
                <p>• Mobile First 접근법</p>
                <p>• Breakpoints: 768px, 1024px, 1280px</p>
                <p>• 터치 친화적 UI (44px 최소 터치 영역)</p>
                <p>• 모바일에서 카드뷰 → 리스트뷰 전환</p>
                <p>• 접기/펼치기 필터 패널</p>
              </div>
            </SpecBox>
          </div>
        </section>

        {/* 8. 피그마 컴포넌트 가이드 */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">피그마 컴포넌트 정리</h2>
              <p className="text-purple-600 text-sm">디자인 시스템으로 바로 가져가기</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 주요 컴포넌트 정리 */}
            <div className="space-y-6">
              <SpecBox title="🔧 핵심 컴포넌트 (8개)">
                <div className="space-y-3">
                  {/* SearchBar Component */}
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-500 text-white px-2 py-1 text-xs rounded font-bold">SearchBar</span>
                      <span className="text-xs text-gray-500">Width: 320px, Height: 40px</span>
                    </div>
                    <div className="relative">
                      <div className="w-full h-10 bg-white border-2 border-gray-300 rounded-lg flex items-center px-3 text-sm text-gray-500">
                        🔍 상품명, 코드 검색...
                      </div>
                    </div>
                  </div>

                  {/* FilterDropdown Component */}
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-green-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-green-500 text-white px-2 py-1 text-xs rounded font-bold">FilterDropdown</span>
                      <span className="text-xs text-gray-500">Width: 160px, Height: 40px</span>
                    </div>
                    <select className="w-full h-10 border-2 border-gray-300 rounded-lg px-3 text-sm">
                      <option>카테고리 선택</option>
                      <option>상의</option>
                      <option>하의</option>
                    </select>
                  </div>

                  {/* ActionButton Component */}
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-purple-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-500 text-white px-2 py-1 text-xs rounded font-bold">ActionButton</span>
                      <span className="text-xs text-gray-500">Width: 120px, Height: 40px</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium">Primary</button>
                      <button className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">Secondary</button>
                    </div>
                  </div>

                  {/* ProductCard Component */}
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-orange-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-orange-500 text-white px-2 py-1 text-xs rounded font-bold">ProductCard</span>
                      <span className="text-xs text-gray-500">Width: 100%, Height: 120px</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">상품명</h4>
                          <p className="text-xs text-gray-500">코드: PRD001</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">₩29,000</div>
                          <div className="text-xs text-gray-500">재고: 150개</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SpecBox>

              <SpecBox title="📐 레이아웃 그리드">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">24-Column Grid System</h4>
                    <div className="grid grid-cols-24 gap-1">
                      {Array.from({length: 24}, (_, i) => (
                        <div key={i} className="h-4 bg-blue-100 text-xs flex items-center justify-center text-blue-600">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Gutter: 16px, Max-width: 1200px</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-sm mb-2">Spacing Scale</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="w-1 h-4 bg-blue-500"></div>
                        <span className="text-xs">4px - xs</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-4 bg-blue-500"></div>
                        <span className="text-xs">8px - sm</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-blue-500"></div>
                        <span className="text-xs">16px - md</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-4 bg-blue-500"></div>
                        <span className="text-xs">24px - lg</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-4 bg-blue-500"></div>
                        <span className="text-xs">32px - xl</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SpecBox>
            </div>

            {/* 컬러 & 타이포그래피 */}
            <div className="space-y-6">
              <SpecBox title="🎨 컬러 팔레트">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Primary Colors</h4>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg mb-1"></div>
                        <p className="text-xs">#007BED</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-lg mb-1"></div>
                        <p className="text-xs">#10b981</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-500 rounded-lg mb-1"></div>
                        <p className="text-xs">#f59e0b</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-500 rounded-lg mb-1"></div>
                        <p className="text-xs">#ef4444</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-500 rounded-lg mb-1"></div>
                        <p className="text-xs">#6b7280</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Gray Scale</h4>
                    <div className="grid grid-cols-6 gap-2">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-100 rounded mb-1"></div>
                        <p className="text-xs">100</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-200 rounded mb-1"></div>
                        <p className="text-xs">200</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-300 rounded mb-1"></div>
                        <p className="text-xs">300</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-500 rounded mb-1"></div>
                        <p className="text-xs">500</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-700 rounded mb-1"></div>
                        <p className="text-xs">700</p>
                      </div>
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gray-900 rounded mb-1"></div>
                        <p className="text-xs">900</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SpecBox>

              <SpecBox title="📝 Typography Scale">
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-gray-900">Heading 1 - 30px</div>
                  <div className="text-2xl font-bold text-gray-900">Heading 2 - 24px</div>
                  <div className="text-xl font-semibold text-gray-900">Heading 3 - 20px</div>
                  <div className="text-lg font-semibold text-gray-900">Heading 4 - 18px</div>
                  <div className="text-base text-gray-900">Body Large - 16px</div>
                  <div className="text-sm text-gray-900">Body Medium - 14px</div>
                  <div className="text-xs text-gray-600">Caption - 12px</div>
                </div>
                <div className="mt-4 p-3 bg-gray-100 rounded">
                  <p className="text-xs text-gray-700">
                    <strong>Font Family:</strong> Pretendard, -apple-system, BlinkMacSystemFont, sans-serif
                  </p>
                </div>
              </SpecBox>

              <SpecBox title="🔄 Component States">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Button States</h4>
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-3 py-2 bg-blue-500 text-white rounded text-sm">Normal</button>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Hover</button>
                      <button className="px-3 py-2 bg-blue-700 text-white rounded text-sm">Active</button>
                      <button className="px-3 py-2 bg-gray-300 text-gray-500 rounded text-sm">Disabled</button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Input States</h4>
                    <div className="space-y-2">
                      <input className="w-full px-3 py-2 border border-gray-300 rounded" placeholder="Normal" />
                      <input className="w-full px-3 py-2 border-2 border-blue-500 rounded" placeholder="Focused" />
                      <input className="w-full px-3 py-2 border-2 border-red-500 rounded" placeholder="Error" />
                    </div>
                  </div>
                </div>
              </SpecBox>
            </div>
          </div>

          {/* 피그마 Export 가이드 */}
          <div className="mt-8 bg-white p-6 rounded-xl border-2 border-purple-200">
            <h3 className="text-lg font-bold text-purple-900 mb-4">🚀 피그마 Export 가이드</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-800">1. 컴포넌트 분리</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• SearchBar → Auto Layout</li>
                  <li>• FilterDropdown → Component</li>
                  <li>• ProductCard → Master Component</li>
                  <li>• ActionButton → Button Variants</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-800">2. Design Tokens</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Color Styles → 팔레트 등록</li>
                  <li>• Text Styles → 타이포그래피</li>
                  <li>• Effect Styles → 그림자/보더</li>
                  <li>• Grid Styles → 24컬럼 그리드</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-800">3. 반응형 설정</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Desktop: 1200px+</li>
                  <li>• Tablet: 768px - 1199px</li>
                  <li>• Mobile: 320px - 767px</li>
                  <li>• Auto Layout → Fill container</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9. 사용자 시나리오 */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">9. 📝 사용자 시나리오 및 테스트 케이스</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpecBox title="👤 주요 사용자 플로우">
              <div className="space-y-3 text-sm">
                <div>
                  <h5 className="font-semibold text-green-800">상품 검색 플로우</h5>
                  <p>1. 검색어 입력 → 2. 필터 선택 → 3. 결과 확인 → 4. 상품 선택</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800">상품 편집 플로우</h5>
                  <p>1. 상품 클릭 → 2. 사이드패널 열림 → 3. 정보 수정 → 4. 저장</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-800">일괄 처리 플로우</h5>
                  <p>1. 상품 다중선택 → 2. 일괄액션 선택 → 3. 확인 → 4. 처리완료</p>
                </div>
              </div>
            </SpecBox>

            <SpecBox title="🧪 테스트 케이스">
              <div className="space-y-2 text-sm">
                <p>• 빈 검색결과 처리</p>
                <p>• 네트워크 오류 시 재시도</p>
                <p>• 대용량 데이터 스크롤 성능</p>
                <p>• 이미지 로딩 실패 처리</p>
                <p>• 폼 유효성 검사</p>
                <p>• 브라우저 뒤로가기 지원</p>
                <p>• 모바일 터치 이벤트</p>
              </div>
            </SpecBox>

            <SpecBox title="⚠️ 엣지 케이스">
              <div className="space-y-2 text-sm">
                <p>• 동시 편집 충돌 방지</p>
                <p>• 세션 만료 처리</p>
                <p>• 권한 없는 액션 차단</p>
                <p>• 파일 업로드 크기 제한</p>
                <p>• 특수문자 입력 처리</p>
                <p>• SQL Injection 방지</p>
              </div>
            </SpecBox>

            <SpecBox title="📈 성능 지표">
              <div className="space-y-2 text-sm">
                <p>• First Load: &lt; 3s</p>
                <p>• Time to Interactive: &lt; 2s</p>
                <p>• 검색 응답시간: &lt; 500ms</p>
                <p>• 이미지 로딩: &lt; 1s</p>
                <p>• 메모리 사용량: &lt; 100MB</p>
                <p>• Bundle Size: &lt; 1MB</p>
              </div>
            </SpecBox>
          </div>
        </section>



      </div>
    </div>
  );
};

export default ProductManagementWireframe;
