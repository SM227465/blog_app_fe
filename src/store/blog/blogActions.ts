import toast from 'react-hot-toast';
import { BASE_URL } from '../../constants';
import { BLOG_ACTIONS } from '../../types/blog.types';

export const blogActions = {
  fetchPosts: () => async (dispatch: any) => {
    dispatch({ type: BLOG_ACTIONS.FETCH_POSTS_START });
    try {
      const response = await fetch(`${BASE_URL}/api/v1/blogs`);
      const data = await response.json();

      if (!data.success) throw new Error('Failed to fetch posts');

      dispatch({
        type: BLOG_ACTIONS.FETCH_POSTS_SUCCESS,
        payload: data.data, // the array of posts
      });
      // dispatch({ type: BLOG_ACTIONS.FETCH_POSTS_SUCCESS, payload: posts });
    } catch (error) {
      dispatch({ type: BLOG_ACTIONS.FETCH_POSTS_FAILURE, payload: (error as Error).message });
    }
  },

  createPost: (post: { title: string; content: string }, token: string) => async (dispatch: any) => {
    dispatch({ type: BLOG_ACTIONS.CREATE_POST_START });
    try {
      const response = await fetch(`${BASE_URL}/api/v1/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create post');
      }

      dispatch({ type: BLOG_ACTIONS.CREATE_POST_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: BLOG_ACTIONS.CREATE_POST_FAILURE,
        payload: (error as Error).message,
      });
    }
  },

  updatePost: (id: string, updates: { title: string; content: string }, accessToken: string) => async (dispatch: any) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/blogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to update post');
      }

      const data = await res.json();

      dispatch({
        type: BLOG_ACTIONS.UPDATE_POST_SUCCESS,
        payload: { id, updates: data.data || updates },
      });
    } catch (error: any) {
      console.error('Update failed:', error.message);

      toast.error(error?.message);
    }
  },

  deletePost: (id: string, accessToken: string) => async (dispatch: any) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      dispatch({ type: BLOG_ACTIONS.DELETE_POST_SUCCESS, payload: id });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  },

  fetchPostById: (postId: string) => async (dispatch: any) => {
    dispatch({ type: BLOG_ACTIONS.FETCH_POST_DETAIL_START });
    try {
      const response = await fetch(`${BASE_URL}/api/v1/blogs/${postId}`);
      const data = await response.json();

      if (!data.success) throw new Error('Failed to fetch post details');

      dispatch({
        type: BLOG_ACTIONS.FETCH_POST_DETAIL_SUCCESS,
        payload: data.data, // single post object
      });
    } catch (error) {
      dispatch({
        type: BLOG_ACTIONS.FETCH_POST_DETAIL_FAILURE,
        payload: (error as Error).message,
      });
    }
  },

  clearCurrentPost: () => ({
    type: BLOG_ACTIONS.CLEAR_CURRENT_POST,
  }),

  addComment: (comment: { blogId: string; content: string }, accessToken: string) => async (dispatch: any) => {
    dispatch({ type: BLOG_ACTIONS.ADD_COMMENT_START });

    try {
      const response = await fetch(`${BASE_URL}/api/v1/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add comment');
      }

      const newComment = await response.json();

      dispatch({ type: BLOG_ACTIONS.ADD_COMMENT_SUCCESS, payload: newComment.data });
    } catch (error) {
      console.error('Add comment failed:', error);
    }
  },

  deleteComment: (commentId: string, accessToken: string) => async (dispatch: any) => {
    dispatch({ type: BLOG_ACTIONS.DELETE_COMMENT_START });

    try {
      const response = await fetch(`${BASE_URL}/api/v1/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete comment');
      }

      dispatch({ type: BLOG_ACTIONS.DELETE_COMMENT_SUCCESS, payload: commentId });
    } catch (error) {
      console.error('Delete comment failed:', error);
    }
  },
};
