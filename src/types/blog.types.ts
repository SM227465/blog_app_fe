export interface BlogState {
  posts: BlogPost[];
  currentPost: SingleBlogPost | null;
  isLoading: boolean;
  isCommentDeleting: boolean;
  isCommentAdding: boolean;
  error: string | null;
}

export const BLOG_ACTIONS = {
  FETCH_POSTS_START: 'FETCH_POSTS_START',
  FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',
  CREATE_POST_START: 'CREATE_POST_START',
  CREATE_POST_SUCCESS: 'CREATE_POST_SUCCESS',
  CREATE_POST_FAILURE: 'CREATE_POST_FAILURE',
  UPDATE_POST_SUCCESS: 'UPDATE_POST_SUCCESS',
  DELETE_POST_SUCCESS: 'DELETE_POST_SUCCESS',
  FETCH_COMMENTS_SUCCESS: 'FETCH_COMMENTS_SUCCESS',
  ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
  FETCH_POST_DETAIL_START: 'FETCH_POST_DETAIL_START',
  FETCH_POST_DETAIL_SUCCESS: 'FETCH_POST_DETAIL_SUCCESS',
  FETCH_POST_DETAIL_FAILURE: 'FETCH_POST_DETAIL_FAILURE',
  CLEAR_CURRENT_POST: 'CLEAR_CURRENT_POST',
  ADD_COMMENT_START: 'ADD_COMMENT_START',
  DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS',
  DELETE_COMMENT_START: 'DELETE_COMMENT_START',
} as const;

export interface PaginatedPostResponse {
  success: boolean;
  results: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: BlogPost[];
}

export interface BlogPost {
  _id: string;
  id: string; // duplicate of _id (likely for frontend convenience)
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  status: 'DRAFT' | 'PUBLISHED'; // update based on actual values
  readTime: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  likes: string[]; // user IDs or objects depending on backend
  author: {
    _id: string;
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
}

export interface Author {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface Comment {
  _id: string;
  id: string;
  content: string;
  author: Author;
  blog: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface SingleBlogPost {
  _id: string;
  id: string;
  title: string;
  content: string;
  author: Author;
  status: 'DRAFT' | 'PUBLISHED';
  tags: string[];
  readTime: number;
  views: number;
  likes: string[]; // assuming it's an array of userIds
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  excerpt: string;
  comments: Comment[];
}
