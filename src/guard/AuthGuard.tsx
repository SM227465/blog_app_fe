import { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
};

export default AuthGuard;
