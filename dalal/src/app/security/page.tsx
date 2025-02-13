import React from 'react';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الأمان والحماية</h1>
          <p className="text-lg text-gray-600">إرشادات وتدابير الأمان لحماية حسابك</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">١. كلمة المرور القوية</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>استخدام ٨ أحرف على الأقل</li>
              <li>مزيج من الأحرف الكبيرة والصغيرة</li>
              <li>تضمين أرقام ورموز خاصة</li>
              <li>تجنب المعلومات الشخصية المعروفة</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٢. التحقق بخطوتين</h2>
            <p className="text-gray-700 leading-relaxed">
              نوصي بتفعيل خاصية التحقق بخطوتين لتوفير طبقة إضافية من الحماية لحسابك.
              يمكنك اختيار استلام رمز التحقق عبر:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تطبيق المصادقة</li>
              <li>رسالة نصية SMS</li>
              <li>البريد الإلكتروني</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٣. مراقبة النشاط</h2>
            <p className="text-gray-700 leading-relaxed">
              راقب نشاط حسابك بانتظام وتحقق من:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>عمليات تسجيل الدخول الأخيرة</li>
              <li>الأجهزة المتصلة بحسابك</li>
              <li>التنبيهات الأمنية</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٤. الإبلاغ عن المشاكل</h2>
            <p className="text-gray-700 leading-relaxed">
              في حال ملاحظة أي نشاط مشبوه، يرجى:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تغيير كلمة المرور فوراً</li>
              <li>الاتصال بفريق الدعم</li>
              <li>تسجيل الخروج من جميع الأجهزة</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
