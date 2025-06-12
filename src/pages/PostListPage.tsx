import { useNavigate } from 'react-router-dom';
import PostList from '../components/PostList';
import type { BlogPost } from '../types/blog.types';

const PostListPage = () => {
  const navigate = useNavigate();

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/posts/${post.id}`);
  };

  const handleCreatePost = () => {
    navigate('/create');
  };

  return <PostList onSelectPost={handleSelectPost} onCreatePost={handleCreatePost} />;
};

export default PostListPage;
