import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { useDataLayerValue } from "../../context/DataLayer";

import "./GenreList.css";
import API from "../../utils/API";
import GenreContainer from "../GenreContainer";
import getFunkoDataByGenre from "../../utils/getFunkoDataByGenre";

const GenreList = () => {
  const [{ dbGenreList, dbFunkoPops }] = useDataLayerValue();
  const [funkoSet, setFunkoSet] = useState([]);
  const [showNoFunkoSet, setShowNoFunkoSet] = useState(true);

  const handleSearchGenre = (event) => {
    setFunkoSet([]);
    const query = event;
    if (dbFunkoPops.length === 0) {
      console.log(`fetching picked genre => ${query}`);
      API.getPickedGenre(query)
        .then((res) => {
          const { data } = res;
          setFunkoSet(data);
          setShowNoFunkoSet(false);
        })
        .catch((err) => console.error(err));
    } else {
      const data = getFunkoDataByGenre(dbFunkoPops, query);
      // timeout to allow for funkoSet to be reset to [] and show animation of picking new genre to client
      setTimeout(() => {
        setFunkoSet(data);
      }, 100);
      setShowNoFunkoSet(false);
    }
  };

  const data = {
    columns: [
      {
        label: "Genre/Series",
        field: "genre",
        width: 200,
        // sort: "disabled",
      },
    ],
    rows: [
      ...dbGenreList?.map((genre) => {
        return {
          genre: genre,
          clickEvent: () => handleSearchGenre(genre),
        };
      }),
    ],
  };

  useEffect(() => {
    if (Object.keys(funkoSet).length > 0) {
      document
        .getElementById(funkoSet.genre)
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [funkoSet]);

  return (
    <>
      <MDBDataTableV5
        className="customTable"
        hover
        searchTop
        searchBottom={false}
        entriesOptions={[10, 25, 50, 100]}
        entries={10}
        pagesAmount={4}
        fullPagination
        striped
        searchLabel={"Search Genries or Series"}
        theadTextWhite
        theadColor={"primary-color-dark"}
        tbodyTextWhite
        tbodyColor={"unique-color-dark"}
        responsive
        data={data}
      />
      {Object.keys(funkoSet).length > 0 && (
        <GenreContainer funkoSet={funkoSet} />
      )}
      {showNoFunkoSet && (
        <div className="noFunkoSet text-center mt-5">
          Please select from the table above to view funko pops in that
          collection
        </div>
      )}
    </>
  );
};

export default GenreList;
