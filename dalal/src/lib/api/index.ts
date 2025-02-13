// أنواع البيانات
export type User = {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  createdAt: Date
  updatedAt: Date
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
}

export type Listing = {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: string
  city: string
  images: string[]
  userId: string
  status: 'active' | 'sold' | 'deleted'
  createdAt: Date
  updatedAt: Date
}

// واجهة برمجة المستخدمين
export const usersApi = {
  // جلب معلومات المستخدم الحالي
  getCurrentUser: async () => {
    return {
      id: '1',
      name: 'مستخدم تجريبي',
      email: 'test@example.com',
      phone: '0500000000',
      city: 'الرياض',
      createdAt: new Date(),
      updatedAt: new Date()
    } as User
  },

  // تحديث معلومات المستخدم
  updateProfile: async (data: Partial<User>) => {
    return {
      id: '1',
      name: data.name || 'مستخدم تجريبي',
      email: data.email || 'test@example.com',
      phone: data.phone || '0500000000',
      city: data.city || 'الرياض',
      createdAt: new Date(),
      updatedAt: new Date()
    } as User
  }
}

// واجهة برمجة الأقسام
export const categoriesApi = {
  // جلب جميع الأقسام
  getAll: async () => {
    return [
      { id: '1', name: 'سيارات', slug: 'cars', description: 'سيارات للبيع' },
      { id: '2', name: 'عقارات', slug: 'real-estate', description: 'عقارات للبيع والإيجار' },
      { id: '3', name: 'إلكترونيات', slug: 'electronics', description: 'أجهزة إلكترونية' }
    ] as Category[]
  },

  // جلب قسم محدد
  getBySlug: async (slug: string) => {
    const categories = {
      'cars': { id: '1', name: 'سيارات', slug: 'cars', description: 'سيارات للبيع' },
      'real-estate': { id: '2', name: 'عقارات', slug: 'real-estate', description: 'عقارات للبيع والإيجار' },
      'electronics': { id: '3', name: 'إلكترونيات', slug: 'electronics', description: 'أجهزة إلكترونية' }
    }
    return categories[slug] as Category
  }
}

// واجهة برمجة الإعلانات
export const listingsApi = {
  // جلب جميع الإعلانات
  getAll: async () => {
    return [
      {
        id: '1',
        title: 'سيارة تويوتا كامري 2022',
        description: 'سيارة بحالة ممتازة',
        price: 80000,
        category: 'cars',
        condition: 'مستعمل',
        city: 'الرياض',
        images: ['https://example.com/car1.jpg'],
        userId: '1',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ] as Listing[]
  },

  // جلب إعلان محدد
  getById: async (id: string) => {
    return {
      id,
      title: 'سيارة تويوتا كامري 2022',
      description: 'سيارة بحالة ممتازة',
      price: 80000,
      category: 'cars',
      condition: 'مستعمل',
      city: 'الرياض',
      images: ['https://example.com/car1.jpg'],
      userId: '1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    } as Listing
  },

  // إنشاء إعلان جديد
  create: async (data: Omit<Listing, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    return {
      ...data,
      id: Math.random().toString(),
      userId: '1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    } as Listing
  },

  // تحديث إعلان
  update: async (id: string, data: Partial<Listing>) => {
    return {
      id,
      title: data.title || 'سيارة تويوتا كامري 2022',
      description: data.description || 'سيارة بحالة ممتازة',
      price: data.price || 80000,
      category: data.category || 'cars',
      condition: data.condition || 'مستعمل',
      city: data.city || 'الرياض',
      images: data.images || ['https://example.com/car1.jpg'],
      userId: '1',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    } as Listing
  },

  // حذف إعلان
  delete: async (id: string) => {
    return { success: true }
  },

  // البحث في الإعلانات القريبة
  searchNearby: async () => {
    return [] as Listing[]
  }
}
