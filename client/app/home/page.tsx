"use client";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { ethers } from "ethers";
import Nav from "@/app/src/nav";
import { app } from "@/app/src/firebase";
import axios from "axios";

function random_number_generator(maxLimit: number) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

const Home = () => {
  const [web3, setWeb3] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [auth, setAuth] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    startStop();
  }, []);

  useEffect(() => {
    const func = async () => {
      console.log("Time: ", time);
      await axios
        .post("http://localhost:5001/addpoints", {
          username: getAuth().currentUser?.displayName,
          points: 1,
        })
        .then((res) => {
          console.log(res);
        });
    };
    func();
  }, [time]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        // console.log("Time: ", prevTime);
        setTime((prevTime) => prevTime + 1);
        // setInterval(() => {
        //   console.log("Time: ", time);
        // }, 1000);
      }, 1000);
    } else if (interval) {
      clearInterval(interval); // Clear the interval if it exists
    }

    const handleVisibilityChange = async () => {
      if (document.hidden && interval) {
        const displayName = getAuth(app).currentUser?.displayName;
        // await axios.post("http://localhost:5001/addpoints", {
        //   username: displayName,
        //   points: interval,
        // });
        clearInterval(interval); // Clear the interval if the document is hidden
        reset();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (interval) {
        clearInterval(interval); // Clear the interval when the component unmounts
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  function io(name: string) {
    return `https://${name}.io/`;
  }

  const formatTime = (seconds: number) => {
    console.log(seconds);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const unProductiveApps = [
    "https://neal.fun/password-game/",
    "https://neal.fun/absurd-trolley-problems/",
    "https://www.youtube.com/embed/UcRtFYAz2Yo?si=L1DhXfK4WXllRzm3",
    "https://skribbl.io/",
    "https://shellshock.io/",
    "https://zombsroyale.io/",
    "https://paper.io/",
    "https://krunker.io/",
    "https://agar.io/",
    "https://flappyroyale.io/",
    "https://hole-io.com",
    "https://temu.com/",
    io("tetr"),
    io("mope"),
    io("2048"),
    io("gats"),
    io("gartic"),
    io("superhex"),
    "https://theannoyingsite.com/",
  ];

  const [curr, setCurr] = useState(
    unProductiveApps[random_number_generator(5)]
  );
  //   let startTime = 0;
  //   let isRunning = false;
  //   let intervalId: NodeJS.Timeout | undefined;
  //   setHours(0);
  //   setMinutes(0);
  //   setSeconds(0);

  //   function startStop() {
  //     if (isRunning) {
  //       // Stop the stopwatch
  //       clearInterval(intervalId);
  //     } else {
  //       // Start the stopwatch
  //       startTime = Date.now() - (milliseconds ? milliseconds : 0);
  //       intervalId = setInterval(logElapsedTime, 10);
  //     }
  //     isRunning = !isRunning;
  //   }

  //   function logElapsedTime() {
  //     const elapsedTime = Date.now() - startTime;
  //     updateElapsedTime(elapsedTime);
  //     console.log(formatElapsedTime());
  //   }

  //   function updateElapsedTime(elapsedTime: number) {
  //     milliseconds = elapsedTime % 1000;
  //     seconds = Math.floor((elapsedTime / 1000) % 60);
  //     minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  //     hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  //   }

  //   function formatElapsedTime() {
  //     return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}.${pad3(
  //       milliseconds
  //     )}`;
  //   }

  //   function pad2(num: number) {
  //     return num.toString().padStart(2, "0");
  //   }

  //   function pad3(num: number) {
  //     return num.toString().padStart(3, "0");
  //   }

  //   startStop();

  return (
    <div className="flex min-h-screen flex-col bg-[#BACAE3] w-screen text-black px-20 pb-10">
      <Nav page="Start" auth={auth} />
      <p className="text-[1.5vw] font-extrabold">I have productively used</p>
      <div className="flex flex-row gap-2 -mt-8">
        <p className="text-[6vw] font-bold">{formatTime(time)}</p>
      </div>
      <div className="flex flex-row">
        <button
          className="mb-5 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => {
            setCurr(
              unProductiveApps[random_number_generator(unProductiveApps.length)]
            );
          }}
        >
          Randomize
        </button>
      </div>
      {/* <div className="w-[100vw]"> */}
      <iframe
        className="h-[80vh] rounded-2xl bg-clip-border"
        src={curr}
      ></iframe>
      {/* </div> */}
    </div>
  );
};

export default Home;
