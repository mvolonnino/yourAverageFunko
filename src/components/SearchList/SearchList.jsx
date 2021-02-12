import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";

import "./SearchList.css";
import GenreContainer from "../GenreContainer";

const SearchList = ({ funkos, genre, name, number }) => {
  const [funkoSet, setFunkoSet] = useState([]);
  let data = {};
  console.log({ funkos, genre, name, number, funkoSet });

  const handleSetGenre = async (data) => {
    await setFunkoSet([]);
    setFunkoSet(data);
  };

  const handleSetName = async (data) => {
    await setFunkoSet([]);
    setFunkoSet(data);
  };

  if (genre) {
    data = {
      columns: [
        {
          label: "Genre/Series",
          field: "genre",
          width: 200,
        },
      ],
      rows: [
        ...funkos?.map((funkoSet) => {
          return {
            genre: funkoSet.genre,
            clickEvent: () => handleSetGenre(funkoSet),
          };
        }),
      ],
    };
  }

  if (name || number) {
    data = {
      columns: [
        {
          label: "Image",
          field: "image",
          width: 25,
          sort: "disabled",
        },
        {
          label: "Name",
          field: "name",
          width: 200,
        },
        {
          label: "Number",
          field: "number",
          width: 50,
        },
        {
          label: "Genre/Series",
          field: "genre",
          width: 200,
        },
      ],
      rows: [
        ...funkos?.map((funkoSet) => {
          return {
            clickEvent: () => handleSetName(funkoSet),
            genre: funkoSet.genre,
            name: funkoSet.funkoData[0].name,
            image: (
              <img
                src={funkoSet.funkoData[0].image}
                alt={`${funkoSet.funkoData[0].name} thumbnail`}
                className="searchListImg"
              />
            ),
            number: funkoSet.funkoData[0].number,
          };
        }),
      ],
    };
  }

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
        searchLabel={"Search to narrow results"}
        theadColor={"blue"}
        theadTextWhite
        responsive
        data={data}
      />
      {Object.keys(funkoSet).length > 0 && (
        <GenreContainer funkoSet={funkoSet} />
      )}
    </>
  );
};

export default SearchList;
