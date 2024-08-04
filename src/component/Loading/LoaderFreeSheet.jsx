import React from 'react';

const LoaderFreeSheet = () => {
  const loaderStyle = {
    width: '40px',
    height: '40px',
    border: '3px solid #000', // Set the border color to black for visibility
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: 'rotation 1s linear infinite',
  };

  return (
    <div style={loaderStyle}>
      <style>
        {`
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoaderFreeSheet;
