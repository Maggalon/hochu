"use client"

import { Wishlist } from "@/lib/types"
import { Gift } from "lucide-react"
import Image from "next/image"

interface WishlistCardProps {
    wishlist: Wishlist
}

export const WishlistCard = ({ wishlist }: WishlistCardProps) => {
    return (
        <div className="rounded-lg border border-black">
            <div className="relative h-48 w-full">
                <Image
                    src={wishlist.coverImage || "/hochu-wishlist-alt.png"}
                    alt={wishlist.name}
                    fill
                    className="object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg line-clamp-1">{wishlist.name}</h3>
                    <div className="flex items-center justify-center gap-1 border rounded-full w-10">
                        <Gift className="h-3 w-3" />
                        {wishlist.items.length}
                    </div>
                </div>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{wishlist.description}</p>
            </div>
            <div className="p-4 pt-0 text-xs text-muted-foreground">
                Создан {new Date(wishlist.createdAt).toLocaleDateString()}
            </div>
        </div>
    )
}