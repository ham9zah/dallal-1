import { Metadata } from "next";
import MessagesClient from "./MessagesClient";

export const metadata: Metadata = {
  title: "الرسائل - دلال",
  description: "صندوق الرسائل الخاص بك في موقع دلال",
};

export default async function MessagesPage() {
  // بيانات ثابتة للرسائل
  const messages = [
    {
      id: "1",
      sender: {
        id: "user1",
        name: "أحمد محمد",
        name: "أحمد محمد",
      },
      listing: {
        id: "listing1",
        title: "فيلا فاخرة للبيع",
        price: 2500000,
        mainImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      },
      lastMessage: "مرحباً، هل الفيلا لا تزال متاحة؟",
      unreadCount: 2,
      lastMessageDate: "2024-02-08T14:30:00",
    },
    {
      id: "2",
      sender: {
        id: "user2",
        name: "سارة أحمد",
        name: "سارة أحمد",
      },
      listing: {
        id: "listing2",
        title: "شقة مميزة للإيجار",
        price: 45000,
        mainImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      },
      lastMessage: "هل يمكنني معاينة الشقة غداً؟",
      unreadCount: 1,
      lastMessageDate: "2024-02-08T10:15:00",
    },
  ];

  return <MessagesClient messages={messages} />;
}
