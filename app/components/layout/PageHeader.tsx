"use client";
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/app/components/ui/Card';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  action,
  breadcrumb,
  className
}) => {
  return (
    <div className={cn("bg-white border-b border-gray-200 px-4 py-6 sm:px-6", className)}>
      <div className="max-w-7xl mx-auto">
        {breadcrumb && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="mr-2 text-gray-400">/</span>
                  )}
                  {item.href ? (
                    <a href={item.href} className="text-blue-600 hover:text-blue-800">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-500">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {action && (
            <div className="ml-4 flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { PageHeader };
