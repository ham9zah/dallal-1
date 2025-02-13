'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import Avatar from '@/components/ui/Avatar';
import { PaperAirplaneIcon, PaperClipIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

interface ChatWindowProps {
  sender: {
    id: string;
    name: string;
  };
  listing: {
    id: string;
    title: string;
    price: number;
  };
  onClose: () => void;
}

export default function ChatWindow({ sender, listing, onClose }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'مرحباً، هل الفيلا لا تزال متاحة؟',
      senderId: sender.id,
      timestamp: '2024-02-08T14:30:00',
    },
    {
      id: '2',
      content: 'نعم، لا تزال متاحة. هل تود معاينتها؟',
      senderId: 'me',
      timestamp: '2024-02-08T14:35:00',
    },
  ]);

  const formatMessageDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: 'me',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col relative">
        {/* رأس المحادثة */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={sender.name} size={40} className="rounded-full" />
            <div>
              <h3 className="font-semibold text-gray-800">{sender.name}</h3>
              <p className="text-sm text-gray-500">{listing.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* محتوى المحادثة */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.senderId === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block ${
                  message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatMessageDate(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* مربع إدخال الرسالة */}
        <div className="p-4 border-t">
          <div className="flex gap-2 relative">
            <div className="relative">
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <PaperClipIcon className="h-5 w-5" />
              </button>
              
              {showAttachMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border py-2 w-48">
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAttachMenu(false);
                    }}
                    className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <PhotoIcon className="h-5 w-5" />
                    صورة
                  </button>
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAttachMenu(false);
                    }}
                    className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <DocumentIcon className="h-5 w-5" />
                    ملف
                  </button>
                </div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // TODO: معالجة الملف المرفق
                    console.log('Selected file:', file);
                  }
                }}
                accept="image/*,.pdf,.doc,.docx"
              />
            </div>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 resize-none rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black text-[16px] font-medium"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
