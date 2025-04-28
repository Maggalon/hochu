"use client"

import Image from "next/image";
import Onboarding from "../components/onboarding";
import { useContext, useState } from "react";
import Link from "next/link";
import { List, PlusCircle, Settings, Smile } from "lucide-react";
import { WishlistCard } from "@/components/wishlist-card";
import { Wishlist } from "@/lib/types";
import { TWAContext } from "@/contexts/twa-context";

const wishlists_mock: Wishlist[] = [
  {
    id: "1",
    name: "Birthday Wishlist",
    description: "Things I'd love to receive for my birthday this year",
    coverImage: "",
    items: [
      {
        id: "101",
        name: "Wireless Headphones",
        description: "Sony WH-1000XM4 Noise Cancelling Wireless Headphones",
        referenceLink: "https://example.com/headphones",
        coverImage: "/placeholder.svg?height=200&width=200",
        price: 349.99,
        bookedBy: null,
      },
      {
        id: "102",
        name: "Smart Watch",
        description: "Apple Watch Series 7 with GPS and Cellular",
        referenceLink: "https://example.com/watch",
        coverImage: "/placeholder.svg?height=200&width=200",
        price: 499.99,
        bookedBy: null,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isOwner: true,
    ownerName: "Current User",
    subscriberCount: 3,
  },
  {
    id: "2",
    name: "Holiday Gift Ideas",
    description: "Gift ideas for the holiday season",
    coverImage: "",
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isOwner: true,
    ownerName: "Current User",
    subscriberCount: 0,
  },
]

export default function Home() {

  const [start, setStart] = useState<boolean>(false)
  const [wishlists, setWishlists] = useState<Wishlist[]>(wishlists_mock)

  const context = useContext(TWAContext)
  const webApp = context?.webApp

  if (!start) {
    return (
      <div className="w-full h-full">
        <Onboarding setStart={setStart} />
      </div>
    );
  }

  return (
    <div className="w-screen pb-10 px-5">
      <div className='fixed right-0 top-0 shadow-sm bg-white font-bold p-5 w-full text-2xl flex gap-3 items-center justify-between'>
          <div className="flex items-center gap-3">
            {webApp!.initDataUnsafe.user ? webApp!.initDataUnsafe.user!.photo_url :  <Smile size={48} className='text-[#d4af37] bg-[#d4af37]/20 rounded-full p-2' />}
            {webApp!.initDataUnsafe.user ? webApp!.initDataUnsafe.user!.first_name : "Пользователь"}
          </div>
          <div className="flex items-center gap-3">
            <List size={48} className='text-[#d4af37] rounded-full' />
            <Settings size={48} className='text-[#d4af37] rounded-full' />
          </div>
          
      </div>

      <div className="mt-28 flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Мои вишлисты</h1>
        <Link href="/wishlists/create">
          <button className="p-2 flex gap-2 items-center bg-[#d4af37] text-white text-lg font-bold rounded-md">
            <PlusCircle className="h-8 w-8" />
            <span>Создать</span>
          </button>
        </Link>
      </div>

      {wishlists.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-muted-foreground mb-4">You don't have any wishlists yet</h2>
          <Link href="/wishlists/create">
            <button>Create your first wishlist</button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <WishlistCard key={wishlist.id} wishlist={wishlist} />
          ))}
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Отслеживаемые вишлисты</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll populate this with subscribed wishlists */}
        </div>
      </div>

    </div>
  )
  
}
