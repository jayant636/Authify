import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  console.log(userData);
  return (
    <>
      <div
        className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
        style={{ minHeight: "80vh" }}
      >
        <h5 className="fw-semibold">
          Hey {userData ? userData.name : "Developer"}
        </h5>
        <h1 className="fw-bold display-5 mb-3">Welcome to our product</h1>
        <p>
          Lets start with a quik product tour & you can setup the authentication
          in no time !
        </p>

        <button className="btn btn-outline-dark rounded-pill px-4 py-2">
          Get started
        </button>
      </div>
    </>
  );
};

export default Header;
