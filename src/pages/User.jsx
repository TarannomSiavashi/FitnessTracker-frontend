import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./page-styles/User.css";
import ErrorPopup from "../components/error-components/ErrorMessage";
import EditDialog from "../components/user-components/editDialog";
import { get } from "../utils/httpClient";

export default function User() {
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [reloadUser, setReloadUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseErrorPopup = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetcheduser = await get(`/user/${userId}`);
        const userObj = fetcheduser[0];
        setUser(userObj);
      } catch (error) {
        setErrorMessage("Error fetching user.");
      }
    };
    fetchUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      const fetcheduser = await get(`/user/${userId}`);
      const userObj = fetcheduser[0];
      setUser(userObj);
    } catch (error) {
      setErrorMessage("Error fetching user.");
    }
  };

  useEffect(() => {
    if (reloadUser) {
      loadUser();
      setReloadUser(false); // Reset the reload flag
    }
  }, [reloadUser]);

  const openEditDialog = () => {
    setShowEditDialog(true);
  };

  const closeEditDialog = () => {
    setShowEditDialog(false);
    setReloadUser(true);
  };

  return (
    <div className="userInfo">
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={handleCloseErrorPopup} />
      )}
      <div id="infoPanel">
        <h3>User Information</h3>

        <div id="info">
          <h5 id="h5_info">Name</h5>
          <label>{user.name}</label>
        </div>
        <div id="info">
          <h5 id="h5_info">Weight</h5>
          <label>{user.weight} kg</label>
        </div>

        <div id="info">
          <h5 id="h5_info">Height</h5>
          <label>{user.height} cm</label>
        </div>

        <div id="info">
          <h5 id="h5_info">Date of Birth</h5>
          <label>{user.birthdate}</label>
        </div>

        <div id="info_button">
          <button id="edit" onClick={openEditDialog}>
            Edit
          </button>
          <Link to={`/Home/${userId}`}>
            <button id="back">Back</button>
          </Link>
        </div>
      </div>
      {showEditDialog && <EditDialog user={user} onClose={closeEditDialog} />}
    </div>
  );
}
