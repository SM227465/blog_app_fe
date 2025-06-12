import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

const CreatePostPage = () => {
  const navigate = useNavigate();

  return <PostForm onSubmit={() => navigate('/')} onCancel={() => navigate('/')} />;
};

export default CreatePostPage;
