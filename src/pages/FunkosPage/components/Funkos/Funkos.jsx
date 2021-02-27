import React, { useEffect, useContext } from "react";

import "./Funkos.css";
import API from "../../../../utils/API";
import { GenreList } from "../../../../components";
import { FunkosContext } from "../../../../context/Funkos/FunkosContext";

function Funkos() {
  const { funkoState, funkoDispatch } = useContext(FunkosContext);
  const { dbGenreList } = funkoState;

  useEffect(() => {
    if (dbGenreList.length === 0) {
      console.log("fetching genre list...");
      API.getGenreListData().then((res) => {
        const { data } = res;
        funkoDispatch({
          type: "SET_DB_GENRELIST",
          dbGenreList: data.genreList,
        });
      });
    }
    // API.getFunkoPopData()
    //   .then((res) => {
    //     const { data } = res;
    //     setDBFunkoData(data);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container-fluid genreList">
      <GenreList />
    </div>
  );
}

export default Funkos;
