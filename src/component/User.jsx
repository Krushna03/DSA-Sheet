import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../Appwrite/Authenticatioon';


const User = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState('')

  useEffect(() => {
    authService.getCurrentUser().then((user) => setUserData(user))
 })

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <img 
        src={userdata?.avatar || 'default-avatar.png'}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border"
      />
      <span className="hidden md:block text-lg">{userdata?.name || 'User'}</span>
    </div>
  );
};

export default User;
