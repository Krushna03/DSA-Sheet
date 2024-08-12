import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { FaBars } from 'react-icons/fa';
import { isAction } from '@reduxjs/toolkit';


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
  ];

  return (
    <header className="py-5 shadow border-b-2">
      <nav className="flex items-center justify-between px-2 h-16">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="flex sm:hidden">
          {authStatus && (
            <div className='mr-1'>
              <LogoutBtn />
            </div>
          )}
          <button
            className="text-2xl mr-5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>

        <ul className="hidden md:flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink to={item.slug}
                  className={({isActive}) => 
                    `${isActive ? 'text-blue-900' : 'text-zinc-950'} *:
                     inline-block text-lg font-medium px-7 py-5 duration-200 hover:bg-gray-200 rounded-full`}
                >
                  {item.name}
                </NavLink>
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

      {menuOpen && (
        <div className="lg:hidden md:hidden">
          <ul className="flex flex-col items-center p-4 border-t-4 border-b-0 mt-3">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full text-center">
                  <NavLink to={item.slug}
                    onClick={() => setMenuOpen(false)}
                    className={({isActive}) => 
                      `${isActive ? 'text-blue-600' : 'text-zinc-950'} block w-full font-bold text-xl px-7 py-4 duration-200 hover:bg-gray-200 rounded-full`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
