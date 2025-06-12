import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

import { useEffect } from 'react';
import AuthGuard from '../guard/AuthGuard';
import CreatePostPage from '../pages/CreatePostPage';
import EditPostPage from '../pages/EditPostPage';
import PostDetailPage from '../pages/PostDetailPage';
import PostListPage from '../pages/PostListPage';
import SignupPage from '../pages/SignupPage';
import type { AppState } from '../types/app.types';
import { getAccessToken, getUserId } from '../utils/auth';

const AppRoutes = () => {
  const { user } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken();
    const userId = getUserId();

    if (token) {
      dispatch({ type: 'SET_TOKEN_FROM_COOKIE', payload: { token, userId } });
    }
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/' element={<PostListPage />} />
      <Route path='/posts/:postId' element={<PostDetailPage />} />
      <Route
        path='/create'
        element={
          <AuthGuard>
            <CreatePostPage />
          </AuthGuard>
        }
      />
      <Route
        path='/edit/:postId'
        element={
          <AuthGuard>
            <EditPostPage />
          </AuthGuard>
        }
      />
      <Route path='*' element={<Navigate to={user ? '/' : '/login'} />} />
    </Routes>
  );
};

export default AppRoutes;
