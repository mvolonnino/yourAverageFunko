import React from "react";

import "./Users.css";
import { useDataLayerValue } from "../../../../context/DataLayer";
import { UsersList } from "../../../../components";

function Users() {
  const [{ users }] = useDataLayerValue();
  console.log({ users });

  return (
    <div className="container-fluid usersContainer">
      <h1 className="text-center">Fellow Average FunkoPop Collectors!</h1>
      <UsersList />
    </div>
  );
}

export default Users;
