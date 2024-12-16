export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'user';
  approved: boolean;
  created_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInData {
  email: string;
  password: string;
}