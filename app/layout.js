"use client";
import './globals.css';
import { Header, Sidebar } from './components/layout';
import { ToastProvider } from './components/common';
import { ErrorBoundary } from './components/common';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head></head>
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
