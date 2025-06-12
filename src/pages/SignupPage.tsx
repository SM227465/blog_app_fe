// pages/SignupPage.tsx
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <SignupForm />

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account?{' '}
        <button type='button' className='link-button' onClick={() => navigate('/login')}>
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupPage;
