import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogActions } from '../store/blog/blogActions';
import type { AppState } from '../types/app.types';
import type { SingleBlogPost } from '../types/blog.types';
import { formatDate } from '../utils/auth';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

const PostDetail: React.FC<{ post: SingleBlogPost; onBack: () => void; onEdit: () => void }> = ({ post, onBack, onEdit }) => {
  const [commentContent, setCommentContent] = useState('');
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const { accessToken, userId } = useSelector((state: AppState) => state.auth);
  const { isCommentAdding, isCommentDeleting } = useSelector((state: AppState) => state.blog);
  const dispatch = useDispatch();

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accessToken || !commentContent.trim()) return;
    await dispatch(blogActions.addComment({ blogId: post.id, content: commentContent.trim() }, accessToken) as any);

    setCommentContent('');
  };

  const handleDelete = async (commentId: string, e: React.MouseEvent) => {
    if (!accessToken) {
      return;
    }
    setDeletingCommentId(commentId);

    e.stopPropagation();

    if (window.confirm('Are you sure you want to delete this comment?')) {
      await dispatch(blogActions.deleteComment(commentId, accessToken) as any);
    }

    setDeletingCommentId(null);
  };

  return (
    <div className='post-detail'>
      <div className='post-detail-header'>
        <button onClick={onBack} className='btn btn-secondary'>
          ← Back to Posts
        </button>
        {userId === post.author._id && (
          <button onClick={onEdit} className='btn btn-primary'>
            Edit Post
          </button>
        )}
      </div>

      <article className='post-content'>
        <h1>{post.title}</h1>
        <div className='post-meta'>
          By {post.author.fullName} • {new Date(post.createdAt).toLocaleDateString()}
          {post.updatedAt !== post.createdAt && <span> • Updated {new Date(post.updatedAt).toLocaleDateString()}</span>}
        </div>
        <div className='post-body prose max-w-none'>
          {/* {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))} */}

          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown>
        </div>
      </article>

      <section className='comments-section'>
        <h3>Comments ({post.comments.length})</h3>

        {accessToken ? (
          <form onSubmit={handleAddComment} className='comment-form'>
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder='Write your comment...'
              rows={3}
              required
            />
            <button type='submit' className='btn btn-primary'>
              {isCommentAdding ? 'Adding...' : 'Add Comment'}
            </button>
          </form>
        ) : (
          <p style={{ marginBottom: '1rem' }}>Login to comment</p>
        )}

        <div className='comments-list'>
          {post.comments.map((comment) => (
            <div key={comment.id} className='comment'>
              <div className='comment-header'>
                <strong>{comment.author.fullName}</strong>
                <span className='comment-date'>{formatDate(comment.createdAt)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <p>{comment.content}</p>
                {userId === comment.author.id && (
                  <button onClick={(e) => handleDelete(comment._id, e)} className='btn btn-danger btn-small'>
                    {isCommentDeleting && deletingCommentId === comment._id ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostDetail;
