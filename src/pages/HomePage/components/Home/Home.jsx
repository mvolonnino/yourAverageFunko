import React, { useEffect, useState } from "react";

import { useDataLayerValue } from "../../../../context/DataLayer";
import { auth } from "../../../../fire";
import funkoBrand from "../../../../img/funkoBrand.png";
import API from "../../../../utils/API";
import { GenreContainer, Navbar } from "../../../../components";

import "./Home.css";

function Home(props) {
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
        <form className="search">
          <input
            className="searchField"
            placeholder="Enter Search here"
            onChange={(e) => setSearch(e.currentTarget.value)}
          ></input>
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      {funkoData?.map((funkoSet, i) => (
        <GenreContainer funkoSet={funkoSet} key={i} />
      ))}
    </div>
  );
}

export default Home;
