import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../assets/NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <ul>
        <li>
          <NavLink
            className={(navdata) => (navdata.isActive ? styles.active : "")}
            to="/main"
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
        <li>
          <NavLink
            className={(navdata) => (navdata.isActive ? styles.active : "")}
            to="/random"
          >
            Random API
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
