import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../assets/NavBar.module.css";
import RandomGen from "./RandomGen-copy";

const NavBar = (props) => {
  return (
    <header className={styles.navbar}>
      <ul>
        <li>
          <NavLink
            className={(navdata) => (navdata.isActive ? styles.active : "")}
            to="/"
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navdata) => (navdata.isActive ? styles.active : "")}
            to="/categories"
          >
            Categories
          </NavLink>
        </li>
        <RandomGen
          modal={props.modal}
          setModal={props.setModal}
          allData={props.allData}
          filteredData={props.filteredData}
        ></RandomGen>
      </ul>
    </header>
  );
};

export default NavBar;
