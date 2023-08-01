import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CategoryList = (props) => {
  const params = useParams();
  const [entriesInCat, setEntriesInCat] = useState();

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
          {entriesInCat.entries.map((item) => {
            return (
              <div className="row">
                <div className="col-md-3">API: </div>
                <div className="col-md-6">{item.API}</div>
                <button className='col-md-3' onClick={props.setModal(true)}>More Info</button>
              </div>
              
            );
          })}
        </>
      )}
    </>
  );
};

export default CategoryList;
