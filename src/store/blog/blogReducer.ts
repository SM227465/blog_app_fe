import { BLOG_ACTIONS, type BlogState } from '../../types/blog.types';

export const blogReducer = (
  state: BlogState = {
    posts: [],
    currentPost: null,
    isLoading: false,
    error: null,
    isCommentAdding: false,
    isCommentDeleting: false,
  },
  action: any
): BlogState => {
  switch (action.type) {
    case BLOG_ACTIONS.FETCH_POSTS_START:
    case BLOG_ACTIONS.FETCH_POST_DETAIL_START:
      return { ...state, isLoading: true, error: null };
    case BLOG_ACTIONS.CREATE_POST_START:
      return { ...state, isLoading: true, error: null };
    case BLOG_ACTIONS.FETCH_POSTS_SUCCESS:
      return { ...state, posts: action.payload, isLoading: false };

    case BLOG_ACTIONS.FETCH_POST_DETAIL_SUCCESS:
      return { ...state, currentPost: action.payload, isLoading: false, error: null };
    case BLOG_ACTIONS.CREATE_POST_SUCCESS:
      return { ...state, posts: [...state.posts, action.payload], isLoading: false };
    case BLOG_ACTIONS.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? { ...post, ...action.payload.updates } : post)),
        currentPost:
          state.currentPost?.id === action.payload.id ? { ...state.currentPost, ...action.payload.updates } : state.currentPost,
      };
    case BLOG_ACTIONS.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        currentPost: state.currentPost?.id === action.payload ? null : state.currentPost,
      };
    case BLOG_ACTIONS.FETCH_POSTS_FAILURE:
    case BLOG_ACTIONS.CREATE_POST_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case BLOG_ACTIONS.ADD_COMMENT_START:
      return { ...state, isCommentAdding: true };

    case BLOG_ACTIONS.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentAdding: false,
        currentPost: state.currentPost
          ? {
              ...state.currentPost,
              comments: [...state.currentPost.comments, action.payload],
            }
          : state.currentPost,
      };

    case BLOG_ACTIONS.DELETE_COMMENT_START:
      return { ...state, isCommentDeleting: true };

    case BLOG_ACTIONS.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentDeleting: false,
        currentPost: state.currentPost
          ? {
              ...state.currentPost,
              comments: state.currentPost.comments.filter((c) => c._id !== action.payload),
            }
          : state.currentPost,
      };

    default:
      return state;
  }
};
