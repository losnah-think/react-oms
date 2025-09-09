/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 최적화를 위한 standalone 출력
  output: 'standalone',
  
  // 이미지 최적화 설정
  images: {
    domains: ['images.unsplash.com'], // 외부 이미지 도메인 허용
  },
};

module.exports = nextConfig;
