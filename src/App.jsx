import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RandomGen from "./components/RandomGen";
import Main from "./components/Main";
import Categories from "./components/Categories";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import Search from "./components/Search";
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

  const getAll = async () => {
    const res = await fetch("https://api.publicapis.org/entries");
    const data = await res.json();
    setAllData(data.entries);
  };

  useEffect(() => {
    getAll();
  }, []);

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
