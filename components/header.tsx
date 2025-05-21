"use client"

import { TWAContext } from "@/contexts/twa-context";
import { User } from "@/lib/types"
import { Edit, Plus, Share, Smile } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";

interface HeaderProps {
    user: User;
    type: "direct" | "shared";
    tab: "wishes" | "wishlists";
    setTab: (tab: "wishes" | "wishlists") => void;
}

const active_tab_styles = "border-3 font-bold border-accent-text rounded-2xl p-1 w-1/2 flex items-center justify-center text-accent-text"
const inactive_tab_styles = "border-2 border-hint rounded-2xl p-1 w-1/2 flex items-center justify-center text-hint"

export const Header: React.FC<HeaderProps> = ({ user, type, tab, setTab }) => {

    const context = useContext(TWAContext)
    const webApp = context?.webApp

    const shareProfile = () => {
        try {
            const shareUrl = `https://t.me/hf_hochu_bot?startapp=profile_${webApp?.initDataUnsafe.user?.id}`
            webApp?.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`)
        } catch(e) {
            webApp?.showAlert(String(e))
        }
        
    }

    return (
        <div className='fixed right-0 top-0 z-50 bg-section-background p-5 w-full flex flex-col gap-5 items-center justify-center'>
          <div className="w-full flex items-center justify-between gap-3">
            <div>{user?.img_url ? <Image src={user.img_url} alt={"Profile pic"} width={96} height={96} className="rounded-full" /> : <Smile size={96} className='text-accent-text bg-accent-text/20 rounded-full p-2' />}</div>
            <div className="flex flex-col flex-1 w-full gap-4">
              <div className="flex items-center justify-between font-bold text-2xl">
                <span className="text-text">{user.name}</span>
                {type === "direct" && <Link href={'/settings'}><Edit className="text-accent-text" /></Link>}
              </div>
              <div className="flex text-sm gap-2 justify-between">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">18</span>
                  <span className="text-text">Желания</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">{user.subscribers}</span>
                  <span className="text-text">Подписчики</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-text">{user.subscriptions}</span>
                  <span className="text-text">Подписки</span>
                </div>
              </div>
            </div>
            
            
          </div>
          {type === "direct" && 
            <div className="w-full flex gap-2">
                <button className="w-5/6 text-2xl font-bold flex items-center justify-center gap-2 bg-button text-button-text p-3 rounded-2xl"><Plus size={32} />Добавить желание</button>
                <button onClick={shareProfile} className="w-1/6 flex justify-center items-center border-2 border-button rounded-2xl"><Share className="text-button" /></button>
            </div>
          }
          {type === "shared" && 
            <div className="w-full flex gap-2">
                <button className="w-full text-2xl font-bold flex items-center justify-center gap-2 bg-button text-button-text p-3 rounded-2xl">Подписаться</button>
            </div>
          }
          <div className="w-full flex items-center justify-between gap-2 mt-8">
            <div onClick={() => {setTab("wishes")}} className={tab === "wishes" ? active_tab_styles : inactive_tab_styles}>Желания</div>
            <div onClick={() => {setTab("wishlists")}} className={tab === "wishlists" ? active_tab_styles : inactive_tab_styles}>Вишлисты</div>
          </div>
      </div>
    )
}