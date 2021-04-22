import React, { useEffect, useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import { MDBAnimation } from "mdbreact";
import { useHistory } from "react-router-dom";

import funkoBrand from "../../../../img/funkoBrand.png";
import {
  flatten,
  getAllGenres,
  getFunkoPopData,
  getUserFunkoPops,
  getUserWantList,
  getAllUsers,
  API,
} from "../../../../utils";
import { GenreContainer } from "../../../../components";
import { Loading } from "../../../../components";
import { UserContext, FunkosContext, UsersContext } from "../../../../context";
import db from "../../../../fire";
import "./Home.css";
import { ImagePreview } from "../index";

function Home() {
  const history = useHistory();
  const { userState, userDispatch } = useContext(UserContext);
  const { funkoState, funkoDispatch } = useContext(FunkosContext);
  const { usersState, usersDispatch } = useContext(UsersContext);
  const {
    user,
    userFunkoPops,
    getUserFunkos,
    userWantList,
    getUserWantFunkos,
    chats,
    authToken,
  } = userState;
  const { uid } = user;
  const { dbFunkoPops } = funkoState;
  const { users } = usersState;
  const [numFunkos, setNumFunkos] = useState();
  const [numWantFunkos, setNumWantFunkos] = useState();
  const [loading, setLoading] = useState(true);
  const [showWantList, setShowWantList] = useState(false);
  const [showCollection, setShowCollection] = useState(true);
  const [updatePhoto, setUpdatePhoto] = useState(false);

  const handleShowCollection = () => {
    setShowCollection(true);
    setShowWantList(false);
  };

  const handleWantList = () => {
    setShowWantList(true);
    setShowCollection(false);
  };

  const handleUpdatePhoto = () => {
    setUpdatePhoto(!updatePhoto);
  };

  useEffect(() => {
    if (dbFunkoPops.length === 0 && loading) {
      try {
        console.log("fetching db funko pops...");
        getFunkoPopData().then((res) => {
          funkoDispatch({
            type: "SET_DB_FUNKOPOPS",
            dbFunkoPops: res,
          });
          const genreList = getAllGenres(res);
          funkoDispatch({
            type: "SET_DB_GENRELIST",
            dbGenreList: genreList,
          });

          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [loading]);

  useEffect(() => {
    if ((userFunkoPops?.length === 0 && loading) || getUserFunkos) {
      try {
        console.log("fetching user funko pops...");
        getUserFunkoPops(uid).then((res) => {
          setLoading(false);
          if (res) {
            userDispatch({
              type: "SET_USER_FUNKOPOPS",
              userFunkoPops: res,
            });
          }

          userDispatch({
            type: "GET_USER_FUNKOS",
            getUserFunkos: false,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    // getting the # of funkos in user collection/want list
    if (showCollection && userFunkoPops?.length > 0) {
      const funkoData = userFunkoPops.map((funkoSet) => funkoSet.funkoData);

      setNumFunkos(flatten(funkoData).length);
    } else {
      setNumFunkos(0);
    }
  }, [showCollection, getUserFunkos]);

  useEffect(() => {
    if (users.length === 0 && loading) {
      try {
        console.log("fetching all users...");
        getAllUsers().then((res) => {
          if (res.length > 0) {
            usersDispatch({
              type: "SET_USERS",
              users: res,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
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

  useEffect(() => {
    if (authToken) {
      console.log("fetching user messages...");
      API.getUserMessages(authToken, uid)
        .then((res) => {
          const { data } = res;
          userDispatch({
            type: "SET_CHATS",
            chats: data,
          });

          data.map((chat) => {
            const { seen, id } = chat;

            console.log("subscriping to chats id...", id);
            db.collection("chats")
              .doc(id)
              .onSnapshot((snapshot) => {
                const data = { ...snapshot.data(), id: id };
                if (data) {
                  const { seen } = data;

                  if (!seen[uid]) {
                    history.push({
                      state: true,
                    });
                  }
                }
              });

            if (!seen[uid]) {
              history.push({
                state: true,
              });
            }
          });
        })
        .catch((err) => console.error(err));
    }
  }, [authToken]);

  useEffect(() => {
    if (showWantList && getUserWantFunkos) {
      try {
        getUserWantList(user.uid).then((res) => {
          userDispatch({
            type: "GET_USER_WANTFUNKOS",
            getUserWantFunkos: false,
          });

          if (res) {
            userDispatch({
              type: "SET_USER_WANTLIST",
              userWantList: res,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (showWantList && userWantList?.length > 0) {
      const funkoData = userWantList.map((funkoSet) => funkoSet.funkoData);

      setNumWantFunkos(flatten(funkoData).length);
    } else {
      setNumWantFunkos(0);
    }
  }, [showWantList, getUserWantFunkos, userWantList]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="application container-fluid">
            <MDBAnimation type="fadeInDownBig" delay=".2s">
              <div className="jumbotron bg-dark text-white">
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
                      <EditIcon fontSize="small" onClick={handleUpdatePhoto} />
                    </div>
                    {/* <div className="displayName">
                <EditIcon fontSize="small" />
              </div> */}
                    <div className="email">
                      <h5>{user?.email}</h5>
                      {/* <EditIcon fontSize="small" /> */}
                    </div>
                  </div>
                  {showWantList && (
                    <div className="col-md-6 collectionInfo">
                      <div className="funkoGenre col-md-6 text-center">
                        <p>Series/Genres in your want list</p>
                        {userWantList?.length}
                      </div>
                      <div className="funkoData col-md-6 text-center">
                        <p>Funko Pops in your want list</p>
                        {numWantFunkos}
                      </div>
                    </div>
                  )}
                  {showCollection && (
                    <div className="col-md-6 collectionInfo">
                      <div className="funkoGenre col-md-6 text-center">
                        <p>Series/Genres in your collection</p>
                        {userFunkoPops?.length}
                      </div>
                      <div className="funkoData col-md-6 text-center">
                        <p>Funko Pops in your collection</p>
                        {numFunkos}
                      </div>
                    </div>
                  )}
                </div>
                <div className="userPopLists">
                  <div
                    className={`btn ${showCollection ? "active" : "notActive"}`}
                    onClick={handleShowCollection}
                  >
                    Your Collection
                  </div>
                  <div
                    className={`btn ${showWantList ? "active" : "notActive"}`}
                    onClick={handleWantList}
                  >
                    Want List
                  </div>
                </div>
              </div>
            </MDBAnimation>

            {/* uplaod new photo for avatar */}

            {updatePhoto && (
              <MDBAnimation type="fadeInDown" delay=".2s">
                <ImagePreview
                  uid={userState.user.uid}
                  authToken={userState.authToken}
                  setUpdatePhoto={setUpdatePhoto}
                />
              </MDBAnimation>
            )}

            {showCollection &&
              userFunkoPops?.map((funkoSet, i) => (
                <GenreContainer funkoSet={funkoSet} key={i} />
              ))}

            {userFunkoPops?.length === 0 && showCollection && (
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

            {showWantList &&
              userWantList?.map((funkoSet, i) => (
                <GenreContainer funkoSet={funkoSet} key={i} />
              ))}

            {userWantList?.length === 0 && showWantList && (
              <MDBAnimation type="fadeInDown" delay=".2s">
                <div className="noWantList text-center">
                  Hmm, doesn't seem like you have any funko pops in your want
                  list! Search some funkos that you don't have and add them to
                  see them here.
                </div>
              </MDBAnimation>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
