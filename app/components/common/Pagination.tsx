"use client";
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showInfo?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showInfo = true,
  className = ""
}) => {
  const maxVisiblePages = 5;
  const startPage = Math.max(1, Math.min(totalPages - maxVisiblePages + 1, currentPage - 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={`flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 ${className}`}>
      {/* 정보 표시 */}
      {showInfo && totalItems !== undefined && itemsPerPage !== undefined && (
        <div className="flex flex-1 justify-between sm:hidden">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span>
            {' - '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
            {' / '}
            <span className="font-medium">{totalItems}</span>
            개 항목
          </p>
        </div>
      )}

      {/* 데스크톱 정보 */}
      {showInfo && totalItems !== undefined && itemsPerPage !== undefined && (
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              총 <span className="font-medium">{totalItems}</span>개 중{' '}
              <span className="font-medium">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span>
              {' - '}
              <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
              개 표시
            </p>
          </div>
        </div>
      )}

      {/* 페이지네이션 버튼들 */}
      <div className="flex items-center space-x-2">
        {/* 이전 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          이전
        </button>

        {/* 페이지 번호들 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* 다음 페이지 */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export { Pagination };
