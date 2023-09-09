"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { app } from '@/app/src/firebase';
import { getAnalytics, initializeAnalytics, isSupported, logEvent } from 'firebase/analytics';
import Nav from '@/app/src/nav';
import { getAuth, onAuthStateChanged } from 'firebase/auth'


export default function Home() {

  const [auth, setAuth] = useState(false);
  
  const imgAdapt = 0.75

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
        if(isSupported) {
          initializeAnalytics(app);
          logEvent(getAnalytics(app), 'page_view')
        }
      })
  })

  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page='Home' auth={auth} />
      <div className='flex flex-row m-auto  gap-2'>
        <div className='flex flex-col justify-center'>
          <div className='text-8xl'>
            <span className='text-black font-black'>Productivity</span>
            <span className='text-transparent font-black bg-clip-text bg-gradient-to-r from-[#2A3757] to-[#7D9ABC]'>Plus</span>
          </div>
          <p className='font-normal text-xl'>Why be productive when you just cannot be?</p>
        </div>
        <div>
          <Image src="/landingn.png" alt="Landing Page" width={928 * imgAdapt} height={529 * imgAdapt} />
        </div>
      </div>
    </main>
  )
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
