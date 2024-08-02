import React from 'react'
import logo from '../assets/Logo.png'

function Logo() {
   
   return (
      <div>
      <img 
        src={logo}
        alt="Logo" 
        className='p-2 w-40 md:w-38 lg:20 ml- lg:ml-8' 
      />
    </div>
    
   )
}

export default Logo;
