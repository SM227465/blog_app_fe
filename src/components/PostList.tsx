import { useDispatch, useSelector } from 'react-redux';
import type { BlogPost } from '../types/blog.types';
import type { AppState } from '../types/app.types';
import { useEffect } from 'react';
import { blogActions } from '../store/blog/blogActions';

const PostList: React.FC<{ onSelectPost: (post: BlogPost) => void; onCreatePost: () => void }> = ({
  onSelectPost,
  onCreatePost,
}) => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state: AppState) => state.blog);
  const { userId, accessToken } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    dispatch(blogActions.fetchPosts() as any);
  }, []);

  const handleDelete = async (postId: string, e: React.MouseEvent) => {
    if (!accessToken) {
      return;
    }

    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(blogActions.deletePost(postId, accessToken) as any);
    }
  };

  if (isLoading) {
    return <div className='loading'>Loading posts...</div>;
  }

  return (
    <div className='post-list-container'>
      <div className='post-list-header'>
        <h2>Blog Posts</h2>
        <button onClick={onCreatePost} className='btn btn-primary'>
          Create New Post
        </button>
      </div>

      <div className='post-list'>
        {posts.length === 0 ? (
          <div className='empty-state'>
            <p>No posts yet. Create your first post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className='post-card' onClick={() => onSelectPost(post)}>
              <h3>{post.title}</h3>
              <p className='post-meta'>
                By {post.author.fullName} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className='post-excerpt'>{post.content.substring(0, 150)}...</p>

              {userId === post.author._id && (
                <div className='post-actions'>
                  <button onClick={(e) => handleDelete(post.id, e)} className='btn btn-danger btn-small'>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostList;
