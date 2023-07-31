import React, { useState, useEffect } from "react";
import Card from "./Card";

const RandomGen = (props) => {
  const [randCount, setRandCount] = useState(0);
  const [randApi, setRandApi] = useState();
  const getRandApi = async () => {
    const res = await fetch("https://api.publicapis.org/random");
    const data = await res.json();
    setRandApi(data);
  };

  useEffect(() => {
    getRandApi();
  }, [randCount]);

  return (
    <>
      {/* generate random api button */}
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-3"></div>
        <div className="col-md-3"></div>
        <button
          className="col-md-3"
          onClick={() => {
            props.setModal(true);
            setRandCount((prevCount) => prevCount + 1);
          }}
        >
          Generate Random (actual) API
        </button>
      </div>
      {props.modal && randApi && (
        <Card
          api={randApi.entries[0].API}
          desc={randApi.entries[0].Description}
          auth={randApi.entries[0].Auth}
          https={randApi.entries[0].HTTPS}
          cors={randApi.entries[0].Cors}
          link={randApi.entries[0].Link}
          cat={randApi.entries[0].Category}
          setModal={props.setModal}
        ></Card>
      )}
    </>
  );
};

export default RandomGen;
