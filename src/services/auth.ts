import { User } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const SESSION_USER_KEY = 'mening_huquqim_user';
const SESSION_TOKEN_KEY = 'mening_huquqim_token';

export const AuthService = {
  async getCurrentUser(): Promise<User | null> {
    await delay(300);
    const userStr = sessionStorage.getItem(SESSION_USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  },

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(1000);
    if (!email.includes('@')) {
      throw new Error('Noto‘g‘ri elektron pochta manzili.');
    }
    if (password.length < 6) {
      throw new Error('Parol kamida 6 ta belgidan iborat bo‘lishi kerak.');
    }

    const mockUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email: email,
      fullName: email.split('@')[0].toUpperCase() + ' BEK',
      phoneNumber: '+998 (90) 123-45-67',
      createdAt: new Date().toISOString(),
      verified: true
    };

    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(mockUser));
    sessionStorage.setItem(SESSION_TOKEN_KEY, 'mock-jwt-token-xyz');

    return { user: mockUser, token: 'mock-jwt-token-xyz' };
  },

  async register(fullName: string, email: string, password: string, phone?: string): Promise<User> {
    await delay(1200);
    if (fullName.trim().length < 3) {
      throw new Error('To‘liq ism-sharifingizni kiriting.');
    }
    if (!email.includes('@')) {
      throw new Error('Yaroqli elektron pochta manzilini kiriting.');
    }
    if (password.length < 6) {
      throw new Error('Parol kamida 6 ta belgidan iborat bo‘lishi kerak.');
    }

    const mockUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email: email,
      fullName: fullName,
      phoneNumber: phone || '',
      createdAt: new Date().toISOString(),
      verified: false
    };

    sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(mockUser));
    return mockUser;
  },

  async verifyEmail(code: string): Promise<boolean> {
    await delay(800);
    if (code === '123456' || code.length === 6) {
      const userStr = sessionStorage.getItem(SESSION_USER_KEY);
      if (userStr) {
        const user = JSON.parse(userStr) as User;
        user.verified = true;
        sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
      }
      return true;
    }
    throw new Error('Tasdiqlash kodi noto‘g‘ri. Qayta urinib ko‘ring.');
  },

  async forgotPassword(email: string): Promise<void> {
    await delay(800);
    if (!email.includes('@')) {
      throw new Error('Kiritilgan pochta manzili mavjud emas.');
    }
  },

  async resetPassword(newPassword: string): Promise<void> {
    await delay(1000);
    if (newPassword.length < 6) {
      throw new Error('Parol juda qisqa.');
    }
  },

  async logout(): Promise<void> {
    await delay(300);
    sessionStorage.removeItem(SESSION_USER_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }
};
