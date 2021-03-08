import React from "react";

import "./Card.css";
import noData from "../../assets/noData.jpg";
import { AddModal, WantModal, RemoveModal } from "../index";

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
          {!data?.user && !data.want && (
            <div className="handleBtns">
              <AddModal data={data} genre={genre} />
              <WantModal data={data} genre={genre} />
            </div>
          )}
          {data?.user && <RemoveModal data={data} genre={genre} />}
          {data?.want && (
            <>
              <div className="handleBtns">
                <div className="alreadyHave">
                  <small>Already have this pop?</small>
                  <AddModal data={data} genre={genre} move={true} />
                </div>
                <div className="noWant">
                  <small>Don't want anymore?</small>
                  <RemoveModal data={data} genre={genre} wantList={true} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
