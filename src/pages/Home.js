import { Sidebar, Feed, Widgets } from '../components';

const Home = () => {
  return (
    <div className="app__body">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
};

export default Home;
