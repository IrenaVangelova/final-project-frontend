import React, { useState } from "react";

export const CurrentUserContext = React.createContext("default");

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const getUser = () => {
    let response = localStorage.getItem("user");
    setCurrentUser(JSON.parse(response));
  };

  return (
    <CurrentUserContext.Provider value={[currentUser, getUser]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => React.useContext(CurrentUserContext);