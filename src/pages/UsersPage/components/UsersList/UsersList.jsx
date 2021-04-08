import React, { useContext, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";

import "./UsersList.css";
import Avatar from "@material-ui/core/Avatar";
import { UsersContext } from "../../../../context";
import { API } from "../../../../utils";
import { Loading, UserModal } from "../../../../components";

const UsersList = () => {
  const { usersState } = useContext(UsersContext);
  const { users } = usersState;
  const [selectedUser, setSelectedUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const data = {
    columns: [
      {
        label: "Image",
        field: "image",
        width: 200,
        sort: "disabled",
      },
      {
        label: "User",
        field: "user",
        width: 200,
      },
      {
        label: "Signed Up",
        field: "signedUp",
        width: 200,
      },
    ],
    rows: [
      ...users?.map((user) => {
        return {
          user: user.displayName,
          signedUp: user.signedUp,
          image: (
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName}
              className="userPhoto"
            />
          ),
          clickEvent: () => handleUserClick(user),
        };
      }),
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <MDBDataTableV5
          className="customTable"
          hover
          searchTop
          searchBottom={false}
          entriesOptions={[10, 25, 50, 100]}
          entries={10}
          pagesAmount={4}
          fullPagination
          striped
          searchLabel={"Search Users"}
          theadTextWhite
          theadColor={"primary-color-dark"}
          tbodyTextWhite
          tbodyColor={"unique-color-dark"}
          responsive
          data={data}
        />
      )}

      {Object.keys(selectedUser).length > 0 ? (
        <UserModal
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <div className="text-center">
          Click on a user above to see their collections!
        </div>
      )}
    </>
  );
};

export default UsersList;
