import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './page-styles/User.css'
import EditDialog from '../components/user-components/editDialog'

export default function User() {
  const user = {
    id: 1,
    name: "Tarannom",
    weight: 43,
    height: 164,
    birthdate: "2002-07-23",
  };

  const [showEditDialog, setShowEditDialog] = useState(false);

  const openEditDialog = () => {
    setShowEditDialog(true);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
  };


  return (
    <div className="userInfo">
      <div id='infoPanel'>
        <h3>User Information</h3>


        <div id="info">
          <h5>Name</h5>
          <label>{user.name}</label>
        </div>
        <div id="info">
            <h5>Weight</h5>
            <label>{user.weight} kg</label>
        </div>

        <div id="info">
            <h5>Height</h5>
            <label>{user.height} cm</label>
        </div>

        <div id="info">
            <h5>Date of Birth</h5>
            <label>{user.birthdate}</label>
        </div>

        <div id='info_button'>
        <button id='edit' onClick={openEditDialog}>Edit</button>
        <Link to="/Home"><button id='back'>Back</button></Link>
        </div>

      </div>
      {showEditDialog && <EditDialog user={user} onClose={closeEditDialog} />}
    </div>
  );
}
