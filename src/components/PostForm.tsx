import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogActions } from '../store/blog/blogActions';
import type { AppState } from '../types/app.types';
import type { BlogPost } from '../types/blog.types';

const PostForm: React.FC<{ post?: BlogPost; onSubmit: () => void; onCancel: () => void }> = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state: AppState) => state.auth);
  const { isLoading } = useSelector((state: AppState) => state.blog);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken) return;

    if (post) {
      await dispatch(blogActions.updatePost(post.id, { title, content }, accessToken) as any);
    } else {
      await dispatch(blogActions.createPost({ title, content }, accessToken) as any);
    }

    onSubmit();
  };

  return (
    <div className='post-form-container'>
      <form onSubmit={handleSubmit} className='post-form'>
        <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>

        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className='form-group'>
          <label htmlFor='content'>Content</label>
          <textarea id='content' value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
        </div>

        <div className='form-actions'>
          <button type='submit' disabled={isLoading} className='btn btn-primary'>
            {isLoading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </button>
          <button type='button' onClick={onCancel} className='btn btn-secondary'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
