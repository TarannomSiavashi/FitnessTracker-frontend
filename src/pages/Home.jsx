import React, { useEffect, useState } from "react";
import "./page-styles/Home.css";
import ToolBar from "../components/home-components/bar";
import PrList from "../components/home-components/prList";

// function Home({user}) {
function Home() {
  const user = {
    id: 1,
    name: "Tarannom",
    weight: 43,
    height: 164,
    birthdate: "2002-07-23",
  };

  // const styles = {
  //   wrapper: {
  //     height: "100%",
  //     width: "100%",
  //     display: "flex",
  //     gap: "12px",
  //     backgroundColor: "white",
  //   },
  // };

  console.log(user);

  return (
    // <div style={styles.wrapper}>
    <div className="homePage">
      <ToolBar />
      <PrList userId={user.id}/>
      {/* <label>{user.name}</label> */}
      {/* <p>Helloooo</p> */}
    </div>
  );
}

export default Home;
