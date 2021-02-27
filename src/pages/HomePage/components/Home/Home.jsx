import React, { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import { MDBAnimation } from "mdbreact";
import funkoBrand from "../../../../img/funkoBrand.png";
import API from "../../../../utils/API";
import flatten from "../../../../utils/flatten.js";
import { GenreContainer } from "../../../../components";
import getAllGenres from "../../../../utils/getAllGenres";
import { Loading } from "../../../../components";
import { UserContext } from "../../../../context/User/UserContext";
import { FunkosContext } from "../../../../context/Funkos/FunkosContext";
import { UsersContext } from "../../../../context/Users/UsersContext";

import "./Home.css";

function Home() {
  const { userState, userDispatch } = useContext(UserContext);
  const { funkoState, funkoDispatch } = useContext(FunkosContext);
  const { usersState, usersDispatch } = useContext(UsersContext);
  const { user, userFunkoPops, getUserFunkos } = userState;
  const { dbFunkoPops } = funkoState;
  const { users } = usersState;
  const [numFunkos, setNumFunkos] = useState();
  const [loading, setLoading] = useState(true);

  // console.log({
  //   user,
  //   userFunkoPops,
  //   getUserFunkos,
  //   dbFunkoPops,
  //   users,
  // });

  useEffect(() => {
    if (dbFunkoPops.length === 0 && loading) {
      console.log("fetching db funko pops...");
      API.getFunkoPopData()
        .then((res) => {
          const { data } = res;
          if (data !== undefined) {
            funkoDispatch({
              type: "SET_DB_FUNKOPOPS",
              dbFunkoPops: data,
            });
            console.log("setting genre list...");
            const genreList = getAllGenres(data);
            funkoDispatch({
              type: "SET_DB_GENRELIST",
              dbGenreList: genreList,
            });
          }
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [loading]);

  useEffect(() => {
    if ((userFunkoPops?.length === 0 && loading) || getUserFunkos) {
      console.log("fetching user funko pops...");
      API.getUserFunkoPops(user.uid)
        .then((res) => {
          setLoading(false);
          const { data } = res;
          if (data) {
            userDispatch({
              type: "SET_USER_FUNKOPOPS",
              userFunkoPops: data,
            });
            const funkoData = data.map((funkoSet) => funkoSet.funkoData);

            setNumFunkos(flatten(funkoData).length);
          }
          if (getUserFunkos) {
            userDispatch({
              type: "GET_USER_FUNKOS",
              getUserFunkos: false,
            });
          }
        })
        .catch((err) => console.error(err));
    }

    if (userFunkoPops?.length > 0) {
      const funkoData = userFunkoPops.map((funkoSet) => funkoSet.funkoData);

      setNumFunkos(flatten(funkoData).length);
    }
  }, [getUserFunkos]);

  useEffect(() => {
    if (users.length === 0 && loading) {
      console.log("fetching all users...");
      API.getAllUsers()
        .then((res) => {
          setLoading(false);
          const { data } = res;
          usersDispatch({
            type: "SET_USERS",
            users: data,
          });
        })
        .catch((err) => console.error(err));
    }

    if (
      users.length > 0 &&
      userFunkoPops.length > 0 &&
      dbFunkoPops.length > 0 &&
      loading
    ) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="application container-fluid">
            <MDBAnimation type="fadeInDownBig" delay=".2s">
              <div className="jumbotron bg-dark">
                <div className="row imageRow">
                  <div className="col-md-8 text-center">
                    <img src={funkoBrand} alt="" className="funkoBrand" />
                  </div>
                </div>
                <div className="row userRow">
                  <div className="col-md-6 text-center">
                    <div className="avatar align-items-center">
                      <Avatar src={user?.photoURL} alt={user?.displayName} />
                      <h4 className="ml-2">{user?.displayName}</h4>
                      {/* <EditIcon fontSize="small" /> */}
                    </div>
                    {/* <div className="displayName">
                <EditIcon fontSize="small" />
              </div> */}
                    <div className="email">
                      <h5>{user?.email}</h5>
                      {/* <EditIcon fontSize="small" /> */}
                    </div>
                  </div>
                  <div className="col-md-6 collectionInfo">
                    <div className="funkoGenre col-md-6 text-white text-center">
                      <p>Series/Genres in your collection</p>
                      {userFunkoPops?.length}
                    </div>
                    <div className="funkoData col-md-6 text-white text-center">
                      <p>Funko Pops in your collection</p>
                      {numFunkos || 0}
                    </div>
                  </div>
                </div>
              </div>
            </MDBAnimation>
            {userFunkoPops?.map((funkoSet, i) => (
              <GenreContainer funkoSet={funkoSet} key={i} />
            ))}
            {userFunkoPops?.length === 0 && (
              <>
                <MDBAnimation type="fadeInDown" delay=".2s">
                  <div className="noUserFunkos text-center">
                    You new here? We don't seem to have any saved funko pops for
                    you.. head to the 'Funkos' tab to look through our
                    collections
                  </div>
                </MDBAnimation>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
