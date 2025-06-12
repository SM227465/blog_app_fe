import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import type { AppState } from '../types/app.types';

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentPost } = useSelector((state: AppState) => state.blog);

  if (!currentPost || currentPost.id !== postId) {
    return <p>Loading post for editing...</p>;
  }

  return (
    <PostForm
      post={currentPost}
      onSubmit={() => navigate('/')}
      onCancel={() => navigate(`/posts/${currentPost.id}`)}
    />
  );
};

export default EditPostPage;
