import React, { useState, useEffect } from "react";
import { MDBDataTableV5, MDBLink } from "mdbreact";
import { useDataLayerValue } from "../../context/DataLayer";

import "./GenreList.css";
import API from "../../utils/API";
import GenreContainer from "../GenreContainer";

const GenreList = () => {
  const [{ dbGenreList }] = useDataLayerValue();
  const [funkoSet, setFunkoSet] = useState([]);
  const [showNoFunkoSet, setShowNoFunkoSet] = useState(true);
  console.log({ funkoSet });

  const handleSearchGenre = (event) => {
    setFunkoSet([]);
    const query = event;
    console.log(`fetching picked genre => ${query}`);
    API.getPickedGenre(query)
      .then((res) => {
        const { data } = res;
        setFunkoSet(data);
        setShowNoFunkoSet(false);
      })
      .catch((err) => console.error(err));
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
        theadColor={"blue"}
        theadTextWhite
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
