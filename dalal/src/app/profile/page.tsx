'use client';

import { useEffect, useState } from 'react';
import RoleGuard from '@/components/auth/RoleGuard';
import { useAuth } from '@/providers/AuthProvider';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import Avatar from '@/components/profile/Avatar';

const DEFAULT_AVATAR = '/images/default-avatar.png';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membership: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        membership: user.membership || 'عضو عادي',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        toast.error('حجم الصورة يجب أن لا يتجاوز 2 ميجابايت');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('يجب اختيار ملف صورة صالح');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('_method', 'POST'); // للتوافق مع Laravel
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone || '');
      if (avatarFile) {
        formDataObj.append('avatar', avatarFile);
      }

      const response = await axios.post('/api/profile/update', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setUser(response.data.user);
      toast.success('تم تحديث الملف الشخصي بنجاح');
    } catch (error: any) {
      const message = error.response?.data?.message || 
                     error.response?.data?.errors?.[Object.keys(error.response?.data?.errors)[0]][0] ||
                     'حدث خطأ أثناء تحديث الملف الشخصي';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/profile/update-password', {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
        new_password_confirmation: formData.confirmPassword
      });

      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      toast.success('تم تحديث كلمة المرور بنجاح');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'حدث خطأ أثناء تحديث كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RoleGuard>
      <div className="container mx-auto px-4"> 
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">الملف الشخصي</h1>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* قائمة التنقل */}
            <div className="border-b border-gray-200 bg-gray-50">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-6 py-4 border-b-2 text-sm font-medium ${
                    activeTab === 'info'
                      ? 'border-[#f5ca58] text-[#f5ca58] bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  المعلومات الشخصية
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-6 py-4 border-b-2 text-sm font-medium ${
                    activeTab === 'security'
                      ? 'border-[#f5ca58] text-[#f5ca58] bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  إعدادات الحساب
                </button>
              </nav>
            </div>

            <div className="p-8"> 
              {activeTab === 'info' && (
                <div className="space-y-6">
                  {/* صورة الملف الشخصي */}
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="relative w-24 h-24">
                      <Avatar src={avatarPreview} size={96} />
                    </div>
                    <div>
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="avatar"
                        className="cursor-pointer inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                      >
                        تغيير الصورة
                      </label>
                      <p className="mt-2 text-sm text-gray-500">
                        يجب أن لا يتجاوز حجم الصورة 2 ميجابايت
                      </p>
                    </div>
                  </div>

                  {/* نموذج المعلومات الشخصية */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        الاسم
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        مسمى العضوية
                      </label>
                      <p className="text-gray-900">{formData.membership}</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        رقم الجوال
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-[#f5ca58] text-gray-900 rounded-md hover:bg-[#e5ba48] focus:outline-none focus:ring-2 focus:ring-[#f5ca58] focus:ring-offset-2"
                    >
                      {loading ? 'جاري التحديث...' : 'حفظ التغييرات'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="currentPassword" className="form-label">
                      كلمة المرور الحالية
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword" className="form-label">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#f5ca58] text-gray-900 rounded-md hover:bg-[#e5ba48] focus:outline-none focus:ring-2 focus:ring-[#f5ca58] focus:ring-offset-2"
                  >
                    {loading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
