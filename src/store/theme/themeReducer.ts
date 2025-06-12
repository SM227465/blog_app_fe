import { THEME_ACTIONS } from '../../types/theme.types';

export const themeReducer = (state: 'light' | 'dark' = 'light', action: any): 'light' | 'dark' => {
  switch (action.type) {
    case THEME_ACTIONS.TOGGLE_THEME:
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};
