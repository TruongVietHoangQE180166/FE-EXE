import { User } from '../types/auth';

const mockUsers: User[] = [
  { email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { email: 'user@gmail.com', password: 'user123', role: 'user' },
];

let currentUser: User | null = null;

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  if (user) {
    currentUser = user;
    return user;
  }
  return null; 
};

export const logout = () => {
  currentUser = null;
};

export const getCurrentUser = (): User | null => currentUser;

export const register = (email: string, password: string): boolean => {
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    return false; 
  }
  const newUser: User = { email, password, role: 'user' };
  mockUsers.push(newUser);
  return true; 
};