import React from "react";

import "./Card.css";
import noData from "../../assets/noData.jpg";
import AddModal from "../AddModal/AddModal";

const Card = ({ data, genre }) => {
  return (
    <div className="card funkoCard">
      <div className="card-img-top text-center mt-3">
        <img
          src={data?.image || noData}
          alt={data?.name || `no data found`}
          className="funkoImage"
        />
      </div>
      <div className="card-body text-center">
        <hr className="mb-0" />
        <p className="number">{data?.number || `Pop!`}</p>
        <p className="name">{data?.name}</p>
        <div className="footer">
          <hr />
          {data?.user ? (
            <button className="addButton">Remove</button>
          ) : (
            <AddModal data={data} genre={genre} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
