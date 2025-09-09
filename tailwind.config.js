module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Pretendard 폰트 패밀리
      fontFamily: {
        'sans': [
          'Pretendard Variable', 
          'Pretendard', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'system-ui', 
          'Roboto', 
          'Helvetica Neue', 
          'Segoe UI', 
          'Apple SD Gothic Neo', 
          'Noto Sans KR', 
          'Malgun Gothic', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'sans-serif'
        ],
      },
      // 최소 폰트 크기 14px
      fontSize: {
        'xs': ['14px', '1.4'],  // 최소 크기를 14px로 설정
        'sm': ['14px', '1.5'],
        'base': ['16px', '1.6'],
        'lg': ['18px', '1.7'],
        'xl': ['20px', '1.8'],
        '2xl': ['24px', '1.9'],
        '3xl': ['30px', '2.0'],
        '4xl': ['36px', '2.1'],
        '5xl': ['48px', '2.2'],
      },
      // 24그리드 시스템 추가
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      }
    },
  },
  plugins: [],
};
