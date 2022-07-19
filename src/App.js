import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/user/userSlice';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            image: user.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
