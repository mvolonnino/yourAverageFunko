import React, { useState, useEffect } from "react";

import "./Funkos.css";
import API from "../../../../utils/API";
import { GenreContainer, GenreList } from "../../../../components";
import { useDataLayerValue } from "../../../../context/DataLayer";

function Funkos() {
  const [{ dbGenreList, searchedFunkoPops }, dispatch] = useDataLayerValue();
  console.log({ dbGenreList, searchedFunkoPops });

  useEffect(() => {
    if (dbGenreList.length === 0) {
      console.log("funkos.jsx - fetching genre list...");
      API.getGenreListData().then((res) => {
        const { data } = res;
        dispatch({
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
    // <>
    //   <div className="container genreList">
    //     <div className="row">
    //       <div className="col-md-6 genreCol">
    //         <ul>
    //           {" "}
    //           Genres and Series Available
    //           {dbFunkoData?.map((funkoSet, i) => (
    //             <li className="series">
    //               <a href={`#${funkoSet.genre}`}>{funkoSet.genre}</a>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="container funkosContainer">
    //     {dbFunkoData?.map((funkoSet, i) => (
    //       <GenreContainer funkoSet={funkoSet} key={i} />
    //     ))}
    //   </div>
    // </>
    <>
      <div className="container-fluid genreList">
        <GenreList />
      </div>
    </>
  );
}

export default Funkos;
