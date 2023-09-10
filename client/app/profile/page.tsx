"use client"
import { app } from "@/app/src/firebase"
import { useEffect, useState } from "react"
import { initializeAnalytics, isSupported } from "firebase/analytics"
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { useRouter, NextRouter } from "next/navigation"
import Nav from "../src/nav"

export default function Profile() {

    const [u, setU] = useState<boolean>(false)

    onAuthStateChanged(getAuth(), (user) => {
        if(user) {
            setU(true)
        } else {
            setU(false)
        }
    }) 

    let router: NextRouter = useRouter()

    useEffect(() => {
        isSupported()
            .then(s => {
                if(s) {
                    initializeAnalytics(app)
                }
            })
    }, [])

    return (
        <div className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
            <Nav auth={u} page='Login' />
            <button onClick={() => {
                signOut(getAuth(app))
                router.push("/login")
            }}>
                Sign Out
            </button>
        </div>
    )
}