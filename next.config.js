/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 최적화를 위한 standalone 출력
  output: 'standalone',
  
  // 이미지 최적화 설정
  images: {
    domains: ['images.unsplash.com'], // 외부 이미지 도메인 허용
  },
  
  // 개발 모드에서 알럿 방지
  compiler: {
    removeConsole: false, // 콘솔 로그는 유지
  },
  
  // 개발 서버 설정
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      websocketPort: 3001, // 다른 포트 사용으로 충돌 방지
    },
  }),
};

module.exports = nextConfig;
