import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Menu, MenuItem } from '@mui/material';
import authService from '../../Appwrite/Authenticatioon';
import LogoutBtn from './LogoutBtn';

function UserBtn() {
  const [userId, setUserId] = useState('')
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          onClick={handleMenuClick}
          className="cursor-pointer"
        />
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem> <LogoutBtn/> </MenuItem>
        </Menu>
    </>
  )
}

export default UserBtn
