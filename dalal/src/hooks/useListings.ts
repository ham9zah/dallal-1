import { useState } from 'react'

type Listing = {
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

// بيانات تجريبية
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'فيلا فاخرة للبيع',
    description: 'فيلا حديثة في حي النرجس',
    price: 2500000,
    category: 'عقارات',
    condition: 'جديد',
    city: 'الرياض',
    images: ['https://example.com/image1.jpg'],
    userId: '1',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'سيارة مرسيدس S-Class 2024',
    description: 'سيارة فاخرة بحالة ممتازة',
    price: 350000,
    category: 'سيارات',
    condition: 'مستعمل',
    city: 'جدة',
    images: ['https://example.com/image2.jpg'],
    userId: '1',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export function useListings() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchListings = async ({
    query,
    category,
    city,
    condition
  }: {
    query?: string
    category?: string
    city?: string
    condition?: string
  }) => {
    try {
      setLoading(true)
      setError(null)

      let results = [...mockListings]

      if (category) {
        results = results.filter(listing => listing.category === category)
      }

      if (city) {
        results = results.filter(listing => listing.city === city)
      }

      if (condition) {
        results = results.filter(listing => listing.condition === condition)
      }

      if (query) {
        const searchQuery = query.toLowerCase()
        results = results.filter(listing =>
          listing.title.toLowerCase().includes(searchQuery) ||
          listing.description.toLowerCase().includes(searchQuery)
        )
      }

      return results
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ ما')
      return []
    } finally {
      setLoading(false)
    }
  }

  const createListing = async (listing: Omit<Listing, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true)
      setError(null)

      // محاكاة إنشاء إعلان جديد
      const newListing: Listing = {
        id: Math.random().toString(),
        ...listing,
        userId: '1',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockListings.push(newListing)
      return newListing
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ ما')
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    searchListings,
    createListing
  }
}
