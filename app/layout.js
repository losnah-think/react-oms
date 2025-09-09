"use client";
import './globals.css';
import { Header, Sidebar } from './components/layout';
import { ToastProvider } from './components/common';
import { ErrorBoundary } from './components/common';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  // 전역 alert 차단
  useEffect(() => {
    const suppressAlerts = () => {
      const originalAlert = window.alert;
      const originalConfirm = window.confirm;
      const originalPrompt = window.prompt;
      
      window.alert = function(message) {
        console.log('🚫 Alert suppressed:', message);
        // 와이어프레임 관련 알럿이면 무시
        if (typeof message === 'string' && message.includes('wireframe')) {
          return;
        }
        // 다른 중요한 알럿은 콘솔에만 표시
        console.warn('Important alert:', message);
      };
      
      window.confirm = function(message) {
        console.log('🚫 Confirm suppressed:', message);
        return true;
      };
      
      window.prompt = function(message, defaultText) {
        console.log('🚫 Prompt suppressed:', message);
        return defaultText || '';
      };
      
      // 개발 모드에서 React 에러도 차단
      const originalError = console.error;
      console.error = function(...args) {
        const message = args.join(' ');
        if (message.includes('Warning:') || message.includes('React')) {
          // React 경고는 콘솔에만 표시하고 알럿 안뜨게
          originalError.apply(console, args);
          return;
        }
        originalError.apply(console, args);
      };
    };
    
    suppressAlerts();
  }, []);
  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // 최우선으로 alert 완전 차단
              (function() {
                const noop = function() { return true; };
                const logOnly = function(msg) { 
                  console.log('🚫 Blocked alert:', msg); 
                  return true; 
                };
                
                if (typeof window !== 'undefined') {
                  window.alert = logOnly;
                  window.confirm = noop;
                  window.prompt = function() { return ''; };
                  
                  // 즉시 적용
                  Object.defineProperty(window, 'alert', {
                    value: logOnly,
                    writable: false,
                    configurable: false
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-gray-50">
        <ErrorBoundary>
          <ToastProvider>
            <div className="h-screen flex flex-col">
              <Header />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-gray-50">
                  <div className="h-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
