"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Nav from "@/app/src/nav";
import Image from "next/image";
import { app } from "@/app/src/firebase";

function LoginUI() {
  const [data, setData] = useState<{
    email: string;
    password: string;
    address: string;
  }>({
    email: "",
    password: "",
    address: "",
  });

  async function loginEmail() {
    await signInWithEmailAndPassword(getAuth(app), data.email, data.password);
  }

  useEffect(() => {
    // @ts-ignore
    if (typeof window.ethereum !== "undefined") {
      //@ts-ignore
      const newWeb3 = new Web3(window.ethereum);
      //@ts-ignore
      setWeb3(newWeb3);

      //@ts-ignore
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        //@ts-ignore
        .then((accounts) => {
          console.log("Connected to Metamask");
          console.log("Metamask accounts:", accounts);
        })
        //@ts-ignore
        .catch((error) => {
          console.error("Metamask connection error:", error);
        }); //@ts-ignore
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("Metamask network changed:", chainId);
      });
      return () => {
        //@ts-ignore
        window.ethereum.removeAllListeners("chainChanged");
      };
    } else {
      console.error("Metamask is not installed.");
    }
  }, []);

  return (
    <div className="text-black">
      <div className="h-[70px] r ounded-[50px] bg-[#F8F8F8] flex flex-row">
        <Image src="user.svg" alt="Email" width={35} height={40} />
        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="h-[70px] rounded-[50px] bg-[#F8F8F8]">
        <Image src="key.svg" alt="Key" width={35} height={40} />
        <input
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          placeholder="Password"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <button onClick={loginEmail}>Login</button>
    </div>
  );
}

function RegisterUI() {
  const [data, setData] = useState<{
    username: string;
    email: string;
    password: string;
    wallet: string;
  }>({ username: "", email: "", password: "", wallet: "" });

  async function register() {
    let user = await createUserWithEmailAndPassword(
      getAuth(app),
      data.email,
      data.password
    );

    updateProfile(user.user, {
      displayName: data.username,
    });
    await fetch("http://localhost:5001/signup", {
      body: JSON.stringify({
        username: data.username,
        address: data.address,
      }),
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
    });
  }

  return (
    <div>
      {JSON.stringify(data)}
      <div className="h-[70px] rounded-[50px] bg-[#F8F8F8]">
        <Image src="user.svg" alt="Username" width={35} height={40} />
        <input
          value={data.username}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, username: e.target.value }))
          }
          placeholder="Username"
          className="bg-transparent outline-none w-full text-black"
        />
      </div>
      <div className="h-[70px] rounded-[50px] bg-[#F8F8F8]">
        <Image src="user.svg" alt="Email" width={35} height={40} />
        <input
          type="email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          placeholder="Email"
          className="bg-transparent outline-none w-full text-black"
        />
      </div>
      <div className="h-[70px] rounded-[50px] bg-[#F8F8F8]">
        <Image src="key.svg" alt="Key" width={35} height={40} />
        <input
          type="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          placeholder="Password"
          className="bg-transparent outline-none text-black w-[80vw] px-2"
        />
      </div>
      <div className="h-[70px] rounded-[50px] bg-[#F8F8F8]">
        <Image src="key.svg" alt="Key" width={35} height={40} />
        <input
          type="text"
          value={data.address}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, address: e.target.value }))
          }
          placeholder="Wallet Address"
          className="bg-transparent outline-none text-black w-[80vw] px-2"
        />
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default function Login() {
  const [auth, setAuth] = useState(false);
  const [check, setCheck] = useState<any>(false);

  onAuthStateChanged(getAuth(app), (user) => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav auth={auth} page="Login" />
      <div className="items-center justify-center flex flex-col space-y-6">
        <h1 className="font-extrabold text-6xl">Welcome Back</h1>
        <p className="text-xl font-normal">
          {" "}
          Get ready to level up your procrastination
        </p>
        <div>
          {check ? (
            <button onClick={() => setCheck(false)}>Login</button>
          ) : (
            <button onClick={() => setCheck(true)}>Register</button>
          )}
        </div>
        {check && <LoginUI />}
        {!check && <RegisterUI />}
      </div>
    </div>
  );
}
