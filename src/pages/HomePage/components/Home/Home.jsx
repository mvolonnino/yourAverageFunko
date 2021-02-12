import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import { MDBAnimation } from "mdbreact";
import { useDataLayerValue } from "../../../../context/DataLayer";
import funkoBrand from "../../../../img/funkoBrand.png";
import API from "../../../../utils/API";
import { GenreContainer } from "../../../../components";

import "./Home.css";

function Home() {
  const [
    {
      user,
      userFunkoPops,
      dbGenreList,
      reGetUserFunkos,
      searchedFunkoPops,
      dbFunkoPops,
    },
    dispatch,
  ] = useDataLayerValue();
  const [numFunkos, setNumFunkos] = useState();

  // console.log({
  //   user,
  //   userFunkoPops,
  //   dbGenreList,
  //   searchedFunkoPops,
  //   reGetUserFunkos,
  //   dbFunkoPops,
  // });

  const setUserFunkos = (data) => {
    dispatch({
      type: "SET_USER_FUNKOPOPS",
      userFunkoPops: data,
    });
  };

  function flatten(arr) {
    return [].concat(...arr);
  }

  useEffect(() => {
    if (dbFunkoPops.length === 0) {
      console.log("fetching db funko pops...");
      dispatch({
        type: "SET_IS_LOADING",
        isLoading: true,
      });
      API.getFunkoPopData()
        .then((res) => {
          const { data } = res;
          dispatch({
            type: "SET_DB_FUNKOPOPS",
            dbFunkoPops: data,
          });
          dispatch({
            type: "SET_IS_LOADING",
            isLoading: false,
          });
        })
        .catch((err) => console.error(err));
    }
    if (dbGenreList.length === 0) {
      console.log("fetching genre list...");
      API.getGenreListData().then((res) => {
        const { data } = res;
        dispatch({
          type: "SET_DB_GENRELIST",
          dbGenreList: data.genreList,
        });
      });
    }
    if (userFunkoPops?.length === 0 || !userFunkoPops || reGetUserFunkos) {
      console.log("fetching user funko pops...");
      API.getUserFunkoPops(user.uid)
        .then((res) => {
          const { data } = res;
          setUserFunkos(data);
          const funkoData = data.map((funkoSet) => funkoSet.funkoData);

          setNumFunkos(flatten(funkoData).length);
        })
        .catch((err) => console.error(err));

      dispatch({
        type: "REGET_USER_FUNKOS",
        reGetUserFunkos: false,
      });
    }

    if (userFunkoPops?.length > 0) {
      const funkoData = userFunkoPops.map((funkoSet) => funkoSet.funkoData);

      setNumFunkos(flatten(funkoData).length);
    }
  }, [reGetUserFunkos]);

  return (
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
                <Avatar
                  src={user?.photoUrl || "alt will be used"}
                  alt={user?.displayName}
                />
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
                {numFunkos}
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
              You new here? We don't seem to have any saved funko pops for you..
              head to the 'Funkos' tab to look through our collections
            </div>
          </MDBAnimation>
        </>
      )}
    </div>
  );
}

export default Home;
