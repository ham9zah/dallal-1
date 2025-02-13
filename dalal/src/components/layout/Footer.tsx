'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = [
  {
    title: 'خدمات المنصة',
    links: [
      { text: 'حساب و سداد رسوم الموقع', href: '/fees' },
      { text: 'العروض المميزة', href: '/featured' },
      { text: 'الاشتراك السنوي للمتجر', href: '/store-subscription' },
      { text: 'زيادة مشاهدات العروض', href: '/boost-views' },
    ]
  },
  {
    title: 'الأمان والخصوصية',
    links: [
      { text: 'اتفاقية الاستخدام', href: '/terms' },
      { text: 'توثيق العضوية و إضافة التراخيص', href: '/verification' },
      { text: 'مركز الأمان', href: '/security' },
      { text: 'سياسة الخصوصية', href: '/privacy' },
    ]
  },
  {
    title: 'معلومات مهمة',
    links: [
      { text: 'نظام التقييم', href: '/rating' },
      { text: 'نظام الخصم', href: '/discount' },
      { text: 'الحسابات والأرقام الموقوفة', href: '/suspended' },
      { text: 'قائمة السلع والعروض الممنوعة', href: '/prohibited' },
      { text: 'الأسئلة الشائعة', href: '/faq' },
      { text: 'اتصل بنا', href: '/contact' },
    ]
  }
];

const socialLinks = [
  { name: 'twitter', icon: '/icons/twitter.svg', href: '#' },
  { name: 'tiktok', icon: '/icons/tiktok.svg', href: '#' },
  { name: 'snapchat', icon: '/icons/snapchat.svg', href: '#' },
  { name: 'instagram', icon: '/icons/instagram.svg', href: '#' },
  { name: 'facebook', icon: '/icons/facebook.svg', href: '#' },
  { name: 'youtube', icon: '/icons/youtube.svg', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      {/* القسم الرئيسي */}
      <div className="max-w-[1600px] mx-auto px-4 lg:px-40 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-[15px] text-gray-600 hover:text-[#f5ca58] transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* وسائل التواصل الاجتماعي */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#f5ca58] transition-colors group"
                  title={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 group-hover:brightness-0 group-hover:invert transition-all"
                  />
                </Link>
              ))}
            </div>
            
            {/* حقوق النشر */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-500 text-center">
                جميع الحقوق محفوظة © {currentYear} دلال
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
