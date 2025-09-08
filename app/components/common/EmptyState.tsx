"use client";
import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = ""
}) => {
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="max-w-md mx-auto">
        {icon && (
          <div className="flex justify-center mb-4 text-6xl text-gray-300">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-500 mb-6">
            {description}
          </p>
        )}
        {action && (
          <div>
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export { EmptyState };
