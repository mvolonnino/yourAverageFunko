import React, { useEffect, useState } from 'react';

import { useDataLayerValue } from '../../../../context/DataLayer';
import { auth } from '../../../../fire';
import funkoBrand from '../../../../img/funkoBrand.png';

import './Home.css';

function Home() {
  const [{ user }, dispatch] = useDataLayerValue();

  return (
    <div className="application container-fluid">
      <div className="jumbotron">
        <img src={funkoBrand} alt="" className="funkoBrand" />
        <h1 className="text-center">{`Logged in as ${user?.displayName}`}</h1>
        <button
          className="btn btn-danger"
          onClick={() =>
            auth
              .signOut()
              .then(() => {
                dispatch({
                  type: 'LOGOUT'
                });
              })
              .catch(err => {
                console.error(err);
              })
          }
        >
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Home;
