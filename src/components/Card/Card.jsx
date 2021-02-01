import React from "react";

import "./Card.css";
import { useDataLayerValue } from "../../context/DataLayer";
import API from "../../utils/API";
import noData from "../../assets/noData.jpg";

function Card({ data, genre }) {
  const [{ user, authToken }] = useDataLayerValue();

  const handleAddFunkoPop = (e) => {
    e.preventDefault();
    const { name, number, image } = data;
    const { uid } = user;

    const funko = {
      genre: genre,
      name: name,
      number: number,
      image: image,
    };
    API.addFunkoPopTooUser(uid, funko, authToken)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

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
          <button className="addButton" onClick={handleAddFunkoPop}>
            I Have!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
