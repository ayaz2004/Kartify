import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'primary', text = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'border-primary-500',
    white: 'border-white',
    gray: 'border-gray-500',
    green: 'border-green-500',
    blue: 'border-blue-500'
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <div className="relative">
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-2 border-gray-200`}></div>
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent absolute top-0 left-0`}></div>
      </div>
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
