"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon3D } from '../ui/Icons3D';

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { 
      title: "🎨 디자인 시스템", 
      icon: <Icon3D.Components />, 
      href: "/components-library", 
      active: true,
      badge: "활성화",
      subItems: []
    },
    { 
      title: "📦 상품 관리", 
      icon: <Icon3D.Products />, 
      href: "/products", 
      active: false,
      badge: "개발예정",
      disabled: true,
      subItems: [
        { title: "상품 목록", href: "/products", active: false },
        { title: "CSV 상품 등록", href: "/products/csv-upload", active: false },
        { title: "상품 정보 자동 불러오기", href: "/products/api-integration", active: false },
      ]
    },
    { 
      title: "🏪 쇼핑몰 관리", 
      icon: <Icon3D.Mall />, 
      href: "/malls", 
      active: false,
      badge: "개발예정",
      disabled: true,
      subItems: [
        { title: "분석 대시보드", href: "/malls/analytics", active: false },
        { title: "쇼핑몰별 상품 관리", href: "/malls/products", active: false },
        { title: "쇼핑몰별 부가 정보 관리", href: "/malls/additional", active: false },
        { title: "카테고리 매핑", href: "/malls/categories", active: false },
      ]
    },
    { 
      title: "⚙️ 기초 관리", 
      icon: <Icon3D.Basic />, 
      href: "/basic/brands", 
      active: false,
      badge: "개발예정",
      disabled: true,
      subItems: [
        { title: "브랜드 관리", href: "/basic/brands", active: false },
        { title: "카테고리 관리", href: "/basic/categories", active: false },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto shadow-inner">
      <nav className="p-4 space-y-2 h-full">
        {menuItems.map((item, index) => (
          <div key={index} className="group">
            {item.disabled ? (
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium cursor-not-allowed opacity-60 bg-gray-100 border border-gray-200`}>
                <div className="flex-shrink-0 opacity-50">
                  {item.icon}
                </div>
                <span className="flex-1 font-semibold text-gray-500">{item.title}</span>
                <span className="text-xs px-2 py-1 bg-gray-300 text-gray-600 rounded-full font-medium">
                  {item.badge}
                </span>
              </div>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-[1.02] ${
                  pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href))
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-md' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 hover:shadow-sm'
                }`}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                <span className="flex-1 font-semibold">{item.title}</span>
                {item.badge && (
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full font-medium shadow-sm">
                    {item.badge}
                  </span>
                )}
                {item.subItems && item.subItems.length > 0 && !item.disabled && (
                  <div className={`text-xs transition-transform duration-200 ${
                    pathname === item.href || item.subItems.some(sub => pathname === sub.href) ? 'rotate-180' : ''
                  }`}>
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white text-xs">
                      ▼
                    </div>
                  </div>
                )}
              </Link>
            )}
            
            {/* 서브 메뉴 */}
            {item.subItems && item.subItems.length > 0 && (pathname === item.href || item.subItems.some(sub => pathname === sub.href)) && (
              <div className="ml-6 mt-2 space-y-1 animate-fade-in">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:translate-x-1 ${
                      pathname === subItem.href
                        ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold border-l-4 border-blue-500 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      pathname === subItem.href 
                        ? 'bg-blue-500 shadow-md' 
                        : 'bg-gray-300 group-hover:bg-gray-400'
                    }`}></div>
                    <span>{subItem.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export { Sidebar };
