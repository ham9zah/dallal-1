'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Avatar from '@/components/ui/Avatar';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import NotificationBadge from './NotificationBadge';

interface Message {
  id: string;
  sender: {
    name: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
}

export default function MessagesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // بيانات تجريبية - سيتم استبدالها بالبيانات الفعلية من قاعدة البيانات
  const messages: Message[] = [
    {
      id: '1',
      sender: {
        name: 'أحمد محمد',
        name: 'أحمد محمد',
      },
      content: 'مرحباً، هل الفيلا لا تزال متاحة؟',
      timestamp: '2024-02-09T09:30:00',
      isRead: false,
    },
    {
      id: '2',
      sender: {
        name: 'سارة أحمد',
        name: 'سارة أحمد',
      },
      content: 'هل يمكنني معاينة الشقة غداً؟',
      timestamp: '2024-02-09T08:15:00',
      isRead: false,
    },
  ];

  const unreadCount = messages.filter(m => !m.isRead).length;

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `منذ ${diffInHours} ساعة`;
    } else {
      return date.toLocaleDateString('ar-SA', {
        month: 'numeric',
        day: 'numeric',
      });
    }
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col items-center justify-center gap-1.5 text-[14px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        <div className="relative">
          <ChatBubbleLeftIcon className="w-7 h-7" />
          <NotificationBadge count={unreadCount} />
        </div>
        الرسائل
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[120%] w-[320px] bg-white rounded-xl shadow-xl border py-2 z-50">
          <div className="px-4 py-2 border-b">
            <h3 className="font-semibold text-gray-800">الرسائل الجديدة</h3>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {messages.map((message) => (
              <Link
                key={message.id}
                href={`/messages?chat=${message.id}`}
                className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-start gap-3">
                  <Avatar name={message.sender.name} size={40} className="rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 truncate">
                        {message.sender.name}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap mr-2">
                        {formatMessageDate(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {message.content}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-4 py-2 border-t">
            <Link
              href="/messages"
              className="block text-center text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setIsOpen(false)}
            >
              عرض كل الرسائل
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
