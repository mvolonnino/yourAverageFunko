import React, { useContext } from "react";
import { MDBDataTableV5 } from "mdbreact";

import "./UsersList.css";
import Avatar from "@material-ui/core/Avatar";
import { UsersContext } from "../../../../context/Users/UsersContext";

const UsersList = () => {
  const { usersState } = useContext(UsersContext);
  const { users } = usersState;

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
        };
      }),
    ],
  };

  // useEffect(() => {
  //   if (Object.keys(funkoSet).length > 0) {
  //     document
  //       .getElementById(funkoSet.genre)
  //       .scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [funkoSet]);

  return (
    <>
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
    </>
  );
};

export default UsersList;
