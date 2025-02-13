'use client';

import { useEffect, useRef, useState } from 'react';
import MessagesDropdown from '../messages/MessagesDropdown';
import NotificationBadge from '../messages/NotificationBadge';
import Link from 'next/link';
import Image from 'next/image';
import AuthStatus from '../auth/AuthStatus';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  UserCircleIcon,
  Bars3Icon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  KeyIcon,
  TruckIcon,
  WrenchIcon,
  TagIcon,
  GiftIcon,
  BriefcaseIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  AcademicCapIcon,
  PuzzlePieceIcon,
  BoltIcon,
  FireIcon,
  BookOpenIcon,
  HeartIcon,
  BuildingOfficeIcon,
  HomeModernIcon,
  CakeIcon,
  StarIcon,
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);




  const handleFilterClick = () => {
    const newState = !showAdvancedFilter;
    setShowAdvancedFilter(newState);
    localStorage.setItem('showAdvancedFilter', String(newState));
    window.dispatchEvent(new Event('showFilterChange'));
  };

  const categoriesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!categoriesRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - categoriesRef.current.offsetLeft);
    setScrollLeft(categoriesRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoriesRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };


  // التحكم في الشريط العلوي عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const categories = [
    { id: 'stores', label: 'متاجر', Icon: BuildingStorefrontIcon },
    { id: 'real-estate-sale', label: 'عقارات للبيع', Icon: HomeIcon },
    { id: 'real-estate-rent', label: 'عقارات للإيجار', Icon: KeyIcon },
    { id: 'vehicles', label: 'مركبات', Icon: TruckIcon },
    { id: 'motorcycles', label: 'دراجات نارية', Icon: TruckIcon },
    { id: 'services', label: 'الخدمات', Icon: WrenchIcon },
    { id: 'fashion-men', label: 'ازياء - موضة رجالي', Icon: TagIcon },
    { id: 'fashion-women', label: 'ازياء - موضة نسائية', Icon: TagIcon },
    { id: 'kids-toys', label: 'أطفال وألعاب', Icon: GiftIcon },
    { id: 'jobs', label: 'وظائف', Icon: BriefcaseIcon },
    { id: 'mobile-tablet', label: 'موبايل - تابلت', Icon: DevicePhoneMobileIcon },
    { id: 'laptop-computer', label: 'لابتوب وكمبيوتر', Icon: ComputerDesktopIcon },
    { id: 'education', label: 'تعليم وتدريب', Icon: AcademicCapIcon },
    { id: 'gaming', label: 'العاب فيديو وملحقاتها', Icon: PuzzlePieceIcon },
    { id: 'electronics', label: 'الكترونيات', Icon: BoltIcon },
    { id: 'sports', label: 'رياضة ولياقة بدنية', Icon: FireIcon },
    { id: 'books-hobbies', label: 'كتب وهوايات', Icon: BookOpenIcon },
    { id: 'pets', label: 'حيوانات', Icon: HeartIcon },
    { id: 'business', label: 'شركات - معدات مهنية', Icon: BuildingOfficeIcon },
    { id: 'home-garden', label: 'منزل وحديقة', Icon: HomeModernIcon },
    { id: 'food', label: 'طعام وغذاء', Icon: CakeIcon },
    { id: 'reviews', label: 'التقييمات و الارآء', Icon: StarIcon },
    { id: 'all-categories', label: 'جميع الاقسام', Icon: Squares2X2Icon },
  ];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all ${isScrolled ? 'shadow-sm' : ''}`}>
      {/* الشريط العلوي */}
      <div className="border-b">
        <div className="max-w-[1600px] mx-auto h-[70px] lg:h-[90px] flex items-center justify-between px-4 lg:px-7 gap-3 lg:gap-8">

          {/* الشعار */}
          <Link href="/" className="shrink-0">
            <Image 
              src="/logo/ dalal-logo.svg"
              alt="دلال" 
              width={160} 
              height={44}
              className="h-[40px] lg:h-[52px] w-auto"
              priority
            />
          </Link>

          {/* البحث */}
          <div className="flex-1 max-w-[1200px] lg:mx-16 mx-2">
            <div className="flex items-center h-[44px] lg:h-[60px] rounded-full border hover:shadow-md transition-all group/search bg-gray-50">
              <div className="h-full flex items-center gap-2 lg:gap-4 flex-1 px-3 lg:px-6">
                <MagnifyingGlassIcon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                <input 
                  type="text"
                  placeholder="ابحث عن أي شيء..."
                  className="w-full bg-transparent outline-none text-[14px] lg:text-[16px] text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="flex items-center gap-2 pl-1 lg:pl-2 pr-1 lg:pr-2">
                <button 
                  onClick={() => {
                    if (isLocationActive && watchId !== null) {
                      navigator.geolocation.clearWatch(watchId);
                      setWatchId(null);
                      setIsLocationActive(false);
                    } else if (navigator.geolocation) {
                      setIsLocationActive(true);
                      const id = navigator.geolocation.watchPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          // يمكن استخدام الإحداثيات للبحث عن الإعلانات القريبة
                          console.log('Location:', latitude, longitude);
                        },
                        () => {
                          setIsLocationActive(false);
                          setWatchId(null);
                        }
                      );
                      setWatchId(id);
                    }
                  }}
                  className={`hidden lg:flex items-center justify-center h-[32px] lg:h-[40px] w-[32px] lg:w-[40px] rounded-full transition-all transform hover:scale-105 ${isLocationActive ? 'bg-[#f5ca58] shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
                  title="الإعلانات القريبة"
                >
                  <MapPinIcon className={`w-4 h-4 lg:w-5 lg:h-5 ${isLocationActive ? 'text-gray-900' : 'text-gray-600'}`} />
                </button>
                <button 
                  className="bg-[#f5ca58] text-gray-900 px-4 lg:px-8 h-[36px] lg:h-[46px] rounded-full hover:bg-[#e5ba48] transition-colors group-hover/search:shadow-md flex items-center justify-center font-medium text-[14px] lg:text-[15px]"
                >
                  بحث
                </button>
              </div>
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex items-center gap-3 lg:gap-6">
            <Link 
              href="/listings/create"
              className="bg-[#f5ca58] text-[14px] lg:text-[15px] font-medium text-white px-4 lg:px-7 h-[36px] lg:h-[42px] rounded-full hover:bg-[#e5ba48] transition-colors flex items-center gap-2 lg:gap-3 shadow-sm hover:shadow-md"
            >
              <PlusIcon className="w-5 h-5 lg:w-6 lg:h-6" />
              <span className="hidden lg:inline">أضف إعلانك</span>
              <span className="lg:hidden">إضافة</span>
            </Link>
            <button 
              className="hidden lg:flex flex-col items-center justify-center gap-1.5 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              title="المفضلة"
            >
              <HeartIcon className="w-7 h-7" />
              المفضلة
            </button>
            <div className="hidden lg:block">
              <MessagesDropdown />
            </div>
            <div className="relative">
              <AuthStatus />

              {/* القائمة المنسدلة */}
              {isMenuOpen && (
                <div className="absolute left-0 top-[120%] w-[220px] bg-white rounded-xl shadow-xl border py-3 z-50">
                  <Link
                    href="/dashboard"
                    className="block w-full text-right px-5 py-3 hover:bg-[#fff9e6] text-[15px] font-medium transition-colors text-gray-700 hover:text-gray-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Link>
                </div>
              )}
            </div>


          </div>
        </div>
      </div>

      {/* زر الفلترة المتقدمة - يظهر فقط على الشاشات الكبيرة */}
      <button
        onClick={handleFilterClick}
        className={`fixed right-8 top-[100px] z-50 items-center gap-2 px-5 py-2.5 rounded-full transition-all text-[15px] font-medium shadow-md hover:shadow-lg hidden lg:flex ${showAdvancedFilter ? 'bg-[#f5ca58] text-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        title="الفهرسة المتقدمة"
      >
        <AdjustmentsHorizontalIcon className={`w-5 h-5 ${showAdvancedFilter ? 'rotate-180' : ''} transition-transform duration-300`} />
        <span>فلترة متقدمة</span>
      </button>

      {/* شريط التصنيفات */}
      <div className="relative border-b bg-white">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-20 relative">
          {/* أزرار التنقل */}
          <button 
            onClick={() => categoriesRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
            className="absolute left-1 lg:left-8 top-1/2 -translate-y-1/2 w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center bg-white/90 shadow-md lg:shadow-lg rounded-full hover:scale-110 transition-transform z-10 border border-gray-100"
          >
            <ChevronRightIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
          <button 
            onClick={() => categoriesRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
            className="absolute right-1 lg:right-8 top-1/2 -translate-y-1/2 w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center bg-white/90 shadow-md lg:shadow-lg rounded-full hover:scale-110 transition-transform z-10 border border-gray-100"
          >
            <ChevronLeftIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>

          <div 
            className={`overflow-x-auto hide-scrollbar scroll-smooth cursor-grab ${isDragging ? 'cursor-grabbing select-none' : ''}`}
            ref={categoriesRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="flex items-center gap-8 h-[78px] py-4 px-4">
              {categories.map(category => {
                const Icon = category.Icon;
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex flex-col items-center gap-2 text-[12px] text-gray-500 hover:text-gray-900 group relative py-2 shrink-0 min-w-[80px] max-w-[100px]"
                  >
                    <div className="relative w-6 h-6 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6 stroke-[1.3]" />
                    </div>
                    <span className="text-center line-clamp-2 leading-tight group-hover:font-medium transition-all duration-200">{category.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>


        </div>
      </div>
      {/* الفلتر المتقدم للجوال */}
      <div 
        className={`lg:hidden fixed inset-0 transition-all duration-300 z-50 ${showAdvancedFilter ? 'visible' : 'invisible'}`}
        onClick={handleFilterClick}
      >
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${showAdvancedFilter ? 'opacity-100' : 'opacity-0'}`}
        />
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl transition-transform duration-300 shadow-xl ${showAdvancedFilter ? 'translate-y-0' : 'translate-y-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center justify-between px-4 py-4">
              <h3 className="text-lg font-semibold">الفلترة المتقدمة</h3>
              <button 
                onClick={handleFilterClick} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[15px] font-medium text-gray-700">السعر</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input 
                      type="number" 
                      placeholder="من" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[15px] placeholder-gray-400 focus:border-[#f5ca58] focus:ring-1 focus:ring-[#f5ca58] transition-colors" 
                    />
                  </div>
                  <span className="text-gray-400">إلى</span>
                  <div className="flex-1">
                    <input 
                      type="number" 
                      placeholder="إلى" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[15px] placeholder-gray-400 focus:border-[#f5ca58] focus:ring-1 focus:ring-[#f5ca58] transition-colors" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[15px] font-medium text-gray-700">الحالة</label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-[15px] focus:border-[#f5ca58] focus:ring-1 focus:ring-[#f5ca58] transition-colors">
                  <option value="">اختر الحالة</option>
                  <option value="new">جديد</option>
                  <option value="used">مستعمل</option>
                </select>
              </div>

              <button 
                className="w-full bg-[#f5ca58] text-gray-900 rounded-lg py-3.5 font-medium text-[15px] hover:bg-[#e5ba48] active:bg-[#d5aa38] transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-[#f5ca58] focus:ring-offset-2"
              >
                تطبيق الفلتر
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* شريط التنقل السفلي للجوال */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40 shadow-lg">
        <div className="flex items-center justify-around h-16">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 p-2 text-gray-600 hover:text-[#f5ca58]">
            <HomeIcon className="w-6 h-6" />
            <span className="text-[11px]">الرئيسية</span>
          </Link>
          <Link 
            href="/filter"
            className="flex flex-col items-center justify-center gap-1 p-2 text-gray-600 hover:text-[#f5ca58]"
          >
            <AdjustmentsHorizontalIcon className="w-6 h-6" />
            <span className="text-[11px]">فلترة</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center justify-center gap-1 p-2 text-gray-600 hover:text-[#f5ca58]">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-[11px]">الرسائل</span>
          </Link>
          <Link 
            href="/dashboard"
            className="flex flex-col items-center justify-center gap-1 p-2 text-gray-600 hover:text-[#f5ca58]"
          >
            <UserCircleIcon className="w-6 h-6" />
            <span className="text-[11px]">حسابي</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
