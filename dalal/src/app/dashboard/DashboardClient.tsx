'use client';

import React, { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import styles from './dashboard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { 
  FaHeart, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCog, 
  FaEnvelope, 
  FaListUl, 
  FaThLarge,
  FaBell,
  FaUser,
  FaTags
} from 'react-icons/fa';
import ChatWindow from '@/components/chat/ChatWindow';

interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  isRead: boolean;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  status?: string;
  views?: number;
  favorites?: number;
  mainImage: string;
  createdAt: string;
}

interface UserData {
  name: string;
  email: string;
  name: string;
  memberSince: string;
  listings: Listing[];
  favorites: Listing[];
  messages: Message[];
}

interface DashboardClientProps {
  userData: UserData;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ userData }): JSX.Element => {
  const [activeTab, setActiveTab] = useState('listings');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(authService.isAdmin());
  }, []);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [messageSearch, setMessageSearch] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread'>('all');
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const filteredMessages = userData.messages?.filter(message => {
    const matchesSearch = 
      message.sender.toLowerCase().includes(messageSearch.toLowerCase()) ||
      message.content.toLowerCase().includes(messageSearch.toLowerCase());
    
    if (messageFilter === 'unread') {
      return matchesSearch && !message.isRead;
    }
    return matchesSearch;
  }) || [];

  const handleMessageClick = (message: Message) => {
    setSelectedChat(message);
    // TODO: جلب رسائل المحادثة من الخادم
    setChatMessages([
      {
        id: '1',
        sender: message.sender,
        content: message.content,
        date: message.date,
        isSender: false
      },
      {
        id: '2',
        sender: 'أنا',
        content: 'مرحباً، كيف حالك؟',
        date: new Date().toISOString(),
        isSender: true
      }
    ]);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
    setChatMessages([]);
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // TODO: إرسال الرسالة إلى الخادم
    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'أنا',
      content: message,
      date: new Date().toISOString(),
      isSender: true
    }]);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-SA') + ' ريال';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-SA');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'نشط';
      case 'pending':
        return 'قيد المراجعة';
      case 'inactive':
        return 'غير نشط';
      default:
        return status;
    }
  };

  const renderListingGrid = (listing: Listing) => (
    <div key={listing.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative h-48">
        <Image
          src={listing.mainImage}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
          <span className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-sm ${getStatusColor(listing.status || '')}`}>
            {getStatusText(listing.status || '')}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{listing.location}</p>
        <p className="text-lg font-bold text-blue-600 mb-3">{formatPrice(listing.price)}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <FaEye className="ml-1" />
            <span>{listing.views}</span>
          </div>
          <div className="flex items-center">
            <FaHeart className="ml-1" />
            <span>{listing.favorites}</span>
          </div>
          <div>{formatDate(listing.createdAt)}</div>
        </div>
        <div className="flex justify-between">
          <Link href={`/listings/${listing.id}/edit`} className="flex items-center text-blue-600 hover:text-blue-700">
            <FaEdit className="ml-1" />
            تعديل
          </Link>
          <button className="flex items-center text-red-600 hover:text-red-700">
            <FaTrash className="ml-1" />
            حذف
          </button>
        </div>
      </div>
    </div>
  );

  const renderListingList = (listing: Listing) => (
    <div key={listing.id} className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden mb-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex">
        <div className="relative w-48 h-32">
          <Image
            src={listing.mainImage}
            alt={listing.title}
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{listing.title}</h3>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">{formatPrice(listing.price)}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`px-3 py-1.5 text-xs font-medium rounded-full shadow-sm ${getStatusColor(listing.status || '')}`}>
                {getStatusText(listing.status || '')}
              </span>
              <div className="mt-2 text-sm text-gray-500">{formatDate(listing.createdAt)}</div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <FaEye className="ml-1" />
                <span>{listing.views}</span>
              </div>
              <div className="flex items-center">
                <FaHeart className="ml-1" />
                <span>{listing.favorites}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href={`/listings/${listing.id}/edit`} className="flex items-center text-blue-600 hover:text-blue-700">
                <FaEdit className="ml-1" />
                تعديل
              </Link>
              <button className="flex items-center text-red-600 hover:text-red-700">
                <FaTrash className="ml-1" />
                حذف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderViewModeButtons = () => {
    if (activeTab !== 'listings' && activeTab !== 'favorites') {
      return null;
    }

    return (
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 bg-white border border-gray-200 p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded text-black ${
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaThLarge className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded text-black ${
              viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FaListUl className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };



  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center gap-2 shadow-sm">
          <FaCog className="w-4 h-4" />
          حفظ التغييرات
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* معلومات الحساب */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaUser className="text-black" />
            معلومات الحساب
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">الاسم</label>
              <input 
                type="text" 
                defaultValue={userData.name} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                defaultValue={userData.email} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
              />
            </div>
          </div>
        </div>

        {/* الإشعارات */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FaBell className="text-black" />
            الإشعارات
          </h3>
          <div className="space-y-4">
            <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer group">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 ml-3" 
              />
              <div>
                <span className="font-medium text-black block mb-1">إشعارات البريد الإلكتروني</span>
                <span className="text-sm text-black">استلام إشعارات عبر البريد الإلكتروني عند وجود رسائل جديدة</span>
              </div>
            </label>
            <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer group">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-5 h-5 border-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500 ml-3" 
              />
              <div>
                <span className="font-medium text-black block mb-1">إشعارات الرسائل الجديدة</span>
                <span className="text-sm text-black">عرض إشعارات على المتصفح عند استلام رسائل جديدة</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 pt-[180px] pb-8 space-y-6">
      {/* معلومات المستخدم */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden">
            <Avatar name={userData.name} size={80} className="w-full h-full" />
          </div>
          <div className="mr-6 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                <p className="text-gray-600">{userData.email}</p>
                <p className="text-gray-500 text-sm">عضو منذ {userData.memberSince}</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{userData.listings.length}</div>
                  <div className="text-sm text-gray-500">إعلان</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{userData.favorites.length}</div>
                  <div className="text-sm text-gray-500">مفضلة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* التبويبات */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200 px-6">
          <nav className="-mb-px flex flex-wrap gap-8">
            {isAdmin && (
              <Link
                href="/dashboard/categories"
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors text-black ${activeTab === 'categories' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <FaTags />
                إدارة الفئات
              </Link>
            )}
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors text-black ${
                activeTab === 'listings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaListUl />
              إعلاناتي
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors text-black ${
                activeTab === 'favorites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaHeart />
              المفضلة
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors text-black ${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaEnvelope />
              الرسائل
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors text-black ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FaCog />
              الإعدادات
            </button>
          </nav>
        </div>
      </div>

      {/* أزرار عرض الإعلانات */}
      {renderViewModeButtons()}

      {/* محتوى التبويب النشط */}
      {activeTab === 'listings' && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {userData.listings.map((listing) =>
            viewMode === 'grid' ? renderListingGrid(listing) : renderListingList(listing)
          )}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {userData.favorites.map((listing) =>
            viewMode === 'grid' ? renderListingGrid(listing) : renderListingList(listing)
          )}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">الرسائل</h1>
                <div className="flex gap-2">
                  <select
                    value={messageFilter}
                    onChange={(e) => setMessageFilter(e.target.value as 'all' | 'unread')}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">جميع الرسائل</option>
                    <option value="unread">الرسائل غير المقروءة</option>
                  </select>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  placeholder="ابحث في الرسائل..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {userData.messages?.length === 0 ? (
                <div className="text-center py-12">
                  <FaEnvelope className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">لا توجد رسائل</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!message.isRead ? 'bg-blue-50' : ''}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          <span className="text-gray-500 text-lg font-semibold">
                            {typeof message.sender === 'string' ? message.sender.charAt(0).toUpperCase() : 'م'}
                          </span>
                        </div>
                        {!message.isRead && (
                          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">جديد</span>
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-gray-800">
                            {message.sender}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {formatDate(message.date)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedChat && (
            <ChatWindow
              selectedChat={selectedChat}
              messages={chatMessages}
              onClose={handleCloseChat}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      )}
      {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </>
  );
};

export default DashboardClient;
