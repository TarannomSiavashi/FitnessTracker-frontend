import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorPopup from "../components/error-components/ErrorMessage";
import { post } from "../utils/httpClient";

import "./page-styles/AddMonthly.css"

export default function AddMonthly() {
  const { userId } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };


  const add = async () => {
    let dayResponse;
    let monthResponse;

    const mTitle = document.getElementById("Mtitle").value;
    const mDesc = document.getElementById("Mdesc").value;
    const mStart = document.getElementById("Mstart").value;
    const mEnd = document.getElementById("Mend").value;

    const newMonthly = {
      title: mTitle,
      desc: mDesc,
      start: mStart,
      end: mEnd,
      userid: userId,
    };



    try {
      const response = await post(`/newMonthly`, newMonthly);
      monthResponse =response;
    } catch (error) {
      setErrorMessage("Error in Creating new monthly goal");
    }

    const dTitle = document.getElementById("Dtitle").value;
    const dDesc = document.getElementById("Ddesc").value;
    const dMetric = document.getElementById("Dmetric").value;
    const dAlarm = document.getElementById("Dalarm").value;
    const dState = 0;

    const newDaily = {
      title: dTitle,
      desc: dDesc,
      metric: dMetric,
      alarm: dAlarm,
      userid: userId,
      status: dState,
    };

    try {
      const response = await post(`/newDaily`, newDaily);
      dayResponse = response;
    } catch (error) {
      setErrorMessage("Error in Creating new daily goal");
    }

    const newDayMonth = {
      monthid: monthResponse.monthid,
      dayid: dayResponse.dayid
    }

    try {
      const response = await post(`/dayMonth`, newDayMonth);
    } catch (error) {
      setErrorMessage("Error in Creating new daily goal related to monthly goal");
    }

  };

  return (
    <div className="addMonthlyPage">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <div className="newMonthInfo">
      <h3 id="content">Monthly Goal</h3>
        <div id="monthInfo">
          <h4 id="Mh4">Title: </h4>
          <input type="text" id="Mtitle" />
        </div>

        <div id="monthInfo">
          <h4 id="Mh4">Description: </h4>
          <input type="text" id="Mdesc" />
        </div>

        <div id="monthInfo">
          <h4 id="Mh4">Start Date: </h4>
          <input type="date" id="Mstart" />
        </div>

        <div id="monthInfo">
          <h4 id="Mh4">Deadline: </h4>
          <input type="date" id="Mend" />
        </div>
      </div>

      <div className="relatedDaily">
        <h3 id="content">Related Daily Goal</h3>
        <div id="dayInfo">
          <h4 id="Mh4">Title: </h4>
          <input type="text" id="Dtitle" />
        </div>

        <div id="dayInfo">
          <h4 id="Mh4">Description: </h4>
          <input type="text" id="Ddesc" />
        </div>

        <div id="dayInfo">
          <h4 id="Mh4">Metric: </h4>
          <input type="number" id="Dmetric" />
        </div>

        <div id="dayInfo">
          <h4 id="Mh4">Set Alarm for: </h4>
          <input type="time" id="Dalarm"></input>
        </div>
      </div>
      <div className="Mbuttons">
        <button className="M_button" onClick={add}>
          Add
        </button>
        <Link to={`/Home/${userId}`}>
            <button className="M_button">Back</button>
          </Link>
        {/* <button className="M_button" onClick={handleClose}>
          Cancel
        </button> */}
      </div>
    </div>
  );
}
