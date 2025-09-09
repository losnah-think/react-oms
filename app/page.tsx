"use client";
import Link from "next/link";
import { Button } from "./components/ui";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-8xl mb-6">🚀</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            React OMS
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            모던하고 직관적인 주문 관리 시스템<br/>
            <span className="text-sm text-gray-500">Order Management System - Design Proposal</span>
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/components-library">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                🎨 디자인 시스템 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">상품 관리</h3>
            <p className="text-gray-600 mb-4">효율적인 상품 등록, 수정, 삭제 및 CSV 일괄 업로드 기능</p>
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">개발 예정</span>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">쇼핑몰 연동</h3>
            <p className="text-gray-600 mb-4">다중 쇼핑몰 관리 및 실시간 동기화</p>
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">개발 예정</span>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">디자인 시스템</h3>
            <p className="text-gray-600 mb-4">일관된 사용자 경험을 위한 컴포넌트 라이브러리</p>
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full text-sm font-medium shadow-sm">
              ✨ 미리보기 가능
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">프로젝트 제안서</h2>
          <p className="text-lg mb-8 opacity-90">
            이 페이지는 고객사 제안을 위한 데모 버전입니다.<br/>
            실제 개발에서는 더욱 풍부한 기능과 최적화된 성능을 제공합니다.
          </p>
          <Link href="/components-library">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              디자인 컴포넌트 둘러보기 →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
