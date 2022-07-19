import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import AccountBox from '@material-ui/icons/AccountBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import BussinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';

import HeaderOption from './HeaderOption';

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    signOut(auth).then(() => console.log('user logout'));
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="logo"
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BussinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        {user ? (
          <HeaderOption
            onClick={handleLogout}
            avatar={true}
            title={user.name}
          />
        ) : (
          <HeaderOption
            onClick={handleLogout}
            Icon={AccountBox}
            title="Sign In"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
