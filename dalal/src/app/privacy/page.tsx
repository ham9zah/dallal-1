import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">سياسة الخصوصية</h1>
          <p className="text-lg text-gray-600">كيف نقوم بحماية وإدارة بياناتك الشخصية</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">١. جمع البيانات</h2>
            <p className="text-gray-700 leading-relaxed">
              نقوم بجمع المعلومات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>المعلومات الشخصية الأساسية</li>
              <li>معلومات الاتصال</li>
              <li>بيانات تسجيل الدخول</li>
              <li>سجل المعاملات</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٢. استخدام البيانات</h2>
            <p className="text-gray-700 leading-relaxed">
              نستخدم بياناتك من أجل:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تقديم خدماتنا</li>
              <li>تحسين تجربة المستخدم</li>
              <li>التواصل معك</li>
              <li>حماية أمن حسابك</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٣. حماية البيانات</h2>
            <p className="text-gray-700 leading-relaxed">
              نتخذ إجراءات أمنية صارمة لحماية بياناتك، بما في ذلك:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>التشفير من طرف إلى طرف</li>
              <li>مراقبة الأمن المستمرة</li>
              <li>تحديثات أمنية دورية</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٤. حقوقك</h2>
            <p className="text-gray-700 leading-relaxed">
              لديك الحق في:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>الوصول إلى بياناتك</li>
              <li>تصحيح بياناتك</li>
              <li>حذف بياناتك</li>
              <li>طلب نسخة من بياناتك</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٥. الاتصال بنا</h2>
            <p className="text-gray-700 leading-relaxed">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا عبر:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>البريد الإلكتروني: privacy@example.com</li>
              <li>نموذج الاتصال في صفحة الدعم</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            آخر تحديث: ٩ فبراير ٢٠٢٥
          </p>
        </div>
      </div>
    </div>
  );
}
