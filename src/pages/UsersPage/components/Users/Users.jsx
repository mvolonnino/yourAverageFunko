import React, { useEffect, useContext } from "react";

import "./Users.css";
import { UsersList } from "../index";
import { getAllUsers } from "../../../../utils";
import { UsersContext } from "../../../../context";

function Users() {
  const { usersState, usersDispatch } = useContext(UsersContext);
  const { users } = usersState;

  useEffect(() => {
    if (users.length === 0) {
      try {
        console.log("fetching all users...");
        getAllUsers().then((res) => {
          usersDispatch({
            type: "SET_USERS",
            users: res,
          });
        });
      } catch (error) {
        console.error(error);
      }
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
