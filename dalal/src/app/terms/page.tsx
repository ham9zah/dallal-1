import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">الشروط والأحكام</h1>
          <p className="text-lg text-gray-600">يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصتنا</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-8 space-y-6 text-right">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">١. مقدمة</h2>
            <p className="text-gray-700 leading-relaxed">
              مرحباً بكم في منصتنا. باستخدامكم لهذه المنصة، فإنكم توافقون على الالتزام بهذه الشروط والأحكام.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٢. شروط الاستخدام</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>يجب أن يكون عمر المستخدم ١٨ عاماً أو أكثر</li>
              <li>يجب استخدام معلومات صحيحة عند التسجيل</li>
              <li>يجب الحفاظ على سرية معلومات الحساب</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٣. الخصوصية</h2>
            <p className="text-gray-700 leading-relaxed">
              نحن نحترم خصوصيتكم ونلتزم بحماية بياناتكم الشخصية وفقاً لسياسة الخصوصية الخاصة بنا.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">٤. التعديلات</h2>
            <p className="text-gray-700 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم إخطار المستخدمين بأي تغييرات جوهرية.
            </p>
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
