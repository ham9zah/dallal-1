import React from 'react';

export default function ProhibitedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">المحتوى والسلوك المحظور</h1>
          <p className="text-lg text-gray-600">قائمة بالممارسات والمحتويات غير المسموح بها في منصتنا</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">١. المحتوى المحظور</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>المحتوى غير القانوني</li>
              <li>المحتوى الإباحي أو غير الأخلاقي</li>
              <li>محتوى العنف والكراهية</li>
              <li>المعلومات المضللة والكاذبة</li>
              <li>انتهاك حقوق الملكية الفكرية</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٢. السلوك المحظور</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>التحرش والإساءة للآخرين</li>
              <li>انتحال شخصيات الآخرين</li>
              <li>التلاعب بالنظام</li>
              <li>إنشاء حسابات وهمية</li>
              <li>نشر الرسائل المزعجة (السبام)</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٣. الأنشطة التجارية المحظورة</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>بيع المنتجات المقلدة</li>
              <li>الاحتيال المالي</li>
              <li>التسويق الهرمي</li>
              <li>بيع المنتجات المحظورة قانونياً</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٤. الأرقام المحظورة</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>أرقام الهواتف المزيفة أو المسروقة</li>
              <li>أرقام الهواتف المستخدمة في عمليات الاحتيال</li>
              <li>أرقام الهواتف المرتبطة بحسابات مخالفة سابقة</li>
              <li>أرقام الهواتف المستخدمة في إرسال رسائل مزعجة</li>
              <li>أرقام الهواتف غير المسجلة رسمياً</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٥. عواقب المخالفة</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>تعليق الحساب مؤقتاً</li>
              <li>حظر الحساب نهائياً</li>
              <li>إزالة المحتوى المخالف</li>
              <li>الإبلاغ عن المخالفات القانونية للسلطات المختصة</li>
            </ul>
          </section>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              ملاحظة هامة: هذه القائمة قد لا تكون شاملة لجميع المحظورات. نحتفظ بالحق في تحديث هذه القائمة وفقاً لتقديرنا.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
