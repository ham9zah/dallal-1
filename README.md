# دلال - منصة الإعلانات المبوبة

## نظرة عامة
دلال هي منصة إعلانات مبوبة متكاملة تم تطويرها باستخدام Next.js للواجهة الأمامية و Laravel للخادم.

## المتطلبات الأساسية
- Node.js (v18 أو أحدث)
- PHP (v8.1 أو أحدث)
- Composer
- MySQL (v8.0 أو أحدث)

## التثبيت

### 1. تثبيت الواجهة الأمامية (Next.js)
```bash
cd dalal
npm install
npm run dev
```

### 2. تثبيت الخادم (Laravel)
```bash
cd api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
```

### 3. تثبيت قاعدة البيانات
```bash
# استيراد قاعدة البيانات
mysql -u root -p dallal < database/dallal.sql
```

## المستخدمين الافتراضيين

1. المشرف:
   * البريد: admin@dallal.com
   * كلمة المرور: Admin123456

2. المدير:
   * البريد: manager@dallal.com
   * كلمة المرور: Manager123456

3. المستخدم العادي:
   * البريد: user@dallal.com
   * كلمة المرور: User123456

## هيكل المشروع
```
dallal/
├── api/              # مشروع Laravel (الخادم)
├── dalal/            # مشروع Next.js (الواجهة الأمامية)
├── database/         # نسخ قاعدة البيانات
└── README.md
```

## الميزات الرئيسية
- نظام مصادقة متكامل
- لوحة تحكم للمشرفين
- إدارة الإعلانات
- نظام للأدوار والصلاحيات
- واجهة مستخدم عربية
