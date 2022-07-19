import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <div className="sidebar__hash">#</div>
      <p>{topic}</p>
    </div>
  );

  const { user } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=582&q=80"
          alt=""
        />
        <Avatar src={user?.image} className="sidebar__avatar">
          {user?.name[0]}
        </Avatar>
        <h2>{user?.name}</h2>
        <h4>{user?.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who view you</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">2,449</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('softwareengineering')}
        {recentItem('design')}
        {recentItem('developer')}
      </div>
    </div>
  );
};

export default Sidebar;
