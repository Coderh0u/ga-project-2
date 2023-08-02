import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RandomGen from "./components/RandomGen";
import Main from "./components/Main";
import Categories from "./components/Categories";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import Search from "./components/Search";
import Filter from "./Filter";

import {
  Grid,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Box,
  Slide,
} from "@mui/material";
import ApiIcon from "@mui/icons-material/Api";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [modal, setModal] = useState(false);
  const [allData, setAllData] = useState();
  const [menuModal, setMenuModal] = useState(false);
  // filter for Auth, HTTPS, Cors ====================
  const [auth, setAuth] = useState(false);
  const [https, setHttps] = useState(false);
  const [cors, setCors] = useState(false);
  const [filteredData, setFilteredData] = useState();
  // =================================================
  const getAll = async () => {
    const res = await fetch("https://api.publicapis.org/entries");
    const data = await res.json();
    // cut here
    // const dummyArr = [];
    // if (auth) {
    //   dummyArr.push(data.entries.filter((entry) => entry.Auth === ""));
    // } else {
    //   dummyArr.push(data.entries);
    // }
    // end cut
    setAllData(data.entries);
  };

  useEffect(() => {
    getAll();
  }, []);

  // Filter function
  const filterData = () => {
    const filterArr = [];

    // for (const entry of allData) {
    //   if (auth && entry.Auth !== "") {
    //     filterArr.push(entry)
    //   } else if (https && entry.HTTPS === true) {
    //     filterArr.push(entry)
    //   } else if (cors && entry.cors === "no") {
    //     filterArr.push(entry)
    //   }
    // }

    // allData.map((entry))
    // if (auth) {
    //   const filtered =
    // }

    const filterAuth = () => {
      return allData.filter((entry) => entry.Auth === "");
    };
    const filterHttps = () => {
      return allData.filter((entry) => entry.HTTPS === true);
    };
    const filterCors = () => {
      return allData.filter((entry) => entry.Cors === "no");
    };
    if (auth) {
      filterArr.push(filterAuth);
    }
    if (https) {
      filterArr.push(filterHttps);
    }
    if (cors) {
      filterArr.push(filterCors);
    }
    const outputArr = [filterArr.forEach((func) => func())];

    setFilteredData();
  };

  useEffect(() => {
    filterData();
  }, [auth, https, cors]);
  // =================================================

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" maxWidth="100%">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              setMenuModal(true);
            }}
          >
            <MenuIcon />
          </IconButton>

          <ApiIcon />
          <Typography variant="h4">API of APIs</Typography>
          <Search allData={allData}></Search>
          <Filter
            auth={auth}
            setAuth={setAuth}
            https={https}
            setHttps={setHttps}
            cors={cors}
            setCors={setCors}
            allData={allData}
            filteredData={filteredData}
          ></Filter>
        </Toolbar>
      </AppBar>
      <main>
        <Container maxWidth="small">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <NavBar></NavBar>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Container>

        <Modal
          open={menuModal}
          onClose={() => {
            setMenuModal(false);
          }}
        >
          <Slide direction="down" in={menuModal}>
            <Box>
              <Typography variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Slide>
        </Modal>
        <RandomGen modal={modal} setModal={setModal}></RandomGen>
        <Routes>
          <Route path="/main" element={<Main></Main>}></Route>
          <Route path="/categories" element={<Categories></Categories>}></Route>
          <Route
            path="/main/:item"
            element={
              <CategoryList
                allData={allData}
                modal={modal}
                setModal={setModal}
              ></CategoryList>
            }
          ></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
