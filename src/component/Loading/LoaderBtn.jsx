import React from 'react';
import classNames from 'classnames';

const LoaderButton = ({ color = 'white' }) => {
  const loaderClasses = classNames(
    'w-[22px] h-[22px] rounded-full inline-block box-border',
    {
      'border-t-[3px] border-r-[3px]': true,
      'border-t-white': color === 'white',
      'border-t-black': color === 'black',
    }
  );

  const rotationKeyframes = `
    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div>
      <style>{rotationKeyframes}</style>
      <span className={loaderClasses} style={{ borderTopColor: color, borderRightColor: 'transparent', animation: 'rotation 1s linear infinite' }}></span>
    </div>
  );
};

export default LoaderButton;
