import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import All from "./All";
import Categories from "./Categories";

const Main = () => {
  return (
    <>
      <div className="container">
        <h2>Random picture from Lorem Picsum to brighten up your day!</h2>
        <img src="https://picsum.photos/300"></img>
      </div>
    </>
  );
};

export default Main;
