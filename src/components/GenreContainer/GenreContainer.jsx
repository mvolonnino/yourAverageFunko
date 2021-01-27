import React from "react";

import Card from "../../components/Card";
import "./GenreContainer.css";

function GenreContainer({ funkoSet }) {
  return (
    <>
      <small className="genreTitle">{funkoSet.genre}</small>
      <div className="container-fluid genre">
        {funkoSet?.funkoData?.map((data) => {
          return <Card data={data} genre={funkoSet.genre} />;
        })}
      </div>
    </>
  );
}

export default GenreContainer;
