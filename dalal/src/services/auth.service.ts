import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import axiosInstance from './axios.config';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('محاولة تسجيل الدخول باستخدام:', credentials);
      
      // إضافة التوكن CSRF إذا كان موجوداً
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (csrfToken) {
        axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      }
      
      // محاولة تسجيل الدخول
      const response = await axiosInstance.post('/login', credentials);
      console.log('استجابة تسجيل الدخول:', response.data);
      
      if (response.data.token) {
        // تخزين التوكن ومعلومات المستخدم
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // تحديث الهيدر للطلبات اللاحقة
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        console.log('تم تخزين بيانات المستخدم:', response.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error.response?.data || error);
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post('/register', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('AuthService - Register Error:', error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    console.log('AuthService - Checking role:', role);
    console.log('AuthService - User:', user);
    console.log('AuthService - User roles:', user?.roles);
    return user?.roles?.includes(role) || false;
  },

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
};
