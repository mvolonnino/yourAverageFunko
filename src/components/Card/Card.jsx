import React from "react";

import "./Card.css";
import { useDataLayerValue } from "../../context/DataLayer";
import API from "../../utils/API";

function Card({ data, genre }) {
  const [user] = useDataLayerValue();

  const handleAddFunkoPop = (e) => {
    e.preventDefault();
    const { name, number, image } = data;
    const funko = {
      genre: genre,
      name: name,
      number: number,
      image: image,
    };
    const { uid } = user.user;
    API.addFunkoPopTooUser(uid, funko)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="card funkoCard m-3">
      <div className="card-img-top text-center mt-3">
        <img src={data.image} alt={data.name} className="funkoImage" />
      </div>
      <div className="card-body text-center">
        <hr className="mb-0" />
        <p className="number">{data.number}</p>
        <p className="name">{data.name}</p>
        <div className="footer">
          <hr />
          <button className="btn btn-primary" onClick={handleAddFunkoPop}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
