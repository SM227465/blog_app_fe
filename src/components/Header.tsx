import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { themeActions } from '../store/theme/themeActions';
import type { AppState } from '../types/app.types';
import { AUTH_ACTIONS } from '../types/auth.types';
import { clearTokens, getUserFirstName } from '../utils/auth';
import { authActions } from '../store/auth/authActions';

const Header = () => {
  const [firstName, setFirstName] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.auth);

  const theme = useSelector((state: AppState) => state.theme);
  const navigate = useNavigate();

  const handleLogout = () => {
    setFirstName('');
    clearTokens();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    authActions.logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleTheme());
  };

  useEffect(() => {
    setFirstName(getUserFirstName() || '');
  }, []);

  return (
    <header className='header'>
      <div className='container'>
        <h1 className='logo' onClick={() => navigate('/')}>
          BlogPlatform
        </h1>
        <div className='header-actions'>
          <button onClick={handleThemeToggle} className='theme-toggle'>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user || firstName ? (
            <>
              <span>Welcome, {firstName || user?.firstName}!</span>
              <button onClick={handleLogout} className='btn btn-secondary'>
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className='btn btn-secondary'>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
