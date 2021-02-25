import React, { useEffect } from "react";

import "./Users.css";
import { useDataLayerValue } from "../../../../context/DataLayer";
import { UsersList } from "../../../../components";
import API from "../../../../utils/API.js";

function Users() {
  const [{ users }, dispatch] = useDataLayerValue();

  useEffect(() => {
    if (users.length === 0) {
      console.log("fetching all users...");
      API.getAllUsers()
        .then((res) => {
          const { data } = res;
          dispatch({
            type: "SET_USERS",
            users: data,
          });
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="container-fluid usersContainer">
      <h1 className="text-center">Fellow Average FunkoPop Collectors!</h1>
      <UsersList />
    </div>
  );
}

export default Users;
