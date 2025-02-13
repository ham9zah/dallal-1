'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CreateListing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('new');
  const [negotiable, setNegotiable] = useState(false);
  const [allowBidding, setAllowBidding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category_id', subCategory || mainCategory);
      formData.append('location', location);
      formData.append('condition', condition);
      formData.append('negotiable', negotiable ? '1' : '0');
      formData.append('allow_bidding', allowBidding ? '1' : '0');

      // إضافة الصور
      if (images.length > 0) {
        images.forEach((image, index) => {
          formData.append(`images[${index}]`, image);
        });
      }

      const response = await fetch('http://localhost:8000/api/advertisements', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'حدث خطأ أثناء إضافة الإعلان');
      }

      const data = await response.json();
      toast.success('تم إضافة الإعلان بنجاح');
      router.push(`/listings/${data.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ أثناء إضافة الإعلان');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-[200px] pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-black mb-6">إضافة إعلان جديد</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* صور الإعلان */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                صور الإعلان
              </label>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`صورة ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute top-1 left-1 bg-red-500 text-white rounded-full p-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {images.length < 8 && (
                  <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-700 font-medium">يمكنك إضافة حتى 8 صور</p>
            </div>

            {/* عنوان الإعلان */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                عنوان الإعلان
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
                required
              />
            </div>

            {/* وصف الإعلان */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                وصف الإعلان
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
                required
              />
            </div>

            {/* السعر */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                السعر
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 pl-16"
                  required
                />
                <span className="absolute left-4 top-2 text-gray-700 font-medium">
                  ريال
                </span>
              </div>
            </div>

            {/* التصنيف */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  التصنيف الرئيسي
                </label>
                <select
                  value={mainCategory}
                  onChange={(e) => {
                    setMainCategory(e.target.value);
                    setSubCategory('');
                  }}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
                  required
                >
                  <option value="">اختر التصنيف الرئيسي</option>
                  <option value="real-estate">عقارات</option>
                  <option value="vehicles">سيارات</option>
                  <option value="electronics">إلكترونيات</option>
                  <option value="furniture">أثاث</option>
                  <option value="fashion">أزياء</option>
                  <option value="services">خدمات</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              {mainCategory && (
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    التصنيف الفرعي
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
                    required
                  >
                    <option value="">اختر التصنيف الفرعي</option>
                    {mainCategory === 'real-estate' && (
                      <>
                        <option value="apartments">شقق</option>
                        <option value="villas">فلل</option>
                        <option value="lands">أراضي</option>
                        <option value="commercial">عقارات تجارية</option>
                        <option value="buildings">عمارات</option>
                      </>
                    )}
                    {mainCategory === 'vehicles' && (
                      <>
                        <option value="cars">سيارات</option>
                        <option value="motorcycles">دراجات نارية</option>
                        <option value="trucks">شاحنات</option>
                        <option value="boats">قوارب</option>
                        <option value="parts">قطع غيار</option>
                      </>
                    )}
                    {mainCategory === 'electronics' && (
                      <>
                        <option value="phones">هواتف</option>
                        <option value="computers">حاسبات</option>
                        <option value="tablets">أجهزة لوحية</option>
                        <option value="tv-audio">تلفاز وصوتيات</option>
                        <option value="gaming">ألعاب وأجهزة</option>
                      </>
                    )}
                    {mainCategory === 'furniture' && (
                      <>
                        <option value="living-room">غرف معيشة</option>
                        <option value="bedroom">غرف نوم</option>
                        <option value="kitchen">مطبخ</option>
                        <option value="outdoor">أثاث خارجي</option>
                        <option value="office">أثاث مكتبي</option>
                      </>
                    )}
                    {mainCategory === 'fashion' && (
                      <>
                        <option value="clothing">ملابس</option>
                        <option value="shoes">أحذية</option>
                        <option value="bags">حقائب</option>
                        <option value="accessories">إكسسوارات</option>
                        <option value="watches">ساعات</option>
                      </>
                    )}
                    {mainCategory === 'services' && (
                      <>
                        <option value="maintenance">صيانة</option>
                        <option value="cleaning">تنظيف</option>
                        <option value="moving">نقل وتوصيل</option>
                        <option value="education">تعليم وتدريب</option>
                        <option value="events">مناسبات</option>
                      </>
                    )}
                  </select>
                </div>
              )}
            </div>

            {/* الموقع */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                الموقع
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-black"
                required
                placeholder="المدينة، الحي"
              />
            </div>

            {/* الحالة */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">
                حالة المنتج
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${condition === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="new"
                    checked={condition === 'new'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-black mb-1">جديد</div>
                    <div className="text-sm text-black">المنتج جديد ولم يستخدم من قبل</div>
                  </div>
                </label>
                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${condition === 'used' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="condition"
                    value="used"
                    checked={condition === 'used'}
                    onChange={(e) => setCondition(e.target.value)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-black mb-1">مستعمل</div>
                    <div className="text-sm text-black">المنتج مستعمل وبحالة جيدة</div>
                  </div>
                </label>
              </div>
            </div>

            {/* خيارات إضافية */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">
                خيارات البيع
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${negotiable ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="checkbox"
                    checked={negotiable}
                    onChange={(e) => setNegotiable(e.target.checked)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-black mb-1">قابل للتفاوض</div>
                    <div className="text-sm text-black">السعر قابل للتفاوض مع المشتري</div>
                  </div>
                </label>
                <label className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${allowBidding ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="checkbox"
                    checked={allowBidding}
                    onChange={(e) => setAllowBidding(e.target.checked)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="text-lg font-bold text-black mb-1">المزايدة</div>
                    <div className="text-sm text-black">السماح للمشترين بتقديم عروض أعلى</div>
                  </div>
                </label>
              </div>
            </div>

            {/* زر الإرسال */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-[#f5ca58] text-white rounded-md hover:bg-[#e5ba48] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'جاري الإضافة...' : 'إضافة الإعلان'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
