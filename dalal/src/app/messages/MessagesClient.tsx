'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ChatWindow from '@/components/messages/ChatWindow';


interface Sender {
  id: string;
  name: string;
  name: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  mainImage: string;
}

interface Message {
  id: string;
  sender: Sender;
  listing: Listing;
  lastMessage: string;
  unreadCount: number;
  lastMessageDate: string;
}

interface MessagesClientProps {
  messages: Message[];
}

export default function MessagesClient({ messages }: MessagesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get('chat');
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);

  useEffect(() => {
    if (chatId) {
      const chat = messages.find(m => m.id === chatId);
      if (chat) {
        setSelectedChat(chat);
      }
    }
  }, [chatId, messages]);

  const handleChatSelect = (message: Message) => {
    const params = new URLSearchParams(searchParams);
    params.set('chat', message.id);
    router.push(`/messages?${params.toString()}`);
    setSelectedChat(message);
  };

  const handleCloseChat = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('chat');
    router.push(`/messages?${params.toString()}`);
    setSelectedChat(null);
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');

  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = message.sender.name.includes(searchQuery) ||
        message.lastMessage.includes(searchQuery) ||
        message.listing.title.includes(searchQuery);
      
      if (filterType === 'unread') {
        return matchesSearch && message.unreadCount > 0;
      }
      return matchesSearch;
    });

  const formatPrice = (price: number) => {
    return price.toLocaleString('ar-SA') + ' ريال';
  };

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[180px] pb-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">الرسائل</h1>
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'unread')}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الرسائل..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[15px]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedChat?.id === message.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleChatSelect(message)}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar name={message.sender.name} size={48} className="rounded-full" />
                    {message.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {message.unreadCount}
                        </span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {message.sender.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatMessageDate(message.lastMessageDate)}
                      </span>
                    </div>
                    
                    <Link 
                      href={`/listings/${message.listing.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700 mb-1 block"
                    >
                      {message.listing.title} - {formatPrice(message.listing.price)}
                    </Link>
                    
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {message.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {messages.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">لا توجد رسائل</p>
            </div>
          )}
        </div>
      </div>

      {selectedChat && (
        <ChatWindow
          sender={selectedChat.sender}
          listing={selectedChat.listing}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
}
