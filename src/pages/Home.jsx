import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./page-styles/Home.css";
import ToolBar from "../components/home-components/bar";
import PrList from "../components/home-components/prList";
import DailyList from "../components/home-components/dailyList";
import { get } from "../utils/httpClient";
import io from "socket.io-client";

function Home() {
  const { userId } = useParams();
  const [user, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const fetchedRecords = await get(`/user/${userId}`);
        setRecords(fetchedRecords);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchRecords();
  }, [userId]);

  useEffect(() => {
    console.log("in socket call");
    const socket = io(); // Create a new instance of Socket.IO

    // Listen for notifications from the server
    socket.on('notification', (message) => {
      const notificationDiv = document.getElementById('notification');
      notificationDiv.innerHTML = `<p>${message}</p>`;
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="homePage">
      <ToolBar userId={userId} />
      <div className="Lists">
        <PrList userId={userId} />
        <DailyList userId={userId}/>
      </div>
      <div id="notification"></div>
    </div>
  );
}

export default Home;
