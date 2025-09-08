"use client";
import React from 'react';

interface SearchFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchValue,
  onSearchChange,
  placeholder = "검색어를 입력하세요...",
  filters,
  actions,
  className = ""
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 p-4 space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* 검색 영역 */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={placeholder}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                       bg-gray-50 text-sm placeholder-gray-500 
                       focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* 액션 버튼들 */}
        {actions && (
          <div className="flex-shrink-0 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* 필터 영역 */}
      {filters && (
        <div className="flex flex-wrap gap-2">
          {filters}
        </div>
      )}
    </div>
  );
};

export { SearchFilterBar };
