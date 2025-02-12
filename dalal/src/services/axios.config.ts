import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

console.log('API URL:', API_URL); // للتأكد من العنوان الصحيح

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
});

// اعتراض الطلبات
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// اعتراض الاستجابات
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 422) {
      // استخراج رسائل الخطأ من استجابة Laravel
      const validationErrors = error.response.data.errors;
      if (validationErrors) {
        const firstErrorKey = Object.keys(validationErrors)[0];
        const firstError = validationErrors[firstErrorKey];
        if (Array.isArray(firstError)) {
          throw new Error(translateError(firstError[0]));
        }
      }
      // إذا كان هناك رسالة خطأ عامة
      if (error.response.data.message) {
        throw new Error(translateError(error.response.data.message));
      }
      throw new Error('خطأ في التحقق من البيانات');
    }

    if (error.response?.status === 401) {
      throw new Error('غير مصرح لك بالوصول');
    }

    if (error.response?.status === 404) {
      throw new Error('الصفحة غير موجودة');
    }

    throw error;
  }
);

export default axiosInstance;
