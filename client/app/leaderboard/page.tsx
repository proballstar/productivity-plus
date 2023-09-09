"use client"
import { useEffect, useState } from 'react';
import { app } from '@/app/src/firebase';
import { initializeAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Nav from '@/app/src/nav';

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  });

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/leaderboard'); // Make sure this URL matches your API endpoint
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data);
      } else {
        console.error('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    isSupported()
      .then((isSupported: boolean) => {
        initializeAnalytics(app);
      });

    fetchLeaderboard(); // Fetch leaderboard data when the component mounts
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
      <Nav page='Leaderboard' auth={auth} />
      <div className="flex-grow flex flex-col items-center justify-start">
        <h1>Leaderboard</h1>
        <div className='flex flex-row h-[50vh] items-end'>
          <div className='w-[230px] h-[25vh] bg-slate-100 rounded-t-full flex flex-col items-center relative'><div className='w-[7.5vw] h-[7.5vw] bg-black absolute mb-[20px]'>hi</div></div>
          <div className='w-[230px] h-[35vh] bg-slate-100 rounded-t-full'>hi</div>

          <div className='w-[230px] h-[22vh] rounded-t-full bg-slate-100'>hi</div>

        </div>
        {/* <ul>
          {leaderboard.map((score, index) => (
            <li key={index}>{`${index + 1}. ${score.name}: ${score.score}`}</li>
          ))}
        </ul> */}
      </div>
    </main>
  );
}


// class Score {
//   constructor(public name: string, public score: number) {}
// }

// const leaderboard: Score[] = [];

// function addScore(name: string, score: number) {
//   const newScore = new Score(name, score);
//   leaderboard.push(newScore);
//   leaderboard.sort((a, b) => b.score - a.score);
// }

// function displayLeaderboard() {
//   console.log('Leaderboard:');
//   leaderboard.forEach((score, index) => {
//     console.log(`${index + 1}. ${score.name}: ${score.score}`);
//   });
// }

// addScore('Player1', 100);
// addScore('Player2', 85);
// addScore('Player3', 120);

// displayLeaderboard();
