"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { app } from '@/src/firebase';
import { getAnalytics, initializeAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'


function Nav({ auth }: { auth: boolean }) {
  return (
    <div className='ml-auto gap-8 items-start inline-flex pt-10 pr-10'>
      <Link href="/">
          Home
        </Link>
        <Link href="/leaderboard">
          Leaderboard
        </Link>
        {auth && (
          <Link href="/profile">
            Profile
          </Link>
        )}
        {!auth && (
          <Link href="/login">
            Login
          </Link>
        )}
       
    </div>
  )
}
export default function Home() {

  const [auth, setAuth] = useState(false);

  onAuthStateChanged(getAuth(), (user) => {
    if(user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  })

  useEffect(() => {
    isSupported()
      .then((isSupported: boolean) => {
        initializeAnalytics(app);
      })
  })

  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav auth={auth} />
      <div className="flex-grow flex ">
        <div style={{ marginTop: '0' }}>
        <h1>Leaderboard</h1>
        {/* Add leaderboard content here */}
        </div>
      </div>
    </main>
  );
  
}

class Score {
  constructor(public name: string, public score: number) {}
}

const leaderboard: Score[] = [];

function addScore(name: string, score: number) {
  const newScore = new Score(name, score);
  leaderboard.push(newScore);
  leaderboard.sort((a, b) => b.score - a.score);
}

function displayLeaderboard() {
  console.log('Leaderboard:');
  leaderboard.forEach((score, index) => {
    console.log(`${index + 1}. ${score.name}: ${score.score}`);
  });
}

addScore('Player1', 100);
addScore('Player2', 85);
addScore('Player3', 120);

displayLeaderboard();
