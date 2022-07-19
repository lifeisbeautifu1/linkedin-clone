import React from 'react';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';

const HeaderOption = ({ Icon, title, avatar, onClick }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="headerOption" onClick={onClick}>
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && (
        <Avatar src={user.image} className="headerOption__icon">
          {user?.name[0]}
        </Avatar>
      )}
      <h5 className="headerOption__title">{title}</h5>
    </div>
  );
};

export default HeaderOption;
