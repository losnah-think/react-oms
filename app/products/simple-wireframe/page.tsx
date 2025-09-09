"use client";
import React, { useState } from "react";

// 심플 와이어프레임 박스 컴포넌트
const WireBox: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
  className = "", 
  children 
}) => (
  <div className={`border-2 border-dashed border-gray-300 bg-gray-50 rounded ${className}`}>
    {children}
  </div>
);

const SimpleProductWireframe: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 페이지 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">상품 목록 - 심플 와이어프레임</h1>
          <p className="text-gray-600">레이아웃 구조 및 윤곽 확인용</p>
        </div>

        {/* 헤더 영역 */}
        <WireBox className="h-20 p-4">
          <div className="flex justify-between items-center h-full">
            {/* 좌측 - 경로 및 제목 */}
            <div className="flex items-center space-x-4">
              <WireBox className="w-8 h-8"></WireBox>
              <WireBox className="w-32 h-6"></WireBox>
              <WireBox className="w-24 h-4"></WireBox>
            </div>
            
            {/* 우측 - 액션 버튼 */}
            <div className="flex space-x-3">
              <WireBox className="w-24 h-10"></WireBox>
              <WireBox className="w-28 h-10"></WireBox>
              <WireBox className="w-24 h-10"></WireBox>
            </div>
          </div>
        </WireBox>

        {/* 검색 및 필터 영역 */}
        <WireBox className="p-4">
          <div className="grid grid-cols-12 gap-4 mb-4">
            <WireBox className="col-span-4 h-10"></WireBox>
            <WireBox className="col-span-2 h-10"></WireBox>
            <WireBox className="col-span-2 h-10"></WireBox>
            <WireBox className="col-span-2 h-10"></WireBox>
            <WireBox className="col-span-2 h-10"></WireBox>
          </div>
          
          {/* 고급 필터 (접힌 상태) */}
          <WireBox className="h-12 flex items-center justify-center">
            <span className="text-gray-400 text-sm">고급 필터 (접힌 상태)</span>
          </WireBox>
        </WireBox>

        {/* 목록 컨트롤 */}
        <WireBox className="h-16 p-4">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center space-x-6">
              <WireBox className="w-20 h-6"></WireBox>
              <WireBox className="w-24 h-6"></WireBox>
            </div>
            
            <div className="flex items-center space-x-4">
              <WireBox className="w-20 h-8"></WireBox>
              <WireBox className="w-16 h-8"></WireBox>
              <WireBox className="w-20 h-8"></WireBox>
            </div>
            
            <div className="flex items-center space-x-3">
              <WireBox className="w-24 h-8"></WireBox>
              <WireBox className="w-20 h-8"></WireBox>
              <WireBox className="w-24 h-8"></WireBox>
            </div>
          </div>
        </WireBox>

        {/* 상품 목록 - 카드형 */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <WireBox key={item} className="p-4">
              <div className="grid grid-cols-24 gap-4 items-center">
                {/* 체크박스 */}
                <div className="col-span-1">
                  <WireBox className="w-4 h-4"></WireBox>
                </div>
                
                {/* 이미지 */}
                <div className="col-span-2">
                  <WireBox className="w-16 h-16 mx-auto"></WireBox>
                </div>
                
                {/* 상품 정보 */}
                <div className="col-span-12 space-y-2">
                  <WireBox className="h-6 w-full"></WireBox>
                  <div className="grid grid-cols-4 gap-2">
                    <WireBox className="h-4"></WireBox>
                    <WireBox className="h-4"></WireBox>
                    <WireBox className="h-4"></WireBox>
                    <WireBox className="h-4"></WireBox>
                  </div>
                  <div className="flex space-x-2">
                    <WireBox className="w-12 h-5"></WireBox>
                    <WireBox className="w-16 h-5"></WireBox>
                  </div>
                </div>
                
                {/* 재고 정보 */}
                <div className="col-span-3 space-y-1">
                  <WireBox className="h-5 w-full"></WireBox>
                  <WireBox className="h-4 w-full"></WireBox>
                  <WireBox className="h-4 w-full"></WireBox>
                </div>
                
                {/* 가격 정보 */}
                <div className="col-span-4 space-y-1">
                  <WireBox className="h-6 w-full"></WireBox>
                  <WireBox className="h-4 w-full"></WireBox>
                  <WireBox className="h-4 w-full"></WireBox>
                </div>
                
                {/* 액션 버튼 */}
                <div className="col-span-2 space-y-1">
                  <WireBox className="h-6 w-full"></WireBox>
                  <WireBox className="h-6 w-full"></WireBox>
                  <WireBox className="h-6 w-full"></WireBox>
                </div>
              </div>
            </WireBox>
          ))}
        </div>

        {/* 페이지네이션 */}
        <WireBox className="h-16 p-4">
          <div className="flex justify-center items-center h-full space-x-4">
            <WireBox className="w-16 h-8"></WireBox>
            <div className="flex space-x-2">
              <WireBox className="w-8 h-8"></WireBox>
              <WireBox className="w-8 h-8"></WireBox>
              <WireBox className="w-8 h-8"></WireBox>
              <WireBox className="w-4 h-4"></WireBox>
              <WireBox className="w-8 h-8"></WireBox>
            </div>
            <WireBox className="w-16 h-8"></WireBox>
          </div>
        </WireBox>

        {/* 사이드 패널 (닫힌 상태 표시) */}
        <div className="fixed right-0 top-0 h-full w-12 bg-gray-100 border-l-4 border-dashed border-gray-300 flex items-center justify-center">
          <div className="transform -rotate-90 text-gray-400 text-sm whitespace-nowrap">
            사이드 패널 (닫힌 상태)
          </div>
        </div>

        {/* 모바일 반응형 미리보기 */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">모바일 레이아웃</h2>
          
          <div className="max-w-sm mx-auto space-y-3">
            {/* 모바일 헤더 */}
            <WireBox className="h-14 p-3">
              <div className="flex justify-between items-center">
                <WireBox className="w-6 h-6"></WireBox>
                <WireBox className="w-20 h-6"></WireBox>
                <WireBox className="w-6 h-6"></WireBox>
              </div>
            </WireBox>

            {/* 모바일 검색 */}
            <WireBox className="h-12 p-3">
              <div className="grid grid-cols-4 gap-2 h-full">
                <WireBox className="col-span-3 h-full"></WireBox>
                <WireBox className="col-span-1 h-full"></WireBox>
              </div>
            </WireBox>

            {/* 모바일 상품 카드 */}
            {[1, 2, 3].map((item) => (
              <WireBox key={item} className="p-3">
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <WireBox className="w-16 h-16 flex-shrink-0"></WireBox>
                    <div className="flex-1 space-y-2">
                      <WireBox className="h-5 w-full"></WireBox>
                      <WireBox className="h-4 w-3/4"></WireBox>
                      <WireBox className="h-4 w-1/2"></WireBox>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <WireBox className="h-6 w-20"></WireBox>
                    <div className="flex space-x-1">
                      <WireBox className="w-6 h-6"></WireBox>
                      <WireBox className="w-6 h-6"></WireBox>
                      <WireBox className="w-6 h-6"></WireBox>
                    </div>
                  </div>
                </div>
              </WireBox>
            ))}

            {/* 모바일 하단 네비게이션 */}
            <WireBox className="h-16 p-2">
              <div className="grid grid-cols-5 gap-1 h-full">
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
              </div>
            </WireBox>
          </div>
        </div>

        {/* 태블릿 반응형 미리보기 */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">태블릿 레이아웃</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {/* 태블릿 헤더 */}
            <WireBox className="h-16 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <WireBox className="w-8 h-8"></WireBox>
                  <WireBox className="w-32 h-6"></WireBox>
                </div>
                <div className="flex space-x-2">
                  <WireBox className="w-20 h-8"></WireBox>
                  <WireBox className="w-20 h-8"></WireBox>
                </div>
              </div>
            </WireBox>

            {/* 태블릿 필터 */}
            <WireBox className="h-14 p-3">
              <div className="grid grid-cols-6 gap-3 h-full">
                <WireBox className="col-span-3 h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
                <WireBox className="h-full"></WireBox>
              </div>
            </WireBox>

            {/* 태블릿 상품 그리드 (2열) */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <WireBox key={item} className="p-4">
                  <div className="space-y-3">
                    <WireBox className="h-32 w-full"></WireBox>
                    <WireBox className="h-5 w-full"></WireBox>
                    <WireBox className="h-4 w-3/4"></WireBox>
                    <div className="flex justify-between">
                      <WireBox className="h-6 w-20"></WireBox>
                      <WireBox className="h-6 w-16"></WireBox>
                    </div>
                  </div>
                </WireBox>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SimpleProductWireframe;
