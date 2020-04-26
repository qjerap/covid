import React from "react";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faViruses } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return <div className={styles.nav}>

    <div>
        
        <h1><FontAwesomeIcon icon={faViruses} /> COVID-19 in CANADA</h1>
    </div>
  </div>;
};

export default Header;
