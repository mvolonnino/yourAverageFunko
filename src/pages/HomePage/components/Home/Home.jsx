import React, { useEffect, useState } from "react";

import { useDataLayerValue } from "../../../../context/DataLayer";
import { auth } from "../../../../fire";
import funkoBrand from "../../../../img/funkoBrand.png";
import API from "../../../../utils/API";
import { GenreContainer } from "../../../../components";

import "./Home.css";

function Home() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [search, setSearch] = useState("");
  const [funkoData, setFunkoData] = useState([]);
  console.log({ user, funkoData });

  const handleSearch = (e) => {
    e.preventDefault();
    API.searchFunkoPopData(search)
      .then((res) => {
        const { data } = res;
        console.log({ data });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    API.getFunkoPopData()
      .then((res) => {
        const { data } = res;
        setFunkoData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="application container-fluid">
      <div className="jumbotron">
        <img src={funkoBrand} alt="" className="funkoBrand" />
        <h1 className="text-center">{`Logged in as ${user?.displayName}`}</h1>
        <button
          className="btn btn-danger"
          onClick={() =>
            auth
              .signOut()
              .then(() => {
                dispatch({
                  type: "LOGOUT",
                });
              })
              .catch((err) => {
                console.error(err);
              })
          }
        >
          LogOut
        </button>
      </div>
      <form>
        <input
          placeholder="Enter Search here"
          onChange={(e) => setSearch(e.currentTarget.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </form>
      {funkoData?.map((funkoSet) => (
        <GenreContainer funkoSet={funkoSet} />
      ))}
    </div>
  );
}

export default Home;
