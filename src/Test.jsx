import { useState, useEffect } from "react";
// import "./App.css";

function Test() {
  const [test, setTest] = useState({});

  const getData = async () => {
    const res = await fetch("https://api.publicapis.org/entries");

    const data = await res.json();
    setTest(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //  randomly generate api
  // create search function
  // sort by category

  // stretch goals: filter component

  return (
    <>
      <h1>TEsT</h1>
      <div>{JSON.stringify(test)}</div>
      {/* {test.categories.map((item) => {
        return (
          <div key={item.API}>
            <p>API NAME: {item.API}</p>
            <p>DESCRIPTION: {item.Description}</p>
            <p>Author: {item.Auth}</p>
            <p>HTTPS?: {item.HTTPS ? "true" : "false"}</p>
            <p>Cors?: {item.Cors}</p>
            <p>Link: {item.link}</p>
            <p>Category: {item.Category}</p>
          </div>
        );
      })} */}
    </>
  );
}

export default Test;
