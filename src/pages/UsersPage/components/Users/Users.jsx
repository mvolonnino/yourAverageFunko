import React, { useEffect, useContext } from "react";

import "./Users.css";
import { UsersList } from "../index";
import API from "../../../../utils/API.js";
import { UsersContext } from "../../../../context/Users/UsersContext";

function Users() {
  const { usersState, usersDispatch } = useContext(UsersContext);
  const { users } = usersState;

  useEffect(() => {
    if (users.length === 0) {
      console.log("fetching all users...");
      API.getAllUsers()
        .then((res) => {
          const { data } = res;
          usersDispatch({
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
