import React, { useEffect, useContext } from "react";

import "./Funkos.css";
import { getAllGenres } from "../../../../utils";
import { GenreList } from "../../../../components";
import { FunkosContext } from "../../../../context";

function Funkos() {
  const { funkoState, funkoDispatch } = useContext(FunkosContext);
  const { dbGenreList } = funkoState;

  useEffect(() => {
    if (dbGenreList.length === 0) {
      console.log("fetching genre list...");
      try {
        getAllGenres().then((res) => {
          funkoDispatch({
            type: "SET_DB_GENRELIST",
            dbGenreList: res,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className="container-fluid genreList">
      <h1 className="text-center">Collections and Series of Funko Pops!</h1>
      <GenreList />
    </div>
  );
}

export default Funkos;
