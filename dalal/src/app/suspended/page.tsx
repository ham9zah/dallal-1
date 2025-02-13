import React from 'react';

export default function SuspendedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">تعليق الحساب</h1>
          <p className="text-lg text-gray-600">معلومات حول تعليق الحساب وكيفية استعادته</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">أسباب تعليق الحساب</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>مخالفة شروط الاستخدام</li>
              <li>نشاط مشبوه أو غير عادي</li>
              <li>شكاوى متعددة من المستخدمين</li>
              <li>عدم الامتثال لسياسات المنصة</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">مدة التعليق</h2>
            <p className="text-gray-700 leading-relaxed">
              تختلف مدة التعليق حسب نوع المخالفة:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تعليق مؤقت: من يوم إلى 30 يوماً</li>
              <li>تعليق طويل المدى: من شهر إلى 6 أشهر</li>
              <li>تعليق دائم: في حالات المخالفات الجسيمة</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">استعادة الحساب</h2>
            <p className="text-gray-700 leading-relaxed">
              خطوات استعادة الحساب المعلق:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>تقديم طلب استئناف</li>
              <li>شرح أسباب المخالفة وكيفية تصحيحها</li>
              <li>تقديم التعهدات اللازمة</li>
              <li>انتظار مراجعة الطلب من فريق الدعم</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">تجنب التعليق</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>الالتزام بشروط الاستخدام</li>
              <li>احترام حقوق الآخرين</li>
              <li>تجنب السلوك المسيء</li>
              <li>الإبلاغ عن المشاكل بشكل مناسب</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            للمزيد من المعلومات، يرجى التواصل مع 
            <a href="/contact" className="text-blue-600 hover:text-blue-800 mx-1">فريق الدعم</a>
          </p>
        </div>
      </div>
    </div>
  );
}
