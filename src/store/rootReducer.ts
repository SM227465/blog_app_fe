import { applyMiddleware, combineReducers, createStore } from 'redux';
import { authReducer } from './auth/authReducer';
import { thunk } from 'redux-thunk';
import { blogReducer } from './blog/blogReducer';
import { themeReducer } from './theme/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  theme: themeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
