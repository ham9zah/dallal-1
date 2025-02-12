import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">اتصل بنا</h1>
          <p className="text-lg text-gray-600">نحن هنا لمساعدتك. تواصل معنا بأي طريقة تناسبك</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-right">معلومات الاتصال</h2>
            <div className="space-y-4 text-right">
              <div>
                <h3 className="text-gray-700 font-medium">البريد الإلكتروني:</h3>
                <p className="text-gray-600">support@example.com</p>
              </div>
              <div>
                <h3 className="text-gray-700 font-medium">رقم الهاتف:</h3>
                <p className="text-gray-600">+966 XX XXX XXXX</p>
              </div>
              <div>
                <h3 className="text-gray-700 font-medium">ساعات العمل:</h3>
                <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 5:00 م</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-right">الدعم السريع</h2>
            <div className="space-y-4 text-right">
              <div>
                <h3 className="text-gray-700 font-medium">الأسئلة الشائعة:</h3>
                <p className="text-gray-600">
                  <a href="/faq" className="text-black hover:text-black border-b-2 border-yellow-400">تصفح الأسئلة الشائعة</a>
                </p>
              </div>
              <div>
                <h3 className="text-gray-700 font-medium">مركز المساعدة:</h3>
                <p className="text-gray-600">
                  <a href="/support" className="text-black hover:text-black border-b-2 border-yellow-400">زيارة مركز المساعدة</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-right">نموذج الاتصال</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right">
                الاسم الكامل
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-right">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 text-right">
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-right">
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                dir="rtl"
              />
            </div>

            <div className="text-left">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-yellow-400 py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              >
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
