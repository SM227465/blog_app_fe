import type { AuthState } from './auth.types';
import type { BlogState } from './blog.types';

export interface AppState {
  auth: AuthState;
  blog: BlogState;
  theme: 'light' | 'dark';
}
