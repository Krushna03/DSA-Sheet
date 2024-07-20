import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar} from '@mui/material';
import authService from '../../Appwrite/Authenticatioon';

function UserBtnSmall() {
  const [userId, setUserId] = useState('')
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${userId}`);
    handleMenuClose();
  };

  useEffect(() => {
     authService.getCurrentUser().then((user) => setUserId(user.$id))
  })


  return (
    <>
        <Avatar
          alt={user?.name || 'User'}
          src={user?.avatar || 'default-avatar.png'}
          onClick={handleProfileClick}
          className="cursor-pointer"
        />
    </>
  )
}

export default UserBtnSmall
