"use client"

import { useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Nav from '@/app/src/nav';
import Image from 'next/image';
import { app } from '../src/firebase';

function LoginUI() {
    return (
        <div>
            <div className='h-[70px] rounded-[50px] bg-[#F8F8F8]'>
                <Image src="user.svg" alt='Email' width={35} height={40}  />
                <input placeholder='Email' className='bg-transparent outline-none w-full' />
            </div>
            <div className='h-[70px] rounded-[50px] bg-[#F8F8F8]'>
                <Image src="key.svg" alt="Key" width={35} height={40} />
                <input placeholder='Password' className='bg-transparent outline-none w-full' />
            </div>
        </div>
    )
}

function RegisterUI() {
    return (
        <div className='w-full'>
            <div className='flex flex-row h-[70px] rounded-[50px] bg-[#F8F8F8]'>
                <input placeholder='Username' className='bg-transparent outline-none w-full' />
                <Image src="user.svg" alt='Email' width={35} height={40}  />
            </div>
            <div className='flex flex-row h-[70px] rounded-[50px] bg-[#F8F8F8]'>
                <Image src="user.svg" alt='Email' width={35} height={40}  />
                <input placeholder='Email' className='bg-red-300 outline-none w-[900px]' />
            </div>
            <div className='flex flex-row h-[70px] rounded-[50px] bg-[#F8F8F8]'>
                <Image src="key.svg" alt="Key" width={35} height={40} />
                <input placeholder='Password' className='bg-transparent outline-none w-[900px]' />
            </div>
        </div>
    )
}

export default function Login() {

    const [auth, setAuth] = useState(false);
    const [curPage, setCurPage] = useState("Register");

    onAuthStateChanged(getAuth(app), (user) => {
        if (user) {
        setAuth(true);
        } else {
        setAuth(false);
        }
    });
    return (
        <div className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
            {curPage}
            <Nav auth={auth} page='Login' />
            <div className='items-center justify-center flex flex-col space-y-6'>
                <h1 className='font-extrabold text-6xl'>Welcome Back</h1>
                <p className='text-xl font-normal'> Get ready to level up your procrastination</p>
                <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex">
                    <button onClick={() => setCurPage("Login")} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 ${curPage == "Login" ? "active" : ""}`} id="grid">
                        <span>Login</span>
                    </button>
                    <button onClick={() => setCurPage("Register")} className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2 ${curPage == "Register" ? "active" : ""}`} id="list">
                        <span>Register</span>
                    </button>
                </div>
                {curPage == "Login" && <LoginUI />}
                {curPage == "Register" && <RegisterUI />}
            </div>
        </div>
    )
}