import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../Logo';
import LogoutBtn from './LogoutBtn';
import { FaBars } from 'react-icons/fa';


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
                <button
                  onClick={() => navigate(item.slug)}
                  className="inline-block text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950"
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

      {menuOpen && (
        <div className="lg:hidden md:hidden">
          <ul className="flex flex-col items-start p-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-lg px-7 py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* {authStatus && (
              <>
                <li className="flex justify-center px-5 duration-200 hover:bg-gray-200 rounded-full text-lg w-full">
                  <LogoutBtn />
                </li>
              </>
            )} */}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
