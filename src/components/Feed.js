import { useState, useEffect } from 'react';
import { addDoc, onSnapshot } from 'firebase/firestore';
import { colRef } from '../firebase';
import InputOption from './InputOption';
import Post from './Post';
import CreateIcon from '@material-ui/icons/Create';
import ImageIcon from '@material-ui/icons/Image';
import { Subscriptions, EventNote, CalendarViewDay } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    addDoc(colRef, {
      message,
      description: user.email,
      name: user?.name,
      image: user?.image,
      timestamp: new Date().getTime(),
    });
    setMessage('');
  };

  useEffect(() => {
    // const initPosts = async () => {
    //   const snapshot = await getDocs(colRef);
    //   setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    onSnapshot(colRef, (snapshot) => {
      setPosts(
        snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .sort((a, b) => b.timestamp - a.timestamp)
      );
    });
    // initPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={handleSubmit}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOption">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={Subscriptions} title="Video" color="#e7a33e" />
          <InputOption Icon={EventNote} title="Event" color="#c0cbcd" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write article"
            color="#7fc15e"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, name, description, message, image }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            image={image}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
