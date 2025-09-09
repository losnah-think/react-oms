"use client";
import React from 'react';
import { Icon3D } from '../ui/Icons3D';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between w-full">
          {/* 로고 영역 - 좌측 끝 */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="transform hover:scale-110 transition-transform duration-200">
              <Icon3D.Box />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React OMS
                </h1>
                <span className="px-2 py-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs rounded-full font-bold shadow-sm animate-pulse">
                  DEMO
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Design Proposal Version</p>
            </div>
          </div>

          {/* 검색 영역 - 중앙 */}
          <div className="flex-1 max-w-lg mx-4 sm:mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon3D.Search />
              </div>
              <input
                type="text"
                placeholder="전체 검색..."
                className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:shadow-md"
              />
            </div>
          </div>

          {/* 우측 메뉴 - 프로필 우측 끝 */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Icon3D.Bell />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
              <Icon3D.Settings />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <Icon3D.User />
              </div>
              <div className="text-sm hidden sm:block">
                <div className="font-medium text-gray-900">관리자</div>
                <div className="text-gray-500 text-xs">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
