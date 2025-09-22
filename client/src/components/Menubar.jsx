import React, { useContext, useEffect, useRef, useState } from "react";
import { assests } from "../assets/assests";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Menubar = () => {
  const navigate = useNavigate();

  const { userData, backend_url, setloggedIn, setuserData } =
    useContext(AppContext);

  async function handleLogout() {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backend_url + "/logout");
      if (response.status === 200) {
        setloggedIn(false);
        setuserData(false);
        navigate("/");
      } else {
        console.log("logout Unsuccessful");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center ">
      <div className="d-flex align-items-center gap-2">
        <img src={assests.Homeicon} alt="logo" width={32} height={32} />
        <span className="fw-bold fs-4 text-dark">Authify</span>
      </div>

      {userData ? (
        <div
          className="btn btn-outline-dark rounded-pill px-3"
          onClick={() => handleLogout()}
        >
          Logout <i className="bi bi-arrow-right ms-2"></i>
        </div>
      ) : (
        <div
          className="btn btn-outline-dark rounded-pill px-3"
          onClick={() => navigate("/login")}
        >
          Login <i className="bi bi-arrow-right ms-2"></i>
        </div>
      )}
    </nav>
  );
};

export default Menubar;
