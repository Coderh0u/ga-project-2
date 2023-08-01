import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import APICard from "./APICard";

const CategoryList = (props) => {
  const params = useParams();
  const [entriesInCat, setEntriesInCat] = useState();
  const idRef = useRef(0);

  const getEntriesInCat = async () => {
    const res = await fetch(
      "https://api.publicapis.org/entries?category=" +
        params.item.split(" ").slice(0, 1)
    );
    const data = await res.json();
    setEntriesInCat(data);
  };

  useEffect(() => {
    getEntriesInCat();
  }, []);
  return (
    <>
      <h1>{params.item}</h1>
      {entriesInCat && (
        <>
          {entriesInCat.entries.map((item, idx) => {
            return (
              <div className="row">
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-2">
                      <strong>API: </strong>
                    </div>
                    <div className="col-md-7">
                      <strong>{item.API}</strong>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">Description: </div>
                    <div className="col-md-7">{item.Description}</div>
                  </div>
                </div>
                <button
                  className="col-md-3"
                  onClick={() => {
                    props.setModal(true);
                    idRef.current = idx;
                  }}
                >
                  More Info
                </button>
              </div>
            );
          })}
        </>
      )}
      {props.modal && (
        <APICard
          api={entriesInCat.entries[idRef.current].API}
          desc={entriesInCat.entries[idRef.current].Description}
          auth={entriesInCat.entries[idRef.current].Auth}
          https={entriesInCat.entries[idRef.current].HTTPS}
          cors={entriesInCat.entries[idRef.current].Cors}
          link={entriesInCat.entries[idRef.current].Link}
          cat={entriesInCat.entries[idRef.current].Category}
          setModal={props.setModal}
        ></APICard>
      )}
    </>
  );
};

export default CategoryList;
