import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';
import axiosInstance from './axios.config';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('محاولة تسجيل الدخول باستخدام:', credentials);
      
      // محاولة تسجيل الدخول
      const response = await axiosInstance.post('/login', credentials);
      console.log('استجابة تسجيل الدخول:', response.data);
      
      // التحقق من الاستجابة
      if (!response.data) {
        console.error('لم يتم استلام أي بيانات من الخادم');
        throw new Error('خطأ في الاتصال بالخادم');
      }

      // التحقق من حالة الاستجابة
      if (response.data.status === 'error') {
        console.error('خطأ من الخادم:', response.data.message);
        throw new Error(response.data.message);
      }

      // التحقق من وجود البيانات
      const { token, user } = response.data;
      console.log('بيانات الاستجابة:', response.data);
      console.log('هيدرز الاستجابة:', response.headers);

      // التحقق من وجود التوكن
      let authToken = token;
      const authHeader = response.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        authToken = authHeader.substring(7);
        console.log('تم استخراج التوكن من الهيدر:', authToken);
      }

      if (!authToken) {
        console.error('لم يتم استلام توكن المصادقة');
        throw new Error('لم يتم استلام توكن المصادقة');
      }

      if (!user) {
        console.error('لم يتم استلام بيانات المستخدم');
        throw new Error('لم يتم استلام بيانات المستخدم');
      }
      
      // تخزين التوكن ومعلومات المستخدم
      try {
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(user));
      
        // تحديث الهيدر للطلبات اللاحقة
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      
        console.log('تم تخزين بيانات المستخدم بنجاح');
      } catch (storageError) {
        console.error('خطأ في تخزين البيانات:', storageError);
      }
      
      return {
        ...response.data,
        token: authToken
      };
    } catch (error: any) {
      console.error('خطأ في تسجيل الدخول:', error);
      console.error('تفاصيل الخطأ:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          throw new Error(firstError[0]);
        }
      }
      
      throw error;
    }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      console.log('إرسال بيانات التسجيل:', credentials);
      
      // إرسال طلب التسجيل
      const response = await axiosInstance.post('/register', credentials);
      console.log('استجابة التسجيل:', response.data);
      
      // التحقق من الاستجابة
      if (!response.data) {
        console.error('لم يتم استلام أي بيانات من الخادم');
        throw new Error('خطأ في الاتصال بالخادم');
      }

      // التحقق من حالة الاستجابة
      if (response.data.status === 'error') {
        console.error('خطأ من الخادم:', response.data.message);
        throw new Error(response.data.message);
      }

      // التحقق من وجود التوكن
      if (!response.data.token) {
        console.error('لم يتم استلام توكن المصادقة');
        throw new Error('لم يتم استلام توكن المصادقة');
      }

      // التحقق من وجود بيانات المستخدم
      if (!response.data.user) {
        console.error('لم يتم استلام بيانات المستخدم');
        throw new Error('لم يتم استلام بيانات المستخدم');
      }
      
      // تخزين التوكن ومعلومات المستخدم
      try {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // تحديث الهيدر للطلبات اللاحقة
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        console.log('تم تخزين بيانات المستخدم بنجاح');
      } catch (storageError) {
        console.error('خطأ في تخزين البيانات:', storageError);
      }
      
      return response.data;
    } catch (error: any) {
      console.error('خطأ في التسجيل:', error);
      console.error('تفاصيل الخطأ:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          throw new Error(firstError[0]);
        }
      }
      
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axiosInstance.defaults.headers.common['Authorization'];
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
    return user?.roles?.includes(role) || false;
  },

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
};
