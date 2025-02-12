import React from 'react';

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">التحقق من الحساب</h1>
          <p className="text-lg text-gray-600">خطوات التحقق من حسابك وتوثيقه</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">١. التحقق من البريد الإلكتروني</h2>
            <p className="text-gray-700 leading-relaxed">
              سيتم إرسال رسالة تحقق إلى بريدك الإلكتروني. يرجى النقر على الرابط الموجود في الرسالة لتأكيد حسابك.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٢. التحقق من رقم الهاتف</h2>
            <p className="text-gray-700 leading-relaxed">
              سيتم إرسال رمز التحقق عبر رسالة نصية. أدخل الرمز في الصفحة المخصصة للتحقق.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٣. توثيق الهوية</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تحميل صورة من الهوية الوطنية أو جواز السفر</li>
              <li>التقاط صورة شخصية مع الوثيقة</li>
              <li>تقديم إثبات العنوان</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٤. مراجعة الوثائق</h2>
            <p className="text-gray-700 leading-relaxed">
              سيتم مراجعة الوثائق المقدمة خلال ٢-٣ أيام عمل. سيتم إخطارك بالنتيجة عبر البريد الإلكتروني.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
