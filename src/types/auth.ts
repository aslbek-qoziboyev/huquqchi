export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  createdAt: string;
  verified: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
