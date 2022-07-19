import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/user/userSlice';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.email || !formState.password) return;
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      console.log(user);
      dispatch(
        login({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        })
      );
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (e) => {
    if (!formState.email || !formState.name || !formState.password) return;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: formState.name,
        photoURL: formState.image,
      });
      dispatch(
        login({
          name: formState.name,
          email: formState.email,
          uid: user.uid,
          image: formState.image,
        })
      );
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/LinkedIn_Logo_2013.svg/1024px-LinkedIn_Logo_2013.svg.png"
        alt="logo"
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name (required if registering)"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Profile picture (optional)"
          name="image"
          value={formState.image}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Not a member?{' '}
        <span className="input__register" onClick={register}>
          Register now
        </span>
      </p>
    </div>
  );
};

export default Login;
