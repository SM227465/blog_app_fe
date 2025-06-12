import { AUTH_ACTIONS, type AuthState } from '../../types/auth.types';

export const authReducer = (
  state: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoading: false,
    error: null,
    userId: null,
  },
  action: any
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.SIGNUP_START:
      return { ...state, isLoading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.tokens.access.token,
        refreshToken: action.payload.tokens.access.refresh,
        isLoading: false,
        error: null,
        userId: action.payload.user._id,
      };
    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.tokens.access.token,
        refreshToken: action.payload.tokens.access.refresh,
        isLoading: false,
        error: null,
        userId: action.payload.user._id,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.SIGNUP_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case AUTH_ACTIONS.SET_TOKEN_FROM_COOKIE:
      return {
        ...state,
        accessToken: action.payload.token,
        userId: action.payload.userId,
      };

    case AUTH_ACTIONS.LOGOUT:
      return { user: null, accessToken: null, refreshToken: null, isLoading: false, error: null, userId: null };
    default:
      return state;
  }
};
