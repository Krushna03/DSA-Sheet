import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user); // Adjust this according to your auth state structure

  const handleUserClick = () => {
    navigate('/user-details'); // Navigate to the user details page
  };

  return (
    <div className="flex items-center space-x-3 cursor-pointer" onClick={handleUserClick}>
      <img 
        src={user?.avatar || 'default-avatar.png'} // Display the user's avatar or a default one
        alt="User Avatar"
        className="w-10 h-10 rounded-full border"
      />
      <span className="hidden md:block text-lg">{user?.name || 'User'}</span>
    </div>
  );
};

export default User;
