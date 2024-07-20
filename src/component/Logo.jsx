import React from 'react'
import logo from '../assets/Logo.png'

function Logo() {
   
   return (
      <div>
         <img 
            src={logo}
            alt="Logo" 
            className='p-0 w-24 sm:w-30 md:w-38 lg:w-40 ml-11' 
         />
      </div>
   )
}

export default Logo;
