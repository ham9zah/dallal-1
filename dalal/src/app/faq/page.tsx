'use client';

import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b pb-4">
    <button
      onClick={onClick}
      className="w-full text-right flex justify-between items-center focus:outline-none"
    >
      <span className="text-xl font-semibold text-gray-900">{question}</span>
      <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
        ▼
      </span>
    </button>
    {isOpen && (
      <p className="text-gray-700 mt-2 pr-4">{answer}</p>
    )}
  </div>
);

const faqItems = [
  {
    question: 'كيف يمكنني إنشاء حساب جديد؟',
    answer: 'انقر على زر "تسجيل" في الصفحة الرئيسية، ثم قم بتعبئة المعلومات المطلوبة واتبع خطوات التحقق.'
  },
  {
    question: 'كيف يمكنني تغيير كلمة المرور الخاصة بي؟',
    answer: 'يمكنك تغيير كلمة المرور من خلال الذهاب إلى إعدادات الحساب، ثم اختيار "تغيير كلمة المرور".'
  },
  {
    question: 'ما هي خطوات التحقق من الحساب؟',
    answer: 'تشمل خطوات التحقق: تأكيد البريد الإلكتروني، تأكيد رقم الهاتف، وتقديم وثائق الهوية الشخصية.'
  },
  {
    question: 'كيف يمكنني الإبلاغ عن مشكلة؟',
    answer: 'يمكنك الإبلاغ عن المشاكل من خلال صفحة الدعم أو عبر البريد الإلكتروني support@example.com.'
  },
  {
    question: 'ما هي سياسة الاسترداد؟',
    answer: 'يمكن طلب الاسترداد خلال 14 يوماً من تاريخ العملية، مع مراعاة الشروط والأحكام.'
  },
  {
    question: 'كيف يمكنني تفعيل التحقق بخطوتين؟',
    answer: 'توجه إلى إعدادات الأمان في حسابك، ثم اختر "تفعيل التحقق بخطوتين" واتبع التعليمات.'
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h1>
          <p className="text-lg text-gray-600">إجابات على الأسئلة الأكثر شيوعاً</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-6">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
