import React from 'react';

function Loader() {
  return (
    <div className='flex justify-center items-center h-96'>
      <div className="loader"></div>
      <style>
        {`
          .loader {
            width: 89px;
            height: 89px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            border: 3px solid;
            border-color: #695656 #3e1c1c transparent;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }
          .loader::after {
            content: '';  
            box-sizing: border-box;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 3px solid;
            border-color: transparent #131110 #221d1c;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            animation: rotationBack 0.5s linear infinite;
            transform-origin: center center;
          }
          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          } 
          @keyframes rotationBack {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
