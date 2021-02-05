import React from "react";
import Card from "../../components/Card";
import "./GenreContainer.css";

import { MDBAnimation } from "mdbreact";

function GenreContainer({ funkoSet }) {
  return (
    <>
      {funkoSet.funkoData ? (
        <MDBAnimation type="fadeInLeft" delay=".1s">
          <span className="anchor" id={funkoSet.genre}></span>
          <small className="genreTitle">{funkoSet.genre}</small>
          <div className="container-fluid genre">
            {funkoSet?.funkoData?.map((data, i) => {
              return <Card data={data} genre={funkoSet.genre} key={i} />;
            })}
          </div>
        </MDBAnimation>
      ) : (
        <>
          <span className="anchor" id={funkoSet.genre}></span>
          <small className="genreTitle">{funkoSet.genre}</small>
          <div className="container-fluid genre noFunkoPops">
            Hm doesnt seem to be any funko pops in this collection, well look to
            update soon
          </div>
        </>
      )}
    </>
  );
}

export default GenreContainer;
