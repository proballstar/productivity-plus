"use client";
import { useEffect, useState } from "react";
import { app } from "@/app/src/firebase";
import { initializeAnalytics, isSupported } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Nav from "@/app/src/nav";
const axios = require("axios");

export default function Home() {
  const [auth, setAuth] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [updatedLeaderBoard, setUpdatedLeaderBoard] = useState<any[]>([]);

  function removeFirstThreeValuesFromArray(inputArray: any[]) {
    if (inputArray.length >= 3) {
      return inputArray.slice(3); // Remove the first three elements and return the new array
    } else {
      // If there are fewer than three elements, return an empty array or handle it as needed
      return [];
    }
  }

  useEffect(() => {
    // Function to make the GET request and console the response
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/leaderboard");
        console.log("Response:", response.data);

        // Assuming your response contains an array of scores
        setLeaderboard(response.data);
        setUpdatedLeaderBoard(removeFirstThreeValuesFromArray(response.data));
        setIsClient(true);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchData();
  }, []);

  if (isClient === false) {
    return null;
  } else {
    return (
      <main className="flex min-h-screen flex-col bg-[#BACAE3] w-screen">
        <Nav page="Leaderboard" auth={auth} />
        <div className="flex-grow flex flex-col items-center justify-start">
          <h1>Leaderboard</h1>
          <div className="flex-col flex w-min">
            <div className="flex flex-row h-[50vh] items-end">
              <div className="w-[230px] h-[25vh] bg-[#3E4B6E] rounded-t-full  relative items-center justify-center flex">
                @{leaderboard[1].username}
                <div
                  style={{ backgroundColor: leaderboard[1].color }}
                  className="w-[7.5vw] h-[7.5vw] bg-black absolute bottom-[17vh] rounded-full flex items-center justify-center"
                ></div>
              </div>
              <div className="w-[230px] h-[35vh] bg-[#324061] rounded-t-full relative items-center justify-center flex">
                @{leaderboard[0].username}
                <div
                  style={{ backgroundColor: leaderboard[0].color }}
                  className={`w-[7.5vw] h-[7.5vw]  absolute bottom-[29vh] rounded-full flex items-center justify-center`}
                ></div>
              </div>
              <div className="w-[230px] h-[22vh] rounded-t-full bg-[#424F73] relative items-center justify-center flex">
                @{leaderboard[2].username}
                <div
                  style={{ backgroundColor: leaderboard[2].color }}
                  className="w-[7.5vw] h-[7.5vw] bg-black absolute bottom-[17vh] rounded-full flex items-center justify-center"
                ></div>
              </div>
            </div>
            <ul className="w-[100%] flex flex-col mt-2 gap-2">
              {updatedLeaderBoard.map((score, index) => (
                <li
                  className="w-[100%] bg-[#364365] p-4 rounded-x flex flex-row gap-5"
                  key={index}
                >
                  <div
                    style={{ backgroundColor: score.color }}
                    className="w-[50px] h-[50px] rounded-full"
                  >
                    hi
                  </div>
                  {`${index + 4}. ${score.username}: ${score.points}`}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
