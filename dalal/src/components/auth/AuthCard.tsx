'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthCardProps {
  type: 'login' | 'register';
  onClose: () => void;
}

const AuthCard = ({ type, onClose }: AuthCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // هنا سيتم إضافة منطق تسجيل الدخول/الاشتراك
      console.log({ email, password, name });
      
      // بعد نجاح تسجيل الدخول
      if (type === 'login') {
        onClose(); // إغلاق النافذة المنبثقة
        router.push('/dashboard'); // التوجيه إلى لوحة التحكم
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {type === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <div>
            <label className="block text-right text-gray-900 text-[14px] font-medium mb-2">
              الاسم
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#f5ca58] focus:border-transparent outline-none transition-all text-[15px]"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-right text-gray-700 text-sm font-medium mb-2">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5ca58] focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-right text-gray-700 text-sm font-medium mb-2">
            كلمة المرور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f5ca58] focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#f5ca58] text-white py-3 rounded-lg hover:bg-[#e5ba48] transition-colors font-medium mt-6 text-[16px] shadow-md hover:shadow-lg"
        >
          {type === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
        </button>

        {type === 'login' ? (
          <div className="text-center mt-6 py-4 border-t">
            <p className="text-[15px] text-gray-600 mb-2">
              ليس لديك حساب؟
            </p>
            <button 
              type="button" 
              className="text-[16px] text-[#f5ca58] hover:text-[#e5ba48] font-semibold transition-colors hover:underline"
            >
              اشترك الآن
            </button>
          </div>
        ) : (
          <div className="text-center mt-6 py-4 border-t">
            <p className="text-[15px] text-gray-600 mb-2">
              لديك حساب بالفعل؟
            </p>
            <button 
              type="button" 
              className="text-[16px] text-[#f5ca58] hover:text-[#e5ba48] font-semibold transition-colors hover:underline"
            >
              تسجيل الدخول
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthCard;
