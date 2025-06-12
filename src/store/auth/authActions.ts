import { BASE_URL } from '../../constants';
import { AUTH_ACTIONS } from '../../types/auth.types';
import { setTokens } from '../../utils/auth';

export const authActions = {
  login: (credentials: { email: string; password: string }) => async (dispatch: any) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/login/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      setTokens(data.tokens.access, data.tokens.refresh, data.user);

      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: (error as Error).message });
    }
  },

  signup:
    (
      userData: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string },
      navigate: (path: string) => void
    ) =>
    async (dispatch: any) => {
      dispatch({ type: AUTH_ACTIONS.SIGNUP_START });

      try {
        const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Login failed');
        }
        const data = await res.json();

        setTokens(data.tokens.access, data.tokens.refresh, data.user);

        dispatch({ type: AUTH_ACTIONS.SIGNUP_SUCCESS, payload: data });
        navigate('/');
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.message || error.message;
        dispatch({
          type: AUTH_ACTIONS.SIGNUP_FAILURE,
          payload: errorMessage,
        });
      }
    },

  logout: () => ({ type: AUTH_ACTIONS.LOGOUT }),

  setTokenFromCookie: (token: object) => ({
    type: 'SET_TOKEN_FROM_COOKIE',
    payload: token,
  }),
};
