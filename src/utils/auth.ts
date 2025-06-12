import Cookies from 'js-cookie';
import type { User } from '../types/user.type';

export const setTokens = (
  access: { token: string; expiresIn: number },
  refresh: { token: string; expiresIn: number },
  user: User
) => {
  const accessExpiry = new Date(Date.now() + access.expiresIn);
  const refreshExpiry = new Date(Date.now() + refresh.expiresIn);

  Cookies.set('accessToken', access.token, { expires: accessExpiry });
  Cookies.set('refreshToken', refresh.token, { expires: refreshExpiry });
  Cookies.set('firstName', user.firstName, { expires: accessExpiry });
  Cookies.set('userId', user._id, { expires: accessExpiry });
};

export const getAccessToken = (): string | undefined => Cookies.get('accessToken');
export const getRefreshToken = (): string | undefined => Cookies.get('refreshToken');
export const getUserFirstName = (): string | undefined => Cookies.get('firstName');
export const getUserId = (): string | undefined => Cookies.get('userId');

export const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  Cookies.remove('firstName');
  Cookies.remove('userId');
};

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHour = (hours % 12 || 12).toString().padStart(2, '0');

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${formattedHour}:${minutes} ${ampm}, ${day}/${month}/${year}`;
};
