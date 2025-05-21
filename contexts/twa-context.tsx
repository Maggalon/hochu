"use client"

import { User } from '@/lib/types';
import { Telegram } from '@twa-dev/types';
import { createContext, useEffect, useState } from 'react';

declare global {
    interface Window {
      Telegram: Telegram;
    }
}

interface TWAContextProps {
    webApp: Telegram["WebApp"] | undefined;
    sharedProfileId: number | undefined;
    user: User | undefined;
}

export const TWAContext = createContext<TWAContextProps | undefined>(undefined)

export const TWAProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [webApp, setWebApp] = useState<Telegram["WebApp"]>()
    const [sharedProfileId, setSharedProfileId] = useState<number | undefined>()
    const [user, setUser] = useState<User>()

    const getWebApp = async () => {
        const webApp = await waitForWebApp() as Telegram["WebApp"]
        webApp.ready()
        setWebApp(webApp)
        console.log(webApp);
        if (webApp.initDataUnsafe.start_param) {
            if (webApp.initDataUnsafe.start_param.startsWith("profile_")) {
                setSharedProfileId(Number(webApp.initDataUnsafe.start_param.split("_")[1]))
            }
        }
        
    }

    const getUser = async () => {
        if (!webApp) return

        const res = await fetch(`/api/user?id=${webApp.initDataUnsafe.user?.id}`)
        const data = await res.json()

        // if (data.error) webApp.showAlert(data.error)
        // console.log(data.error)
        
        if (data.existingUser) {
            console.log("Existing user:")
            console.log(data.existingUser);
            setUser(data.existingUser)
            webApp.showConfirm("User fetched successfully")
        } else if (data.error.code === "PGRST116") {
            initializeUser()
        } else {
            webApp.showAlert(data.error.message)
        }
    }

    const initializeUser = async () => {
        if (!webApp) return

        const res = await fetch('/api/user', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tg_id: webApp.initDataUnsafe.user?.id,
                name: webApp.initDataUnsafe.user?.first_name,
                img_url: webApp.initDataUnsafe.user?.photo_url,
                type: 'init'
            })
        })
        const data = await res.json()

        if (data.error) webApp.showAlert(data.error + ", " + data.details)

        if (data.newUser) {
            console.log("New user:")
            console.log(data.newUser);
            setUser(data.newUser)
            webApp.showConfirm("User created successfully")
        }
    }

    const waitForWebApp = () => {
        return new Promise((resolve) => {
            if (window.Telegram?.WebApp) {
                resolve(window.Telegram.WebApp);
            } else {
                const interval = setInterval(() => {
                    if (window.Telegram?.WebApp) {
                        clearInterval(interval);
                        resolve(window.Telegram.WebApp);
                    }
                }, 100);
            }
        });
    };

    useEffect(() => {
        getWebApp()
    }, [])

    useEffect(() => {
        if (webApp) {
            getUser()
        }
    }, [webApp])

    return (
        <TWAContext.Provider value={{ webApp, sharedProfileId, user }}>
            {children}
        </TWAContext.Provider>
    )
}