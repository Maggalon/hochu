"use client"

import Image from "next/image";
import { useContext, useState } from "react";
import Link from "next/link";
import { Edit, List, Plus, PlusCircle, Settings, Smile } from "lucide-react";
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

const active_tab_styles = "border-3 font-bold border-accent-text rounded-2xl p-2 w-1/2 flex items-center justify-center text-accent-text"
const inactive_tab_styles = "border-2 border-hint rounded-2xl p-2 w-1/2 flex items-center justify-center text-hint"

export default function Home() {

  const [wishlists, setWishlists] = useState<Wishlist[]>(wishlists_mock)
  const [tab, setTab] = useState<"wishes" | "wishlists">("wishes")

  const context = useContext(TWAContext)
  const webApp = context?.webApp

  return (
    <div className="w-screen pb-10 px-5">
      <div className='fixed right-0 top-0 z-50 bg-secondary-background p-5 w-full flex flex-col gap-5 items-center justify-center'>
          <div className="w-full flex items-center justify-between gap-3">
            <div>{webApp?.initDataUnsafe && webApp!.initDataUnsafe.user?.photo_url ? <Image src={webApp!.initDataUnsafe.user!.photo_url!} alt={"Profile pic"} width={96} height={96} className="rounded-full" /> :  <Smile size={96} className='text-accent-text bg-accent-text/20 rounded-full p-2' />}</div>
            <div className="flex flex-col flex-1 w-full gap-4">
              <div className="flex items-center justify-between font-bold text-2xl">
                <span className="text-text">{webApp?.initDataUnsafe && webApp!.initDataUnsafe.user ? webApp!.initDataUnsafe.user!.first_name : "Пользователь"}</span>
                <Edit className="text-accent-text" />
              </div>
              <div className="flex text-sm gap-2 justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">18</span>
                  <span className="text-text">Желания</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">18</span>
                  <span className="text-text">Подписчики</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">18</span>
                  <span className="text-text">Подписки</span>
                </div>
              </div>
            </div>
            
            
          </div>
          <button className="w-full text-2xl font-bold flex items-center justify-center gap-2 bg-button text-button-text p-3 rounded-3xl"><Plus size={32} />Добавить желание</button>
          <div className="w-full flex items-center justify-between gap-2">
            <div onClick={() => {setTab("wishes")}} className={tab === "wishes" ? active_tab_styles : inactive_tab_styles}>Желания</div>
            <div onClick={() => {setTab("wishlists")}} className={tab === "wishlists" ? active_tab_styles : inactive_tab_styles}>Вишлисты</div>
          </div>
      </div>

      {/* <div className="mt-28 flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Мои вишлисты</h1>
        <Link href="/wishlists/create">
          <button className={`p-2 flex gap-2 items-center bg-button text-white text-lg font-bold rounded-md`}>
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

        </div>
      </div> */}

    </div>
  )
  
}
