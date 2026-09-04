import { defineStore } from 'pinia';
import { AuthState } from '../types/auth';
import { AuthService } from '../services/auth';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    isVerified: (state): boolean => !!state.user?.verified,
  },
  actions: {
    async initialize() {
      this.loading = true;
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          this.user = user;
          this.token = 'mock-jwt-token-xyz';
        }
      } catch (err: any) {
        this.error = err.message || 'Xatolik yuz berdi';
      } finally {
        this.loading = false;
      }
    },
    async login(email: string, pass: string) {
      this.loading = true;
      this.error = null;
      try {
        const res = await AuthService.login(email, pass);
        this.user = res.user;
        this.token = res.token;
      } catch (err: any) {
        this.error = err.message || 'Xatolik yuz berdi';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async register(fullName: string, email: string, pass: string, phone?: string) {
      this.loading = true;
      this.error = null;
      try {
        const user = await AuthService.register(fullName, email, pass, phone);
        this.user = user;
        this.token = 'mock-jwt-token-xyz';
      } catch (err: any) {
        this.error = err.message || 'Xatolik yuz berdi';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async verifyEmail(code: string) {
      this.loading = true;
      this.error = null;
      try {
        const ok = await AuthService.verifyEmail(code);
        if (ok && this.user) {
          this.user.verified = true;
        }
        return ok;
      } catch (err: any) {
        this.error = err.message || 'Kod noto‘g‘ri';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async forgotPassword(email: string) {
      this.loading = true;
      this.error = null;
      try {
        await AuthService.forgotPassword(email);
      } catch (err: any) {
        this.error = err.message || 'Xatolik yuz berdi';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(pass: string) {
      this.loading = true;
      this.error = null;
      try {
        await AuthService.resetPassword(pass);
      } catch (err: any) {
        this.error = err.message || 'Xatolik yuz berdi';
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      try {
        await AuthService.logout();
        this.user = null;
        this.token = null;
      } finally {
        this.loading = false;
      }
    }
  }
});
