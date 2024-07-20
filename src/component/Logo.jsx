import React from 'react'
import logo from '../assets/Logo.png'

function Logo() {
   
   return (
      <div>
      <img 
        src={logo}
        alt="Logo" 
        className='p-0 w-32 sm:w-32 md:w-38 lg:w-40 ml-5 lg:ml-12' 
      />
    </div>
    
   )
}

export default Logo;
