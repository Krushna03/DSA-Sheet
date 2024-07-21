import React, { useState, useEffect } from 'react';
import authService from '../Appwrite/Authenticatioon';


const User = () => {
  const [userdata, setUserData] = useState('')

  // console.log(userdata);
  console.log(userdata.avatar);

  useEffect(() => {
    authService.getCurrentUser().then((user) => setUserData(user))
 }, [])

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <img 
        src={userdata?.avatar || 'default-avatar.png'}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border"
      />
      <span className="md:block text-lg">{userdata.name || 'User'}</span>
      <span className="md:block text-lg">{userdata.email || 'User'}</span>
    </div>
  );
};

export default User;
