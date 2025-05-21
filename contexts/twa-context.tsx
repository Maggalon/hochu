"use client"

import { Subscription, User } from '@/lib/types';
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
    sharedUser: User | undefined;
    subscription: Subscription | undefined;
    createSubscription: () => void;
}

export const TWAContext = createContext<TWAContextProps | undefined>(undefined)

export const TWAProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [webApp, setWebApp] = useState<Telegram["WebApp"]>()
    const [sharedProfileId, setSharedProfileId] = useState<number | undefined>()
    const [subscription, setSubscription] = useState<Subscription | undefined>()
    const [user, setUser] = useState<User>()
    const [sharedUser, setSharedUser] = useState<User | undefined>()

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

    const getSubscription = async () => {
        if (!webApp) return

        const res = await fetch(`/api/subscription?user_id=${sharedProfileId}&sub_id=${user?.id}`)
        const data = await res.json()

        if (data.existingSubscription) {
            setSubscription(data.existingSubscription)
            webApp.showConfirm("Subscription found")
        } else {
            webApp.showAlert(data.error.message)
        }
    }

    const createSubscription = async () => {
        if (!webApp) return

        try {
            const res = await fetch('/api/subscription', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: sharedProfileId,
                    sub_id: user?.id
                })
            })
            const data = await res.json()

            if (data.newSubscription) {
                // Updating user subscriptions count
                const res = await fetch('/api/user', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tg_id: user?.id,
                        subscriptions: user?.subscriptions! + 1
                    })
                })
                const data = await res.json()

                if (data.updatedUser) {
                    setUser(data.updatedUser)
                } else {
                    webApp.showAlert(data.details)
                    return
                }

                // Updating sharedUser subscribers count
                const res2 = await fetch('/api/user', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tg_id: sharedProfileId,
                        subscribers: sharedUser?.subscribers! + 1
                    })
                })
                const data2 = await res2.json()

                if (data2.updatedUser) {
                    setSharedUser(data2.updatedUser)
                } else {
                    webApp.showAlert(data2.details)
                    return
                }

                setSubscription(data.newSubscription)
                webApp.showConfirm("Subscribed successfully")
            } else {
                webApp.showAlert(data.details)
            }
        } catch (e) {
            console.log(e);
            
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

    useEffect(() => {
        if (sharedProfileId && sharedProfileId !== user?.tg_id) {
          getSharedUser()
          getSubscription()
        }
    }, [sharedProfileId])

    return (
        <TWAContext.Provider value={{ webApp, 
                                      sharedProfileId, 
                                      user, 
                                      sharedUser,
                                      subscription,
                                      createSubscription }}>
            {children}
        </TWAContext.Provider>
    )
}