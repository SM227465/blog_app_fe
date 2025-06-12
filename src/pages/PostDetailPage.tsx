import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostDetail from '../components/PostDetail';
import { blogActions } from '../store/blog/blogActions';
import type { AppState } from '../types/app.types';
import { useEffect } from 'react';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPost } = useSelector((state: AppState) => state.blog);

  useEffect(() => {
    if (postId) dispatch(blogActions.fetchPostById(postId) as any);

    return () => {
      dispatch(blogActions.clearCurrentPost());
    };
  }, [dispatch, postId]);

  if (!currentPost || currentPost.id !== postId) {
    // optional: dispatch(fetchPostById(postId));
    return <p>Loading post...</p>;
  }

  return <PostDetail post={currentPost} onBack={() => navigate('/')} onEdit={() => navigate(`/edit/${currentPost.id}`)} />;
};

export default PostDetailPage;
