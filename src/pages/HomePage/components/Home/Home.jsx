import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";

import { useDataLayerValue } from "../../../../context/DataLayer";
import funkoBrand from "../../../../img/funkoBrand.png";
import API from "../../../../utils/API";
import { GenreContainer } from "../../../../components";

import "./Home.css";

function Home() {
  const [{ user, userFunkoPops }, dispatch] = useDataLayerValue();
  const [funkoData, setFunkoData] = useState([]);
  console.log({ user, funkoData, userFunkoPops });

  const setUserFunkos = (data) => {
    dispatch({
      type: "SET_USER_FUNKOPOPS",
      userFunkoPops: data,
    });
  };

  useEffect(() => {
    // API.getFunkoPopData()
    //   .then((res) => {
    //     const { data } = res;
    //     setFunkoData(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    if (!userFunkoPops) {
      API.getUserFunkoPops(user.uid)
        .then((res) => {
          const { data } = res;
          setUserFunkos(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="application container-fluid">
      <div className="jumbotron bg-dark">
        <div className="row imageRow">
          <div className="col-md-8 text-center">
            <img src={funkoBrand} alt="" className="funkoBrand" />
          </div>
        </div>
        <div className="row userRow">
          <div className="col-md-8 text-center">
            <div className="avatar">
              <Avatar
                src={user?.photoUrl || "alt will be used"}
                alt={user?.displayName}
              />
              <EditIcon fontSize="small" />
            </div>
            <div className="displayName">
              <h4>{user?.displayName}</h4>
              <EditIcon fontSize="small" />
            </div>
            <div className="email">
              <h5>{user?.email}</h5>
              <EditIcon fontSize="small" />
            </div>
          </div>
        </div>
      </div>
      {userFunkoPops?.map((funkoSet, i) => (
        <GenreContainer funkoSet={funkoSet} key={i} />
      ))}
      {userFunkoPops?.length === 0 && (
        <div className="noUserFunkos">
          You new here? We're not showing any saved funko pops, get searching!
        </div>
      )}
    </div>
  );
}

export default Home;
