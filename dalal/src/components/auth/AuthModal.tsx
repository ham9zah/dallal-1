'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const auth = useAuth();
  console.log('حالة المصادقة:', auth); // للتحقق من القيم المتاحة
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // إعادة تعيين النموذج عند إغلاق النافذة
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
      });
      setErrors({});
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      console.log('محاولة تسجيل الدخول/التسجيل:', {
        mode: isLoginMode ? 'تسجيل الدخول' : 'تسجيل جديد',
        email: formData.email
      });

      let response;
      if (isLoginMode) {
        response = await authService.login({
          email: formData.email.trim(),
          password: formData.password
        });
      } else {
        response = await authService.register({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
          password_confirmation: formData.password_confirmation
        });
      }
      
      console.log('استجابة الخادم:', response);
      
      if (response?.user) {
        auth.setUser(response.user);
        console.log('تم تسجيل الدخول بنجاح. المستخدم:', response.user);
        onClose();
        router.push('/dashboard');
      } else {
        console.error('لم يتم استلام بيانات المستخدم من الخادم');
        setErrors({
          general: ['حدث خطأ في الاستجابة من الخادم']
        });
      }
    } catch (error: any) {
      console.error('خطأ في المصادقة:', error);
      console.error('تفاصيل الخطأ:', {
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setErrors({
          general: [error.response.data.message]
        });
      } else {
        setErrors({
          general: ['حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.']
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-right shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                {/* رأس النافذة مع خلفية ملونة */}
                <div className="bg-gradient-to-l from-[#f5ca58] to-[#f8d57e] px-6 py-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLoginMode ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
                  </h2>
                  <p className="text-gray-800">
                    {isLoginMode ? 'سعداء برؤيتك مرة أخرى' : 'انضم إلينا واستمتع بتجربة مميزة'}
                  </p>
                </div>
                <div className="absolute left-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-full p-1 bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                    onClick={onClose}
                  >
                    <span className="sr-only">إغلاق</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="px-6 py-6 text-right w-full">
                    

                    <div className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLoginMode && (
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                              الاسم
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58] focus:bg-white transition-colors duration-200 text-sm"
                              required
                            />
                            {errors.name && (
                              <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">{errors.name[0]}</p>
                            )}
                          </div>
                        )}

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            البريد الإلكتروني
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58] focus:bg-white transition-colors duration-200 text-sm"
                            required
                          />
                          {errors.email && (
                            <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">{errors.email[0]}</p>
                          )}
                        </div>

                        {!isLoginMode && (
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                              رقم الجوال
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58] focus:bg-white transition-colors duration-200 text-sm"
                            />
                            {errors.phone && (
                              <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">{errors.phone[0]}</p>
                            )}
                          </div>
                        )}

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            كلمة المرور
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58] focus:bg-white transition-colors duration-200 text-sm"
                            required
                          />
                          {errors.password && (
                            <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">{errors.password[0]}</p>
                          )}
                        </div>

                        {!isLoginMode && (
                          <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600">
                              تأكيد كلمة المرور
                            </label>
                            <input
                              type="password"
                              name="password_confirmation"
                              id="password_confirmation"
                              value={formData.password_confirmation}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-[#f5ca58] focus:ring-[#f5ca58] focus:bg-white transition-colors duration-200 text-sm"
                              required={!isLoginMode}
                            />
                            {errors.password_confirmation && (
                              <p className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1 rounded-md">{errors.password_confirmation[0]}</p>
                            )}
                          </div>
                        )}

                        {errors.general && (
                          <p className="text-sm text-red-600">{errors.general[0]}</p>
                        )}

                        <div className="mt-6 space-y-3">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-lg bg-gradient-to-l from-[#f5ca58] to-[#f8d57e] px-4 py-3 text-sm font-semibold text-gray-900 shadow-md hover:from-[#e5ba48] hover:to-[#e8c56e] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isLoading ? (
                              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : isLoginMode ? (
                              'تسجيل الدخول'
                            ) : (
                              'إنشاء حساب'
                            )}
                          </button>
                          <button
                            type="button"
                            className="flex w-full justify-center rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => setIsLoginMode(!isLoginMode)}
                          >
                            {isLoginMode ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
