import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [cat, setCat] = useState();
  const getCat = async () => {
    const res = await fetch("https://api.publicapis.org/categories");
    const data = await res.json();
    setCat(data);
  };

  useEffect(() => {
    getCat();
  }, []);
  return (
    <>
      <div className="container">
        {cat && (
          <>
            {/* Categories */}
            {cat.categories.map((item) => {
              return (
                <li key={item.categories}>
                  <Link to={"/main/" + item}>{item}</Link>
                </li>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
export default Categories;
