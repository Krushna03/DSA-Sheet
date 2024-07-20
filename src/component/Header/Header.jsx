import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../Logo'
// import User from '../User'
import LogoutBtn from './LogoutBtn'


function Header() {
   const authStatus = useSelector((state) => state.auth.status)
   const navigate = useNavigate()
   

  const navItems = [
   {
      name: 'Home',
      slug: '/',
      active: !authStatus
   },
   {
      name: 'Login',
      slug: '/login',
      active: !authStatus
   },
   {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
   },
   {
      name: 'My Sheet',
      slug: '/',
      active: authStatus
   },
   {
      name: 'Free Sheet',
      slug: '/FreeSheet',
      active: authStatus
   },
  ]


return (
<header className="py-5 shadow border-b-2 ">
   <nav className="flex items-center justify-between px-2 h-16">
      
      <div>
         <Link to="/">
            <Logo />
         </Link>
      </div>

      <ul className="hidden md:flex ml-auto">
         {navItems.map((item) => 
            item.active ? (
            <li key={item.name}>
               <button 
                 onClick={() => navigate(item.slug)}
                 className='inline-block text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950'
               >
                {item.name}
               </button>
            </li> 
            ) : null   
         )}

         {authStatus && (
            <li>
               <LogoutBtn />
            </li>
         )}
          
      </ul>
   </nav> 
</header>
)
}

export default Header
