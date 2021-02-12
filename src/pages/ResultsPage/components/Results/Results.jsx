import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Results.css";
// import { useDataLayerValue } from "../../../../context/DataLayer";
import { SearchList } from "../../../../components";

function Results() {
  // const [{ searchedFunkoPops }] = useDataLayerValue();
  const [show, setShow] = useState({
    genre: false,
    name: false,
    numer: false,
    msg: true,
  });
  const location = useLocation();
  const { search, state } = location;
  const searched = search.replace("?", "");
  const searchedQuery = searched.replace("%20", " ");

  useEffect(() => {
    if (!show.genre && !show.name && !show.number) {
      if (!show.msg) {
        setShow({
          ...show,
          msg: true,
        });
      }
    }
  }, [show]);

  return (
    <div className="container-fluid resultsContainer">
      <div className="jumbotron text-center text-white bg-dark">
        <div className="row justify-content-center">
          <h5 className="">{`Showing search results for : ${searchedQuery}`}</h5>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="searchedResult">Series/Collections Matches</div>
            <button
              className="searchedResultAmt btn"
              onClick={() =>
                setShow({
                  name: false,
                  genre: !show.genre,
                  number: false,
                  msg: false,
                })
              }
            >
              {state.genre.length}
            </button>
          </div>
          <div className="col-md-4">
            <div className="searchedResult">Name Matches</div>
            <button
              className="searchedResultAmt btn"
              onClick={() =>
                setShow({
                  name: true,
                  genre: false,
                  number: false,
                  msg: false,
                })
              }
            >
              {state.name.length}
            </button>
          </div>
          <div className="col-md-4">
            <div className="searchedResult">Number Matches</div>
            <button
              className="searchedResultAmt btn"
              onClick={() =>
                setShow({
                  name: false,
                  genre: false,
                  number: true,
                  msg: false,
                })
              }
            >
              {state.number.length}
            </button>
          </div>
        </div>
      </div>
      {show.msg && (
        <div className="noFunkoSet text-center mt-5">
          Please select from the buttons above to view funko pops
        </div>
      )}
      {show.genre && <SearchList funkos={state.genre} genre={true} />}
      {show.name && <SearchList funkos={state.name} name={true} />}
      {show.number && <SearchList funkos={state.number} number={true} />}
    </div>
  );
}

export default Results;
