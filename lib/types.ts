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

export interface User {
  id: number;
  tg_id: number;
  name: string;
  img_url: string;
  birthday: string | null;
  subscribers: number;
  subscriptions: number;
  show_booked: boolean;
  created_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  subscriber_id: number;
}