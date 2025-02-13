import React from 'react';
import { formatDate } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  date: string;
  isSender: boolean;
}

interface ChatWindowProps {
  selectedChat: {
    id: string;
    sender: string;
    content: string;
    date: string;
  };
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  messages,
  onClose,
  onSendMessage,
}) => {
  return (
    <div className="fixed bottom-4 left-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      {/* رأس المحادثة */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-semibold">
              {selectedChat.sender.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{selectedChat.sender}</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* محتوى المحادثة */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${msg.isSender ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs mt-1 block opacity-70">
                {formatDate(msg.date)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* مربع إدخال الرسالة */}
      <div className="p-4 border-t border-gray-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
            onSendMessage(input.value);
            input.value = '';
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            name="message"
            placeholder="اكتب رسالتك..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
