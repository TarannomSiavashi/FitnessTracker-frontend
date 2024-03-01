import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./page-styles/Home.css";
import ToolBar from "../components/home-components/bar";
import PrList from "../components/home-components/prList";
import { get } from "../utils/httpClient";


function Home() {
  const { userId } = useParams();
  console.log(userId);
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

  console.log("USERUSER");
  console.log(user);

  return (
    <div className="homePage">
      <ToolBar userId = {userId}/>
      <PrList userId={userId}/>
    </div>
  );
}

export default Home;
