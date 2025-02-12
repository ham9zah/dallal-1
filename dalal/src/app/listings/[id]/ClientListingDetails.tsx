'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Avatar from '@/components/ui/Avatar';
import ImageGallery from '@/components/listings/ImageGallery';
import Image from 'next/image';
import SimilarListings from '@/components/listings/SimilarListings';
import {
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface Comment {
  id: number;
  user: string;
  date: string;
  content: string;
  name: string;
}

interface Advertiser {
  name: string;
  joinDate: string;
  image: string;
}

interface Listing {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  images: string[];
  category: string;
  date: string;
  condition: string;
  description: string;
  advertiser: Advertiser;
  tags: string[];
  comments: Comment[];
  highestBid?: string;
  numberOfBids?: number;
}

interface ClientListingDetailsProps {
  listing: Listing;
}

export default function ClientListingDetails({ listing }: ClientListingDetailsProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: listing.description,
          url: window.location.href,
        });
      } catch (error) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setSuccessMessage('تم نسخ الرابط بنجاح');
    setShowSuccessMessage(true);
    setShowShareMenu(false);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setSuccessMessage(isFavorited ? 'تم إزالة الإعلان من المفضلة' : 'تم إضافة الإعلان إلى المفضلة');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setComment('');
    setShowCommentForm(false);
  };

  return (
    <div className="min-h-screen bg-primary-light pt-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title and Basic Info */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-8">
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-primary-dark">{listing.title}</h1>
                <div className="flex items-center gap-6 text-primary-dark/60">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5" />
                    <span>{listing.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleFavorite}
                  className={`p-3 rounded-full bg-primary-light hover:bg-primary-light/80 transition-colors duration-200`}
                >
                  <HeartIcon className={`w-6 h-6 ${isFavorited ? 'text-primary' : 'text-primary-dark'}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-primary-light hover:bg-primary-light/80 transition-colors duration-200"
                >
                  <ShareIcon className="w-6 h-6 text-primary-dark" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* معرض الصور */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-8">
          <ImageGallery 
            images={listing.images?.length ? listing.images : [listing.image]}
            title={listing.title}
          />
        </div>

        {/* معلومات السعر وأعلى سومة */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:rtl">
              {/* أعلى سومة - على اليمين */}
              {listing.highestBid && (
                <div className="md:w-1/2 md:border-l md:pl-6">
                  <div className="text-right space-y-2">
                    <h3 className="text-lg font-medium text-gray-500">أعلى سومة</h3>
                    <p className="text-3xl font-bold text-green-600">{listing.highestBid} ريال</p>
                    {listing.numberOfBids && (
                      <p className="text-sm text-gray-500">عدد المزايدات: {listing.numberOfBids}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* السعر المعروض - على اليسار */}
              <div className="md:w-1/2 text-right">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-500">السعر المعروض</h3>
                  <p className="text-3xl font-bold text-primary-dark">{listing.price} ريال</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary-dark">الوصف</h2>
                <p className="mt-4 text-primary-dark/70 leading-relaxed">
                  سيارة مرسيدس S-Class موديل 2024 فل كامل، المواصفات تشمل:
                  <br/><br/>
                  • محرك V8 بقوة 496 حصان
                  <br/>
                  • نظام تعليق هوائي متكيف
                  <br/>
                  • شاشة عرض أمامية مقاس 12.8 بوصة
                  <br/>
                  • نظام صوت Burmester® 4D الفاخر
                  <br/>
                  • مقاعد جلد نابا مع خاصية التدليك
                  <br/>
                  • نظام قيادة مساعد متطور
                  <br/>
                  • إضاءة محيطية بـ 64 لون
                  <br/>
                  • فتحة سقف بانورامية
                  <br/>
                  • نظام تنقية هواء متطور
                  <br/>
                  • جنوط مقاس 21 بوصة
                  <br/><br/>
                  السيارة بحالة الوكالة، صيانة دورية منتظمة في الوكالة. ضمان وصيانة مجانية لمدة 5 سنوات.
                </p>
              </div>

              {/* Comments */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-primary-dark">التعليقات</h2>
                  <button
                    onClick={() => setShowCommentForm(true)}
                    className="text-primary hover:text-primary/80"
                  >
                    إضافة تعليق
                  </button>
                </div>

                {/* Comment Form */}
                {showCommentForm && (
                  <form onSubmit={handleSubmitComment} className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary-dark">التعليق</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="اكتب تعليقك هنا..."
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-primary-dark">السوم (ريال)</label>
                      <div className="relative">
                        <input
                          type="number"
                          min={875001}
                          step="1000"
                          placeholder="875,001"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-left"
                        />
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary-dark/60">
                          ريال
                        </div>
                      </div>
                      <p className="text-xs text-primary-dark/60">* يجب أن يكون السوم أعلى من آخر عرض (875,000 ريال)</p>
                    </div>

                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setShowCommentForm(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-primary-dark rounded-lg hover:bg-primary/80"
                      >
                        إرسال
                      </button>
                    </div>
                  </form>
                )}

                {/* Comments List */}
                <div className="mt-4 space-y-3">
                  {[
                    {
                      id: 1,
                      user: 'أحمد محمد',
                      date: 'قبل 3 ساعات',
                      content: 'كم آخر سعر؟',
                      name: 'أحمد محمد'
                    },
                    {
                      id: 2,
                      user: 'خالد العتيبي',
                      date: 'قبل ساعتين',
                      content: 'تواصل معي على الخاص',
                      price: 850000,
                      name: 'خالد العتيبي'
                    },
                    {
                      id: 3,
                      user: 'سلطان السعيد',
                      date: 'قبل ساعة',
                      content: 'هل السعر نهائي؟',
                      price: 875000,
                      avatar: '/images/avatar3.jpg'
                    }
                  ].map((comment) => (
                    <div key={comment.id} className="flex gap-4 bg-white rounded-lg p-4 border border-yellow-300">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-light">
                          <Avatar name={comment.user} size={40} className="rounded-full" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-primary-dark">{comment.user}</span>
                            <span className="text-sm text-primary-dark/60">{comment.date}</span>
                          </div>
                          {'price' in comment && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-primary-dark">
                                {comment.price.toLocaleString()} ريال
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-primary-dark/70 mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-primary-light/50 rounded-lg p-6 border border-primary-dark/5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Avatar name={listing.advertiser.name} size={64} className="rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{listing.advertiser.name}</h3>
                    <p className="text-sm text-gray-500">عضو منذ {listing.advertiser.joinDate}</p>
                  </div>
                </div>
                <button className="mt-4 w-full py-3 px-4 bg-primary text-primary-dark rounded-lg hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
                  تواصل مع المعلن
                </button>
              </div>

              <div className="bg-primary-light/50 rounded-lg p-6 border border-primary-dark/5">
                <h3 className="font-medium text-gray-900">تفاصيل إضافية</h3>
                <dl className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-primary-dark/60">السعر</dt>
                    <dd className="font-medium text-primary-dark">825,000 ريال</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-dark/60">أعلى عرض</dt>
                    <dd className="font-medium text-green-600">875,000 ريال</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-dark/60">الحالة</dt>
                    <dd className="font-medium text-primary-dark">{listing.condition}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-primary-dark/60">التصنيف</dt>
                    <dd className="font-medium text-primary-dark">{listing.category}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">الوسوم</h3>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-light text-primary-dark/70 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Listings */}
          <div className="bg-primary-light/30 px-8 py-12 border-t border-primary-dark/5">
            <div className="max-w-7xl mx-auto">
              <SimilarListings
                currentListingId={listing.id}
                category={listing.category}
                limit={3}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <Transition
        show={showSuccessMessage}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-primary text-primary-dark px-6 py-3 rounded-full shadow-lg shadow-primary/20 flex items-center gap-2 font-medium">
            <CheckIcon className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        </div>
      </Transition>

      {/* Image Modal */}
      <Transition appear show={isImageModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsImageModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-black p-1">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={selectedImage}
                      alt="صورة مكبرة"
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                  <button
                    onClick={() => setIsImageModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
