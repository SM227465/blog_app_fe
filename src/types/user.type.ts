export interface User {
  _id: string;
  id: string; // same as _id, likely added for frontend
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: 'GUEST' | 'ADMIN' | 'USER'; // add more roles as needed
  updatedAt: string;
  __v: number;
}
