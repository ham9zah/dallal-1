import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8003/api';

console.log('عنوان API:', API_URL);

console.log('API URL:', API_URL);
console.log('Environment:', process.env.NODE_ENV);
console.log('All Environment Variables:', process.env);

// ترجمة رسائل الخطأ
const errorMessages: { [key: string]: string } = {
  'The email has already been taken.': 'البريد الإلكتروني مستخدم مسبقاً',
  'The password must be at least 8 characters.': 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
  'The provided credentials are incorrect.': 'بيانات الاعتماد المقدمة غير صحيحة',
  'Unauthorized': 'غير مصرح لك بالوصول',
  'Not Found': 'الصفحة غير موجودة',
};

const translateError = (message: string): string => {
  return errorMessages[message] || message;
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // للسماح بإرسال الكوكيز
});

// اعتراض الطلبات
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('إرسال طلب إلى:', config.url);
    console.log('طريقة الطلب:', config.method);
    console.log('بيانات الطلب:', config.data);
    console.log('هيدرز الطلب:', config.headers);

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('تم إضافة توكن المصادقة:', token);
    }

    return config;
  },
  (error) => {
    console.error('خطأ في إرسال الطلب:', error);
    return Promise.reject(error);
  }
);

// اعتراض الاستجابات
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('استجابة ناجحة من:', response.config.url);
    console.log('بيانات الاستجابة:', response.data);

    // التحقق من وجود التوكن في الهيدر
    const authHeader = response.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('تم استلام توكن في الهيدر:', token);
      response.data.token = token;
    }

    return response;
  },
  (error) => {
    console.error('خطأ في الاستجابة:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    if (error.response?.status === 422) {
      console.error('خطأ في التحقق من البيانات:', error.response.data);
      
      // استخراج رسائل الخطأ من استجابة Laravel
      const validationErrors = error.response.data.errors;
      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          throw new Error(firstError[0]);
        }
      }
      
      // إذا كان هناك رسالة خطأ عامة
      if (error.response.data.message) {
        throw new Error(translateError(error.response.data.message));
      }
      
      throw new Error('خطأ في التحقق من البيانات');
    }

    if (error.response?.status === 401) {
      const message = error.response.data?.message || 'غير مصرح لك بالوصول';
      throw new Error(translateError(message));
    }

    if (error.response?.status === 404) {
      throw new Error('الصفحة غير موجودة');
    }

    throw error;
  }
);

export default axiosInstance;
