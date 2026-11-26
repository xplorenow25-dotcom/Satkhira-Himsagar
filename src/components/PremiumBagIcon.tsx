import React from 'react';

interface PremiumBagIconProps {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}

export const PremiumBagIcon: React.FC<PremiumBagIconProps> = ({
  className = 'w-5 h-5',
  filled = false,
  strokeWidth = 1.75,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Graceful arched boutique handle */}
      <path
        d="M8.75 8.5V6.75C8.75 4.82 10.2 3.25 12 3.25C13.8 3.25 15.25 4.82 15.25 6.75V8.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Architectural tapered tote body */}
      <path
        d="M5.65 8.5H18.35C18.88 8.5 19.32 8.9 19.39 9.43L20.48 18.63C20.63 19.89 19.65 21 18.38 21H5.62C4.35 21 3.37 19.89 3.52 18.63L4.61 9.43C4.68 8.9 5.12 8.5 5.65 8.5Z"
        fill={filled ? 'currentColor' : 'none'}
        fillOpacity={filled ? 0.14 : 0}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Refined top collar stitch detail */}
      <path
        d="M8.75 11.25C8.75 11.66 9.09 12 9.5 12C9.91 12 10.25 11.66 10.25 11.25M13.75 11.25C13.75 11.66 14.09 12 14.5 12C14.91 12 15.25 11.66 15.25 11.25"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};
