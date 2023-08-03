import React, { useState, useEffect } from "react";
import APICard from "./APICard";

const RandomGen = (props) => {
  const [randCount, setRandCount] = useState(0);
  const [randApi, setRandApi] = useState();

  const getRandApi = () => {
    if (props.filteredData) {
      let i = Math.floor(Math.random() * props.filteredData.length);
      console.log(props.filteredData[i]);
      setRandApi(props.filteredData[i]);
    } else if (props.allData) {
      let i = Math.floor(Math.random() * props.allData.length);
      console.log(props.allData[i]);
      setRandApi(props.allData[i]);
    } else {
      console.log("both data not true");
    }
  };

  return (
    <>
      {/* generate random api button */}
      <div className="row">
        <div className="col-md-3"></div>
        <button
          className="col-md-9"
          onClick={() => {
            props.setModal(true);
            getRandApi();
            setRandCount((prevCount) => prevCount + 1);
            console.log(randApi);
            console.log(randCount);
          }}
        >
          Random
        </button>
      </div>
      {props.modal && randApi && (
        <APICard
          api={randApi.API}
          desc={randApi.Description}
          auth={randApi.Auth}
          https={randApi.HTTPS}
          cors={randApi.Cors}
          link={randApi.Link}
          cat={randApi.Category}
          setModal={props.setModal}
        ></APICard>
      )}
    </>
  );
};

export default RandomGen;
