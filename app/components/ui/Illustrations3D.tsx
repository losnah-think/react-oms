"use client";
import React from 'react';

// 3D 일러스트 컴포넌트들
export const Illustration3D = {
  // 빈 상태 일러스트
  EmptyBox: ({ className = "w-32 h-32" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0 transform perspective-1000">
        {/* 메인 박스 */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-2xl transform rotate-12 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-400/30 to-white/60 rounded-2xl"></div>
          
          {/* 박스 뚜껑 */}
          <div className="absolute -top-2 -right-2 w-16 h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg transform -rotate-45 shadow-lg"></div>
          
          {/* 박스 라벨 */}
          <div className="absolute top-4 left-4 w-12 h-8 bg-white/80 rounded-md shadow-sm">
            <div className="w-full h-2 bg-gray-300 rounded-full mt-2 mx-auto"></div>
            <div className="w-8 h-1 bg-gray-200 rounded-full mt-1 mx-auto"></div>
          </div>
          
          {/* 포장 테이프 */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gradient-to-r from-blue-200/60 via-blue-300/80 to-blue-200/60 transform -translate-y-1/2"></div>
          
          {/* 빛 반사 */}
          <div className="absolute top-2 right-4 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
        </div>
        
        {/* 그림자 */}
        <div className="absolute bottom-0 left-4 w-24 h-6 bg-gray-400/20 rounded-full blur-lg transform skew-x-12"></div>
      </div>
    </div>
  ),

  // 성공 일러스트
  SuccessCelebration: ({ className = "w-32 h-32" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0 transform perspective-1000">
        {/* 메인 원형 */}
        <div className="relative w-full h-full bg-gradient-to-br from-green-300 via-green-400 to-green-600 rounded-full shadow-2xl animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-green-500/30 to-white/60 rounded-full"></div>
          
          {/* 체크마크 */}
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-4xl font-bold transform rotate-12">✓</div>
          </div>
          
          {/* 반짝이 효과들 */}
          <div className="absolute top-4 right-6 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-6 left-4 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-8 left-8 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          
          {/* 외곽 링 */}
          <div className="absolute -inset-2 border-4 border-green-200/50 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    </div>
  ),

  // 에러 일러스트
  ErrorWarning: ({ className = "w-32 h-32" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0 transform perspective-1000">
        {/* 메인 삼각형 */}
        <div className="relative w-full h-full">
          <div className="w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-gradient-to-b border-b-red-500 mx-auto transform rotate-12 drop-shadow-2xl">
          </div>
          
          {/* 경고 기호 배경 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-lg transform rotate-45 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 to-white/50 rounded-lg"></div>
              
              {/* 느낌표 */}
              <div className="flex items-center justify-center h-full transform -rotate-45">
                <div className="text-white text-3xl font-bold animate-pulse">!</div>
              </div>
              
              {/* 경고 빛 */}
              <div className="absolute -inset-1 border-2 border-red-300/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
          
          {/* 번개 효과 */}
          <div className="absolute top-2 right-4 w-3 h-6 bg-yellow-400 transform rotate-12 animate-flash" style={{
            clipPath: 'polygon(20% 0%, 40% 40%, 100% 40%, 60% 100%, 80% 60%, 0% 60%)'
          }}></div>
        </div>
      </div>
    </div>
  ),

  // 로딩 일러스트
  LoadingBox: ({ className = "w-16 h-16" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0">
        {/* 회전하는 큐브 */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-lg shadow-lg animate-spin transform origin-center">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-white/40 rounded-lg"></div>
          
          {/* 큐브 면들 */}
          <div className="absolute top-1 right-1 w-3 h-3 bg-blue-300/60 rounded-sm"></div>
          <div className="absolute bottom-1 left-1 w-2 h-4 bg-blue-600/80 rounded-sm"></div>
          
          {/* 중앙 도트 */}
          <div className="flex items-center justify-center h-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* 궤도 링 */}
        <div className="absolute -inset-2 border-2 border-blue-200/30 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
      </div>
    </div>
  ),

  // 검색 일러스트
  SearchMagnifier: ({ className = "w-24 h-24" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0 transform perspective-1000">
        {/* 돋보기 렌즈 */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 rounded-full shadow-xl border-4 border-gray-300">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300/20 to-white/80 rounded-full"></div>
          
          {/* 렌즈 반사 */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-white/60 rounded-full blur-sm"></div>
          <div className="absolute top-1 right-3 w-2 h-2 bg-blue-200/80 rounded-full"></div>
        </div>
        
        {/* 돋보기 손잡이 */}
        <div className="absolute bottom-0 right-0 w-3 h-8 bg-gradient-to-b from-yellow-600 via-yellow-700 to-yellow-900 rounded-full shadow-lg transform rotate-45 origin-top"></div>
        
        {/* 검색 결과 점들 */}
        <div className="absolute top-6 left-6 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute top-8 left-8 w-1 h-1 bg-green-500 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-7 left-7 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
      </div>
    </div>
  ),

  // 설정 일러스트
  SettingsGear: ({ className = "w-24 h-24" }: { className?: string }) => (
    <div className={`relative ${className} mx-auto`}>
      <div className="absolute inset-0">
        {/* 메인 기어 */}
        <div className="w-full h-full bg-gradient-to-br from-gray-400 via-gray-500 to-gray-700 rounded-lg shadow-xl animate-spin-slow transform">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-600/30 to-white/40 rounded-lg"></div>
          
          {/* 기어 톱니들 */}
          <div className="absolute -top-1 left-1/2 w-2 h-2 bg-gray-600 rounded-sm transform -translate-x-1/2"></div>
          <div className="absolute -right-1 top-1/2 w-2 h-2 bg-gray-600 rounded-sm transform -translate-y-1/2"></div>
          <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-gray-600 rounded-sm transform -translate-x-1/2"></div>
          <div className="absolute -left-1 top-1/2 w-2 h-2 bg-gray-600 rounded-sm transform -translate-y-1/2"></div>
          
          {/* 중앙 구멍 */}
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-inner">
            <div className="absolute inset-1 bg-gradient-to-br from-gray-600 to-gray-900 rounded-full"></div>
          </div>
          
          {/* 반사광 */}
          <div className="absolute top-2 right-3 w-3 h-3 bg-white/30 rounded-full blur-sm"></div>
        </div>
        
        {/* 작은 기어 */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-lg animate-spin transform origin-center" style={{ animationDirection: 'reverse' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-white/40 rounded-lg"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-orange-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  )
};

// CSS 애니메이션 추가
export const animations3D = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes flash {
    0%, 50% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
  
  .animate-flash {
    animation: flash 1s ease-in-out infinite;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out infinite;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
`;
