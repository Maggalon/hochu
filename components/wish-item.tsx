"use client"

import { ArrowUpRight, ChevronDown, ChevronUp, Gift, Trash } from "lucide-react"
import { useState } from "react"


export const WishItem = () => {

    const [showDescription, setShowDescription] = useState<boolean>(false)

    return (
        <div className="flex flex-col w-full p-4 rounded-2xl gap-10 bg-section-background">
            <div className="flex w-full gap-5 items-start">
                <div className="border border-accent-text/50 rounded-2xl w-1/3 flex items-center justify-center bg-section-background"><Gift size={96} className="fill-accent-text/20 text-section-background" /></div>
                <div className="flex flex-col w-2/3">
                    <div className="flex w-full items-start justify-between text-text">
                        <div className="font-bold text-lg w-full">Название подарка</div>
                        <Trash className="text-destructive-text" size={32} />
                    </div>
                    <div onClick={() => setShowDescription(!showDescription)} className="flex items-center text-hint">{showDescription ? "Свернуть" : "Развернуть"} описание {showDescription ? <ChevronUp /> : <ChevronDown />}</div>
                    {showDescription && <div className="text-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor, odio ac pulvinar gravida, urna felis blandit urna, vitae bibendum nulla urna rhoncus orci.</div>}
                </div>
            </div>
            <div className="flex w-full gap-2">
                <button className="w-1/3 text-sm border-2 border-button rounded-2xl p-2 flex items-center justify-center text-button bg-section-background">В магазин <ArrowUpRight /></button>
                <button className="w-2/3 bg-button text-button-text font-bold p-2 rounded-2xl">Редактировать</button>
            </div>
        </div>
    )
}