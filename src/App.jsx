import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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
    setAllData(data.entries);
  };

  useEffect(() => {
    getAll();
  }, []);

  // Filter function
  const filterData = () => {
    if (allData) {
      let interArr = [...allData];
      const filterArr = [];
      // filter by Auth
      const filterAuth = () => {
        interArr = interArr.filter((entry) => entry.Auth === "");
      };
      // filter by HTTPS
      const filterHttps = () => {
        interArr = interArr.filter((entry) => entry.HTTPS === true);
      };
      // filter by Cors
      const filterCors = () => {
        interArr = interArr.filter((entry) => entry.Cors === "no");
      };
      // compiling filter
      if (auth) {
        filterArr.push(filterAuth);
      }
      if (https) {
        filterArr.push(filterHttps);
      }
      if (cors) {
        filterArr.push(filterCors);
      }

      console.log("filterArr: ", filterArr);

      for (let i = 0; i < filterArr.length; i++) {
        filterArr[i]();
      }
      setFilteredData(interArr);
    }
  };

  useEffect(() => {
    filterData();
    // const uniqueOutputArr = [...new Set(interArr)];
    // setFilteredData(uniqueOutputArr);
    // outputArr = [];
  }, [auth, https, cors]);

  // =================================================

  return (
    <>
      <CssBaseline />
      <AppBar position="relative" maxWidth="100%">
        {/* Menu bar? */}
        <Toolbar>
          {/* <IconButton
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
          </IconButton> */}

          {/* Title of Website ===============================================================*/}
          <ApiIcon />
          <Typography variant="h4">API of APIs</Typography>

          {/* search bar */}
          <Search
            allData={allData}
            filteredData={filteredData}
            setModal={setModal}
            modal={modal}
          ></Search>

          {/* filter component ===============================================================*/}
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
          <Grid item xs={8}>
            <NavBar
              modal={modal}
              setModal={setModal}
              allData={allData}
              filteredData={filteredData}
            ></NavBar>
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
        {/* <RandomGen modal={modal} setModal={setModal}></RandomGen> */}
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
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
