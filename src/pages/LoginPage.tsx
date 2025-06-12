import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <LoginForm />

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don&apos;t have an account?{' '}
        <button type='button' className='link-button' onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
