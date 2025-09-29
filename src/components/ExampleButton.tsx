"use client";

import React from "react";

interface ExampleButtonProps {
  text: string;
  promptText: string;
  onClick: (text: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ExampleButton({
  text,
  promptText,
  onClick,
  className,
  style,
}: ExampleButtonProps) {
  const defaultStyle: React.CSSProperties = {
    height: '38px',
    paddingLeft: '20px',
    paddingRight: '20px',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#FFFFFF',
    background: 'rgba(84, 84, 84, 0.1)',
    backdropFilter: 'blur(45px)',
    borderRadius: '42px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 10,
    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <button
      className={`example-button ${className || ""}`}
      onClick={() => onClick(promptText)}
      type="button"
      style={{ 
        ...defaultStyle, 
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(84, 84, 84, 0.2)';
        e.currentTarget.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(84, 84, 84, 0.1)';
        e.currentTarget.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
      }}
    >
      {text}
    </button>
  );
}
