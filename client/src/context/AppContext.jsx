import { createContext, useState } from "react";
import { AppConstant } from "../util/constant";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backend_url = AppConstant.BACKEND_URL;
  const [loggedIn, setloggedIn] = useState(false);
  const [userData, setuserData] = useState(false);
  const getUserData = async () => {
    try {
      const response = await axios.get(backend_url + "/profile");
      if (response.status === 200) {
        console.log(response);
        setuserData(response.data);
      } else {
        console.log("Unable to retrieve the profile");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(userData);
  };

  const contextValue = {
    backend_url,
    loggedIn,
    setloggedIn,
    userData,
    setuserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
