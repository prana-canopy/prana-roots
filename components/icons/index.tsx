import React from 'react';

export const ChevronLeftIcon = ({ className = "" }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M15 19L8 12L15 5" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronRightIcon = ({ className = "" }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M9 5L16 12L9 19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const DotIcon = ({ className = "", active = false }) => (
  <svg 
    className={className}
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="6" 
      cy="6" 
      r="5" 
      stroke="currentColor" 
      strokeWidth="1.5"
      fill={active ? "currentColor" : "none"}
    />
  </svg>
);

export const ScrollIcon = ({ className = "" }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect 
      x="5" 
      y="4" 
      width="14" 
      height="16" 
      rx="7" 
      stroke="currentColor" 
      strokeWidth="1.5"
    />
    <circle 
      cx="12" 
      cy="9" 
      r="2" 
      fill="currentColor"
      className="animate-bounce"
    />
  </svg>
);
