"use client"

import { Check, Save } from "lucide-react"
import { useState } from "react"

export default function Settings() {

    const [bookedDisplay, setBookedDisplay] = useState<"hide" | "show">("show")
    const [userName, setUserName] = useState<string>("Пользователь")
    const [changeUserName, setChangeUserName] = useState<boolean>(false)


    return (
        <div className="w-screen p-5 flex flex-col items-center">
            <div className="text-text text-2xl font-bold mb-10">Настройки</div>
            <div className="w-full flex flex-col items-start gap-1">
                <div className="ml-3 text-section-header-text">ДАННЫЕ ПРОФИЛЯ</div>
                <div className="w-full p-4 rounded-2xl bg-section-background flex flex-col gap-5">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                            <div className="font-bold text-hint">Имя в приложении</div>
                            <input type="text" value={userName} disabled={!changeUserName} onChange={e => setUserName(e.target.value)} id="name-input" className={`py-1 px-2 ${!changeUserName ? "border-b" : "border-b-3"} border-${changeUserName ? "accent-text" : "hint"} text-text text-base w-full focus:outline-none`} />
                        </div>
                        <div onClick={() => setChangeUserName(true)} className="font-bold text-accent-text">Изменить</div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-col">
                            <div className="font-bold text-hint">День рождения</div>
                            <div className="text-text">(Не указан)</div>
                        </div>
                        <div className="font-bold text-accent-text">Изменить</div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-start gap-1 mt-5">
                <div className="ml-3 text-section-header-text">ЗАБРОНИРОВАННЫЕ ЖЕЛАНИЯ</div>
                <div className="w-full p-4 rounded-2xl bg-section-background flex flex-col gap-5">
                    <div onClick={() => setBookedDisplay("hide")}  className="flex w-full items-center justify-start gap-4">
                        <div className="flex items-center justify-center"><div className={`w-5 h-5 bg-${bookedDisplay === "hide" ? "accent-text" : "section-background"} rounded-full border-3 border-section-background ring-2 ring-accent-text`}></div></div>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-text">Скрыть</div>
                            <div className="text-hint text-sm">Вы не будете видеть, если кто-то забронировал ваши желания</div>
                        </div>
                    </div>
                    <div onClick={() => setBookedDisplay("show")}  className="flex w-full items-center justify-start gap-4">
                        <div className="flex items-center justify-center"><div className={`w-5 h-5 bg-${bookedDisplay === "show" ? "accent-text" : "section-background"} rounded-full border-3 border-section-background ring-2 ring-accent-text`}></div></div>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold text-text">Показать анонимно</div>
                            <div className="text-hint text-sm">Вы будете видеть, если кто-то забронировал ваши желания</div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="mt-5 w-full text-xl font-bold flex items-center justify-center gap-2 bg-button text-button-text p-3 rounded-2xl"><Save size={32} />Сохранить</button>
        </div>
    )
}