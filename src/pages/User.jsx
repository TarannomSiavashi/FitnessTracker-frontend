import React, { useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import './page-styles/User.css'
import EditDialog from '../components/user-components/editDialog'
import { get } from '../utils/httpClient'


export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetcheduser = await get(`/user/${userId}`);
        console.log("fetched usr:", fetcheduser[0]);
        const userObj = fetcheduser[0];
        setUser(userObj);
        console.log("user usr:", user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const fetcheduser = await get(`/user/${userId}`);
      console.log("fetched usr:", fetcheduser[0]);
      const userObj = fetcheduser[0];
      setUser(userObj);
      console.log("user usr:", user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };



  const [showEditDialog, setShowEditDialog] = useState(false);

  const openEditDialog = () => {
    setShowEditDialog(true);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
    loadUser();
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
        <Link to={`/Home/${userId}`}><button id='back'>Back</button></Link>
        </div>

      </div>
      {showEditDialog && <EditDialog user={user} onClose={closeEditDialog} />}
    </div>
  );
}
