import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../Appwrite/Authenticatioon';
import { logout } from '../../store/authSlice';
import LogoutIcon from '@mui/icons-material/Logout'; // Importing the LogoutIcon from Material UI

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-flex items-center lg:text-lg px-4 py-4 lg:px-7 lg:py-5 duration-200 hover:bg-gray-200 rounded-full text-zinc-950"
      onClick={logoutHandler}
    >

      <span className="sm:hidden">
        <LogoutIcon style={{ color: 'black', fontSize: '30px' }}  />
      </span>

      <span className="hidden sm:block">Logout</span>
    </button>
  );
}

export default LogoutBtn;
