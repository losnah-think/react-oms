"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 메인 페이지 접속시 자동으로 components-library 페이지로 리다이렉트
    router.push("/design-system");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🎨</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">React OMS</h1>
        <p className="text-gray-600 mb-4">디자인 시스템</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">컴포넌트 라이브러리로 이동 중...</p>
      </div>
    </div>
  );
}
