export interface Wishlist {
    id: string
    name: string
    description: string | null
    coverImage: string | null
    items: WishlistItem[]
    createdAt: string
    updatedAt: string
    isOwner: boolean
    ownerName: string
    subscriberCount: number
  }
  
  export interface WishlistItem {
    id: string
    name: string
    description: string | null
    referenceLink: string | null
    coverImage: string | null
    price: number | null
    bookedBy: string | null
  }