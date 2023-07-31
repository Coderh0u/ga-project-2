import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RandomGen from "./components/RandomGen";
import Main from "./components/Main";
import Categories from "./components/Categories";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";

function App() {
  const [modal, setModal] = useState(false);
  const [allData, setAllData] = useState();

  const getAll = async () => {
    const res = await fetch("https://api.publicapis.org/entries");
    const data = await res.json();
    setAllData(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className="container">
        <NavBar></NavBar>
        <Routes>
          <Route path="/main" element={<Main></Main>}></Route>
          <Route path="/categories" element={<Categories></Categories>}></Route>
          <Route
            path="/main/:item"
            element={<CategoryList allData={allData}></CategoryList>}
          ></Route>
          <Route
            path="/random"
            element={<RandomGen modal={modal} setModal={setModal}></RandomGen>}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
