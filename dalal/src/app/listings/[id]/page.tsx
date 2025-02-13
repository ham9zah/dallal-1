import ClientListingDetails from './ClientListingDetails';

export default async function ListingDetails({ params }: { params: { id: string } }) {
  // بيانات تجريبية للإعلان
  const listing = {
    id: params.id,
    title: 'سيارة مرسيدس S-Class 2024 فل كامل مع جميع الإضافات والكماليات للبيع',
    price: '350,000',
    location: 'الرياض',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
      'https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800'
    ],
    category: 'سيارات',
    date: 'منذ يومين',
    condition: 'جديد',
    description: 'سيارة مرسيدس S-Class موديل 2024 فل كامل، المواصفات تشمل...',
    highestBid: '375,000',
    numberOfBids: 5,
    advertiser: {
      name: 'محمد أحمد',
      joinDate: 'عضو منذ 2023'
    },
    tags: ['مرسيدس', 'S-Class', '2024', 'فل كامل', 'سيارات فاخرة'],
    comments: [
      {
        id: 1,
        user: 'أحمد محمد',
        date: 'منذ يوم',
        content: 'هل السيارة ما زالت متوفرة؟',
        name: 'أحمد محمد'
      },
      {
        id: 2,
        user: 'خالد عبدالله',
        date: 'منذ ساعتين',
        content: 'هل يوجد ضمان للسيارة؟',
        name: 'خالد عبدالله'
      },
      {
        id: 3,
        user: 'عبدالرحمن علي',
        date: 'منذ ساعة',
        content: 'هل السعر نهائي؟',
        name: 'عبدالرحمن علي'
      }
    ]
  };

  return <ClientListingDetails listing={listing} />;
}
