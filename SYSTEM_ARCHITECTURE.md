# React OMS (Order Management System) - 시스템 구조 및 기능 정리

## 📋 개요
- **프로젝트명**: React OMS (Order Management System)
- **기술 스택**: Next.js 13+, TypeScript, Tailwind CSS, Docker
- **개발 일자**: 2024년 1월 - 현재
- **목적**: 종합 쇼핑몰 관리 시스템

## 🏗️ 시스템 아키텍처

### Frontend 구조
```
app/
├── layout.js                    # 전역 레이아웃 (헤더 + LNB)
├── page.js                      # 메인 대시보드
├── globals.css                  # 전역 스타일
├── products/                    # 상품 관리 모듈
│   ├── page.js                  # 상품 목록
│   ├── ProductList.tsx          # 상품 목록 컴포넌트
│   ├── [id]/page.tsx           # 상품 상세
│   ├── register/page.tsx        # 상품 등록 (new -> register로 경로 변경)
│   ├── categories/page.tsx      # 카테고리 관리
│   └── api-integration/page.tsx # 외부 API 상품 수신
└── malls/                       # 쇼핑몰 관리 모듈
    ├── page.tsx                 # 쇼핑몰 대시보드
    ├── products/page.tsx        # 쇼핑몰별 상품 관리
    ├── additional/page.tsx      # 부가 정보 관리
    └── categories/page.tsx      # 카테고리 매핑 관리
```

## 🎯 핵심 기능

### 1. 상품 관리 시스템
- **상품 목록**: 필터링, 정렬, 검색, 페이징 기능
- **상품 등록**: 다단계 폼을 통한 상품 등록
- **상품 상세**: 개별 상품 정보 조회 및 수정
- **카테고리 관리**: 계층형 카테고리 트리 구조 관리

### 2. 쇼핑몰 관리 시스템
- **멀티 채널 지원**: 네이버, 쿠팡, G마켓, 11번가
- **쇼핑몰별 상품 관리**: 채널별 상품 동기화
- **부가 정보 관리**: 채널별 특화 정보
- **카테고리 매핑**: 내부-외부 카테고리 연결

### 3. 외부 API 연동
- **지원 플랫폼**: 카페24, 위사몰, 메이크샵, 고도몰5, 네이버 스마트스토어
- **5단계 워크플로우**: 
  1. 판매처 선택
  2. API 인증
  3. 상품 조회
  4. 매핑 설정
  5. 일괄 등록

## 🎨 UI/UX 특징

### 디자인 시스템
- **컬러 팔레트**: Blue 계열 (Primary), Gray 계열 (Neutral)
- **타이포그래피**: Inter 폰트 기반 시스템
- **아이콘**: 이모지 기반 직관적 아이콘 시스템
- **반응형**: 모바일-퍼스트 반응형 디자인

### 컴포넌트 시스템
- **헤더**: 검색, 알림, 프로필 영역
- **LNB**: 아코디언 형태 네비게이션
- **카드 시스템**: 통계, 상품, 카테고리 표시
- **모달 시스템**: 상세 정보, 수정 폼

## 📊 데이터 구조

### 상품 (Product)
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'active' | 'inactive' | 'sold_out';
  description?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
```

### 카테고리 (Category)
```typescript
interface Category {
  id: string;
  name: string;
  path: string[];
  parentId: string | null;
  level: number;
  productCount: number;
  status: string;
  displayOrder: number;
  description?: string;
}
```

### 쇼핑몰 채널 (ShoppingMall)
```typescript
interface ShoppingMall {
  id: string;
  name: string;
  logo: string;
  status: 'connected' | 'error' | 'syncing';
  lastSync?: string;
  productCount: number;
  orderCount: number;
  revenue: number;
}
```

## 🔄 워크플로우

### 상품 등록 워크플로우
1. 기본 정보 입력 (이름, 카테고리, 브랜드)
2. 가격 정보 설정 (판매가, 원가, 할인율)
3. 재고 관리 설정 (수량, 안전재고)
4. 상세 정보 입력 (설명, 이미지)
5. 검토 및 등록

### 외부 API 연동 워크플로우
1. **판매처 선택**: 5개 플랫폼 중 선택
2. **API 인증**: 플랫폼별 인증 처리
3. **상품 조회**: 원격 상품 목록 불러오기
4. **매핑 설정**: 카테고리/브랜드 매핑
5. **일괄 등록**: 선택 상품 등록

## 📈 통계 및 KPI

### 대시보드 지표
- 총 상품 수
- 활성 상품 수  
- 총 주문 수
- 월별 매출액
- 채널별 성과

### 카테고리 통계
- 전체 카테고리 수
- 활성 카테고리 수
- 매핑 완료율
- 최대 카테고리 깊이

## 🔧 기술적 특징

### Performance
- **Next.js 13+**: App Router 사용
- **Code Splitting**: 자동 코드 분할
- **Image Optimization**: Next.js Image 최적화

### TypeScript
- **강타입 시스템**: 전체 프로젝트 TypeScript
- **Interface 정의**: 모든 데이터 구조 타입화
- **Type Safety**: 컴파일 타임 에러 방지

### Styling
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Responsive Design**: 모바일 퍼스트 반응형
- **Dark Mode Ready**: 다크모드 대응 준비

## 🚀 배포 환경

### Docker 구성
- **Multi-stage Build**: 최적화된 프로덕션 이미지
- **Nginx Reverse Proxy**: 정적 파일 서빙 최적화
- **Environment Variables**: 환경별 설정 분리

### Production Ready
- **Health Check**: 컨테이너 상태 모니터링
- **Log Management**: 구조화된 로그 시스템
- **Security**: HTTPS, CSP 설정

## 📝 개발 히스토리

### Phase 1: 기본 구조 (완료)
- Next.js 프로젝트 초기화
- 기본 레이아웃 및 네비게이션
- 상품 목록/상세 페이지

### Phase 2: 고급 기능 (완료)
- 필터링 및 페이징 시스템
- 상품 등록 다단계 폼
- Docker 컨테이너화

### Phase 3: 멀티채널 (완료)
- 쇼핑몰 관리 시스템
- 카테고리 매핑 기능
- 부가 정보 관리

### Phase 4: API 연동 (완료)
- 외부 API 연동 시스템
- 카테고리 관리 개선
- 상품 정보 자동 수신

## 🎯 향후 개발 계획

### Short Term
- 실제 API 연동 구현
- 데이터베이스 연결
- 인증 시스템 구축

### Long Term
- 실시간 알림 시스템
- 고급 분석 대시보드
- 모바일 앱 개발

---

**마지막 업데이트**: 2024년 1월 15일  
**개발자**: React OMS Team  
**버전**: v1.0.0
