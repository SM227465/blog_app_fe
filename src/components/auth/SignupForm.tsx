import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth/authActions';
import type { AppState } from '../../types/app.types';
import { useNavigate } from 'react-router-dom';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: AppState) => state.auth);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) newErrors.firstName = 'Please provide your first name';
    else if (firstName.length < NAME_MIN_LENGTH)
      newErrors.firstName = `First name should be at least ${NAME_MIN_LENGTH} characters`;
    else if (firstName.length > NAME_MAX_LENGTH)
      newErrors.firstName = `First name should not exceed ${NAME_MAX_LENGTH} characters`;

    if (!lastName.trim()) newErrors.lastName = 'Please provide your last name';
    else if (lastName.length < NAME_MIN_LENGTH) newErrors.lastName = `Last name should be at least ${NAME_MIN_LENGTH} characters`;
    else if (lastName.length > NAME_MAX_LENGTH) newErrors.lastName = `Last name should not exceed ${NAME_MAX_LENGTH} characters`;

    if (!email.trim()) newErrors.email = 'Please provide your email address';

    if (!password.trim()) newErrors.password = 'Please provide a password';
    else if (password.length < PASSWORD_MIN_LENGTH)
      newErrors.password = `Password should be at least ${PASSWORD_MIN_LENGTH} characters`;
    else if (password.length > PASSWORD_MAX_LENGTH)
      newErrors.password = `Password should not exceed ${PASSWORD_MAX_LENGTH} characters`;
    else if (!passwordRegex.test(password))
      newErrors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';

    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(authActions.signup(formData, navigate) as any);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit} className='auth-form'>
        <h2>Sign Up</h2>

        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleInputChange} required />
          {errors.firstName && <div className='error'>{errors.firstName}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={handleInputChange} required />
          {errors.lastName && <div className='error'>{errors.lastName}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} required />
          {errors.email && <div className='error'>{errors.email}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value={formData.password} onChange={handleInputChange} required />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>

        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}
        </div>

        {error && <div className='error'>{error}</div>}

        <button type='submit' disabled={isLoading} className='btn btn-primary'>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
