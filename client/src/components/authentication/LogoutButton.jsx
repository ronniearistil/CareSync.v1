import React from "react";
import logout from "./logout"; 

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
