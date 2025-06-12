import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth/authActions';
import type { AppState } from '../../types/app.types';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state: AppState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(authActions.login({ email, password }) as any);

    if (res?.['success']) {
      navigate('/')
    }
  };

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h2>Login</h2>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <div className='error'>{error}</div>}

        <button type='submit' disabled={isLoading} className='btn btn-primary'>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
