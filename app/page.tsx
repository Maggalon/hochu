"use client"

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Edit, List, Plus, PlusCircle, Settings, Share, Smile } from "lucide-react";
import { WishlistCard } from "@/components/wishlist-card";
import { User, Wishlist } from "@/lib/types";
import { TWAContext } from "@/contexts/twa-context";
import { WishItem } from "@/components/wish-item";
import { Header } from "@/components/header";

const test_user_info = {
  id: 972737130,
  name: "Георгий",
  image_url: "https://t.me/i/userpic/320/mgIFxxSdhNUauSY0_rBsNFukIPTIJ4DAI1AUi-vGW0s.svg",
  wishes: 18,
  subscribers: 18,
  subscriptions: 18,
}

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

  const [wishlists, setWishlists] = useState<Wishlist[]>(wishlists_mock)
  const [tab, setTab] = useState<"wishes" | "wishlists">("wishes")
  const [sharedUser, setSharedUser] = useState<User | undefined>()

  const context = useContext(TWAContext)
  const webApp = context?.webApp
  const sharedProfileId = context?.sharedProfileId
  const user = context?.user

  const getSharedUser = async () => {
    const res = await fetch(`/api/user?id=${sharedProfileId}`)
    const data = await res.json()

    if (data.existingUser) {
        console.log("Existing user:")
        console.log(data.existingUser);
        setSharedUser(data.existingUser)
    } else {
        webApp?.showAlert(data.error.message)
    }
  }

  useEffect(() => {
    if (sharedProfileId && sharedProfileId !== user?.tg_id) {
      getSharedUser()
    }
  }, [sharedProfileId])


  return (
    <div className="w-screen pb-10 px-5">
      {sharedUser && sharedProfileId !== user?.tg_id ?
        <Header user={sharedUser} type="shared" tab={tab} setTab={setTab} /> :
        <Header user={user} type="direct" tab={tab} setTab={setTab} />
      }

      {tab === "wishes" &&
        <div className="mt-80 flex flex-col gap-4">
          <WishItem />
          <WishItem />
        </div>
      }
      
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
