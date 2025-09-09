"use client";
import React, { useEffect, ErrorInfo } from "react";

// Error Boundary Component
class WireframeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Wireframe Error Boundary caught an error:', error, errorInfo);
    // 알럿 대신 콘솔에만 로그 출력
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">와이어프레임 로딩 중 문제가 발생했습니다</h2>
            <p className="text-gray-600 mb-4">페이지를 새로고침해 주세요.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ---------- Wireframe Components ----------

// Box Placeholder Component
const WireBox: React.FC<{
  width?: string;
  height?: string;
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'gray' | 'blue' | 'purple' | 'green';
}> = ({ width = '100%', height = '100px', label, variant = 'dashed', color = 'gray' }) => {
  const colorClasses = {
    gray: 'border-gray-300 bg-gray-50 text-gray-600',
    blue: 'border-blue-300 bg-blue-50 text-blue-600',
    purple: 'border-purple-300 bg-purple-50 text-purple-600',
    green: 'border-green-300 bg-green-50 text-green-600'
  };

  const borderStyles = {
    solid: 'border-2',
    dashed: 'border-2 border-dashed',
    dotted: 'border-2 border-dotted'
  };

  return (
    <div 
      className={`${borderStyles[variant]} ${colorClasses[color]} rounded-lg flex items-center justify-center text-sm font-medium`}
      style={{ width, height }}
    >
      {label}
    </div>
  );
};

// Text Placeholder Component
const WireText: React.FC<{
  lines?: number;
  width?: string;
  align?: 'left' | 'center' | 'right';
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
}> = ({ lines = 1, width = '100%', align = 'left', variant = 'body' }) => {
  const heights = {
    title: 'h-6',
    subtitle: 'h-5',
    body: 'h-4',
    caption: 'h-3'
  };

  const alignClass = align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '';

  return (
    <div className="space-y-2" style={{ width }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`bg-gray-300 rounded ${heights[variant]} ${alignClass}`}
          style={{
            width: i === lines - 1 && lines > 1 ? '75%' : '100%'
          }}
        />
      ))}
    </div>
  );
};

// Button Placeholder Component
const WireButton: React.FC<{
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  width?: string;
  label?: string;
}> = ({ variant = 'primary', size = 'medium', width = 'auto', label = 'Button' }) => {
  const variants = {
    primary: 'bg-brand-primary/30 border-brand-primary',
    secondary: 'bg-gray-100 border-gray-300',
    text: 'bg-transparent border-transparent'
  };

  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  return (
    <div
      className={`${variants[variant]} ${sizes[size]} border-2 border-dashed rounded-lg flex items-center justify-center font-medium text-gray-600`}
      style={{ width }}
    >
      {label}
    </div>
  );
};

// Form Field Placeholder Component
const WireFormField: React.FC<{
  label?: string;
  type?: 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
}> = ({ label = 'Label', type = 'input', required = false }) => {
  const inputHeight = type === 'textarea' ? 'h-20' : 'h-10';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <div className="h-4 bg-gray-400 rounded w-16"></div>
        {required && <span className="text-red-400 text-sm">*</span>}
      </div>
      <div className={`${inputHeight} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center px-3`}>
        <div className="h-3 bg-gray-300 rounded w-32"></div>
      </div>
    </div>
  );
};

// Navigation Placeholder Component
const WireNavigation: React.FC<{
  items?: number;
  layout?: 'horizontal' | 'vertical';
  hasLogo?: boolean;
}> = ({ items = 4, layout = 'horizontal', hasLogo = true }) => {
  return (
    <div className={`flex ${layout === 'vertical' ? 'flex-col space-y-3' : 'items-center space-x-6'} p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg`}>
      {hasLogo && (
        <div className="h-8 w-20 bg-brand-primary/30 rounded"></div>
      )}
      <div className={`flex ${layout === 'vertical' ? 'flex-col space-y-2' : 'space-x-4'}`}>
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className={`h-4 ${i === 0 ? 'bg-brand-primary/30 w-16' : 'bg-gray-300 w-12'} rounded`}></div>
        ))}
      </div>
      <div className="ml-auto flex space-x-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

// Card Placeholder Component
const WireCard: React.FC<{
  hasImage?: boolean;
  hasTitle?: boolean;
  hasContent?: boolean;
  hasActions?: boolean;
  variant?: 'simple' | 'detailed' | 'media';
}> = ({ hasImage = true, hasTitle = true, hasContent = true, hasActions = true, variant = 'simple' }) => {
  return (
    <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
      {hasImage && (
        <div className={`bg-gray-200 rounded ${variant === 'media' ? 'h-32' : 'h-20'} flex items-center justify-center text-gray-500 text-sm`}>
          Image
        </div>
      )}
      {hasTitle && (
        <div className="h-5 bg-gray-400 rounded w-3/4"></div>
      )}
      {hasContent && (
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-4/5"></div>
          {variant === 'detailed' && (
            <div className="h-3 bg-gray-300 rounded w-3/5"></div>
          )}
        </div>
      )}
      {hasActions && (
        <div className="flex space-x-2 pt-2">
          <div className="h-8 bg-brand-primary/30 rounded w-16"></div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      )}
    </div>
  );
};

// Table Placeholder Component
const WireTable: React.FC<{
  columns?: number;
  rows?: number;
  hasHeader?: boolean;
  hasActions?: boolean;
}> = ({ columns = 4, rows = 3, hasHeader = true, hasActions = true }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
      {hasHeader && (
        <div className="bg-gray-100 border-b-2 border-dashed border-gray-300">
          <div className="grid p-3 gap-4" style={{ gridTemplateColumns: `repeat(${columns + (hasActions ? 1 : 0)}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-400 rounded"></div>
            ))}
            {hasActions && <div className="h-4 bg-gray-400 rounded w-16"></div>}
          </div>
        </div>
      )}
      <div className="divide-y-2 divide-dashed divide-gray-300">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid p-3 gap-4" style={{ gridTemplateColumns: `repeat(${columns + (hasActions ? 1 : 0)}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-3 bg-gray-300 rounded"></div>
            ))}
            {hasActions && (
              <div className="flex space-x-1">
                <div className="h-3 w-8 bg-blue-200 rounded"></div>
                <div className="h-3 w-8 bg-red-200 rounded"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Layout Grid Component
const WireGrid: React.FC<{
  columns?: number;
  rows?: number;
  gap?: number;
  children?: React.ReactNode;
}> = ({ columns = 3, rows = 2, gap = 4, children }) => {
  const gapClass = `gap-${gap}`;
  
  if (children) {
    return (
      <div className={`grid grid-cols-${columns} ${gapClass}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-${columns} ${gapClass}`}>
      {Array.from({ length: columns * rows }).map((_, i) => (
        <WireBox key={i} height="120px" label={`Item ${i + 1}`} />
      ))}
    </div>
  );
};

// Modal Placeholder Component
const WireModal: React.FC<{
  size?: 'small' | 'medium' | 'large';
  hasHeader?: boolean;
  hasFooter?: boolean;
}> = ({ size = 'medium', hasHeader = true, hasFooter = true }) => {
  const sizes = {
    small: 'max-w-md',
    medium: 'max-w-lg', 
    large: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
      <div className={`bg-white border-2 border-dashed border-gray-300 rounded-lg w-full ${sizes[size]}`}>
        {hasHeader && (
          <div className="border-b-2 border-dashed border-gray-300 p-4 flex justify-between items-center">
            <div className="h-5 bg-gray-400 rounded w-32"></div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
        )}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          </div>
        </div>
        {hasFooter && (
          <div className="border-t-2 border-dashed border-gray-300 p-4 flex justify-end space-x-3">
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-brand-primary/30 rounded w-16"></div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Wireframe System Page
const WireframeSystem: React.FC = () => {
  useEffect(() => {
    // 페이지 로드 시 JavaScript 에러로 인한 알럿 방지
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    
    // alert와 confirm을 일시적으로 오버라이드
    window.alert = (message) => {
      console.log('Alert blocked:', message);
      return;
    };
    
    window.confirm = (message) => {
      console.log('Confirm blocked:', message);
      return true; // 기본값으로 true 반환
    };

    const handleError = (event: ErrorEvent) => {
      console.error('Wireframe page error caught:', event.error);
      event.preventDefault(); // 브라우저 기본 알럿 방지
      return false;
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault(); // 브라우저 기본 알럿 방지
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      // 정리 시 원래 함수들 복원
      window.alert = originalAlert;
      window.confirm = originalConfirm;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div 
          className="text-center bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-3xl p-10 shadow-2xl border-2 border-purple-200/50 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl opacity-20 transform rotate-12"></div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl opacity-20 transform -rotate-12"></div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            📐 와이어프레임 시스템
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            신속한 프로토타이핑을 위한 와이어프레임 컴포넌트 라이브러리
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            실시간 프로토타이핑 도구
          </div>
        </div>

        {/* System Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="text-blue-800 text-xs font-bold">i</span>
              </div>
            </div>
            <div>
              <h3 className="text-blue-800 font-semibold mb-1">📋 시스템 안내</h3>
              <p className="text-blue-700 text-sm leading-relaxed">
                현재 와이어프레임 시스템은 <strong>프로토타이핑 전용</strong>이며, 빠른 기획 및 구조 설계를 위해 제작되었습니다.<br/>
                실제 개발 시에는 디자인 시스템의 완성된 컴포넌트를 사용해 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">1. 기본 와이어프레임 컴포넌트</h2>
          
          <div className="space-y-8">
            {/* Boxes */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">박스 플레이스홀더</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">기본 박스</p>
                  <WireBox label="Content Area" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">파란색 박스</p>
                  <WireBox label="Primary" color="blue" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">점선 박스</p>
                  <WireBox label="Dotted" variant="dotted" color="purple" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">실선 박스</p>
                  <WireBox label="Solid" variant="solid" color="green" />
                </div>
              </div>
            </div>

            {/* Text Placeholders */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">텍스트 플레이스홀더</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">제목</p>
                  <WireText variant="title" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">부제목</p>
                  <WireText variant="subtitle" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">본문 (3줄)</p>
                  <WireText variant="body" lines={3} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">캡션 (중앙 정렬)</p>
                  <WireText variant="caption" align="center" />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">버튼 플레이스홀더</h3>
              <div className="flex flex-wrap gap-4">
                <WireButton variant="primary" label="Primary" />
                <WireButton variant="secondary" label="Secondary" />
                <WireButton variant="text" label="Text Button" />
                <WireButton variant="primary" size="small" label="Small" />
                <WireButton variant="primary" size="large" label="Large" />
              </div>
            </div>
          </div>
        </section>

        {/* Form Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">2. 폼 컴포넌트</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">기본 폼 필드</h3>
              <WireFormField label="이름" required />
              <WireFormField label="이메일" type="input" />
              <WireFormField label="메시지" type="textarea" />
              <WireFormField label="카테고리" type="select" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">체크박스 & 라디오</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-dashed border-gray-300 rounded-full bg-brand-primary/20"></div>
                  <div className="h-3 bg-gray-400 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">3. 네비게이션 컴포넌트</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">수평 네비게이션</h3>
              <WireNavigation />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">수직 네비게이션</h3>
              <div className="max-w-xs">
                <WireNavigation layout="vertical" items={5} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">탭 네비게이션</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="flex border-b-2 border-dashed border-gray-300 pb-2 mb-4">
                  <div className="h-8 bg-brand-primary/30 rounded w-16 mr-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mr-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-32 bg-gray-50 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Card Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">4. 카드 컴포넌트</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-700">기본 카드</h3>
              <WireCard variant="simple" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-700">상세 카드</h3>
              <WireCard variant="detailed" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-purple-700">미디어 카드</h3>
              <WireCard variant="media" />
            </div>
          </div>
        </section>

        {/* Table Component */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">5. 테이블 컴포넌트</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">기본 테이블</h3>
              <WireTable />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-700">확장 테이블</h3>
              <WireTable columns={6} rows={5} hasActions />
            </div>
          </div>
        </section>

        {/* Layout Templates */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">6. 레이아웃 템플릿</h2>
          
          <div className="space-y-8">
            {/* Dashboard Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">대시보드 레이아웃</h3>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 space-y-4">
                <WireNavigation />
                <div className="grid grid-cols-4 gap-4">
                  <WireBox height="80px" label="KPI 1" color="blue" />
                  <WireBox height="80px" label="KPI 2" color="green" />
                  <WireBox height="80px" label="KPI 3" color="purple" />
                  <WireBox height="80px" label="KPI 4" color="gray" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <WireBox height="200px" label="주요 차트" color="blue" />
                  </div>
                  <div className="space-y-4">
                    <WireBox height="90px" label="통계 1" />
                    <WireBox height="90px" label="통계 2" />
                  </div>
                </div>
                <WireTable columns={5} rows={4} />
              </div>
            </div>

            {/* List-Detail Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">목록-상세 레이아웃</h3>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 space-y-4">
                <WireNavigation />
                <div className="grid grid-cols-4 gap-4">
                  <WireBox height="80px" label="KPI 1" color="blue" />
                  <WireBox height="80px" label="KPI 2" color="green" />
                  <WireBox height="80px" label="KPI 3" color="purple" />
                  <WireBox height="80px" label="KPI 4" color="gray" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <WireBox height="200px" label="주요 차트" color="blue" />
                  </div>
                  <div className="space-y-4">
                    <WireBox height="90px" label="통계 1" />
                    <WireBox height="90px" label="통계 2" />
                  </div>
                </div>
                <WireTable columns={5} rows={4} />
              </div>
            </div>

            {/* List-Detail Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">목록-상세 레이아웃</h3>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 space-y-4">
                <WireNavigation />
                <div className="grid grid-cols-5 gap-4" style={{ minHeight: '400px' }}>
                  <div className="col-span-2 space-y-2">
                    <WireBox height="40px" label="검색" color="gray" />
                    <div className="space-y-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <WireBox key={i} height="60px" label={`항목 ${i + 1}`} color={i === 0 ? 'blue' : 'gray'} />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="space-y-4">
                      <WireText variant="title" />
                      <WireText lines={4} />
                      <WireBox height="150px" label="상세 콘텐츠" color="purple" />
                      <div className="flex space-x-2">
                        <WireButton variant="primary" label="수정" />
                        <WireButton variant="secondary" label="삭제" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Layout */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">폼 페이지 레이아웃</h3>
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 space-y-4">
                <WireNavigation />
                <div className="max-w-2xl mx-auto space-y-6">
                  <WireText variant="title" align="center" />
                  <div className="grid grid-cols-2 gap-4">
                    <WireFormField label="이름" required />
                    <WireFormField label="이메일" required />
                  </div>
                  <WireFormField label="회사명" />
                  <WireFormField label="메시지" type="textarea" />
                  <div className="flex justify-center space-x-4">
                    <WireButton variant="secondary" label="취소" />
                    <WireButton variant="primary" label="제출" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Component Demo */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">7. 모달 컴포넌트</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-purple-800">모달 와이어프레임</h3>
            <div className="relative">
              <WireModal />
            </div>
          </div>
        </section>

        {/* Card Layout Patterns */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-8 text-blue-900">🎴 카드형 레이아웃 패턴</h2>
          
          {/* 일반 카드 (4개/행) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">일반 카드 레이아웃 (최대 4개/행)</h3>
            <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <WireBox height="120px" label="이미지" color="gray" />
                    <div className="mt-3 space-y-2">
                      <WireText variant="subtitle" width="100%" />
                      <WireText variant="body" lines={2} width="100%" />
                      <div className="flex justify-between items-center mt-3">
                        <WireText variant="caption" width="60px" />
                        <WireButton variant="primary" size="small" width="60px" label="액션" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">💡 카테고리, 브랜드, 설정 카드 등에 사용</p>
            </div>
          </div>

          {/* 상품 정보 카드 (1개/행) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-800">상품 정보 카드 (1개/행)</h3>
            <div className="bg-white rounded-lg p-6 shadow-md border border-blue-200">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="grid grid-cols-24 gap-4 items-center">
                      {/* 체크박스 */}
                      <div className="col-span-1">
                        <WireBox width="20px" height="20px" label="☐" color="blue" />
                      </div>
                      
                      {/* 상품 이미지 */}
                      <div className="col-span-4">
                        <WireBox height="80px" label="상품 이미지" color="gray" />
                      </div>
                      
                      {/* 상품 정보 */}
                      <div className="col-span-11 space-y-1">
                        <WireText variant="subtitle" width="100%" />
                        <WireText variant="body" width="80%" />
                        <div className="flex gap-2 items-center">
                          <WireText variant="caption" width="60px" />
                          <WireText variant="caption" width="80px" />
                          <WireText variant="caption" width="50px" />
                        </div>
                      </div>
                      
                      {/* 가격 정보 */}
                      <div className="col-span-6 text-right space-y-1">
                        <WireText variant="title" width="100px" align="right" />
                        <WireText variant="caption" width="80px" align="right" />
                        <WireText variant="caption" width="60px" align="right" />
                      </div>
                      
                      {/* 액션 버튼 */}
                      <div className="col-span-2 space-y-1">
                        <WireButton variant="text" size="small" width="100%" label="수정" />
                        <WireButton variant="text" size="small" width="100%" label="삭제" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">💡 상품 목록, 주문 목록 등 상세 정보가 필요한 리스트에 사용</p>
            </div>
          </div>

          {/* 반응형 가이드 */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-800">📱 반응형 카드 레이아웃</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">🖥️ 데스크탑 (24-column)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• 일반 카드: 4개/행 (각 6-column)</li>
                  <li>• 상품 카드: 1개/행 (24-column 풀)</li>
                  <li>• 여백: 20px 기본, 40px 섹션간</li>
                  <li>• 최대 컨테이너: 7xl (1280px)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">📱 모바일 (스택형)</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• 일반 카드: 1-2개/행으로 축소</li>
                  <li>• 상품 카드: 세로 스택 배치</li>
                  <li>• 이미지: 상단 배치</li>
                  <li>• 터치 영역: 최소 44px</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">🎨 시각적 계층</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• 그림자: 카드 구분</li>
                  <li>• 호버: 살짝 상승 효과</li>
                  <li>• 선택: 테두리 강조</li>
                  <li>• 로딩: 스켈레톤 UI</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">⚡ 성능 고려사항</h4>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• 가상 스크롤링 (큰 목록)</li>
                  <li>• 이미지 지연 로딩</li>
                  <li>• 페이지네이션 또는 무한스크롤</li>
                  <li>• 필터링 최적화</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8 shadow-lg border border-purple-200">
          <h2 className="text-2xl font-bold mb-6 text-purple-900">📋 와이어프레임 사용 가이드</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">🎯 사용 원칙</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• 콘텐츠 구조와 기능에 집중</li>
                <li>• 시각적 디자인보다 정보 흐름 우선</li>
                <li>• 일관된 그리드 시스템 활용</li>
                <li>• 명확한 계층 구조 표현</li>
                <li>• 사용자 여정(User Journey) 고려</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">🔧 활용 팁</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• 점선 테두리로 구역 구분</li>
                <li>• 회색조로 중요도 표현</li>
                <li>• 실제 콘텐츠 길이 고려</li>
                <li>• 반응형 레이아웃 미리 계획</li>
                <li>• 상호작용 요소 명시</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">📱 반응형 고려사항</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• 모바일 우선 설계</li>
                <li>• 터치 타겟 크기 (최소 44px)</li>
                <li>• 콘텐츠 우선순위 재배치</li>
                <li>• 네비게이션 변화 고려</li>
                <li>• 입력 방식별 최적화</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-purple-800">⚡ 프로토타이핑 워크플로우</h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• 1. 사용자 스토리 정의</li>
                <li>• 2. 정보 구조 설계</li>
                <li>• 3. 와이어프레임 스케치</li>
                <li>• 4. 인터랙션 플로우 정의</li>
                <li>• 5. 사용자 테스트 및 개선</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

// Export with Error Boundary wrapped
const WireframeSystemWithErrorBoundary: React.FC = () => {
  return (
    <WireframeErrorBoundary>
      <WireframeSystem />
    </WireframeErrorBoundary>
  );
};

export default WireframeSystemWithErrorBoundary;
