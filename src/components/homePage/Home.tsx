// Home.jsx

import React, { useEffect, useState } from "react";
import classes from "./Home.module.css";
import ventagliosx from "../../assets/ventaglio.png";
import ventagliodx from "../../assets/ventaglioDx.png";
import girlRamen from "../../assets/girlRamen.png";
import Footer from "../footer/Footer";


const Home = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const rotationValue = scrollTop / 5; // Modifica il fattore divisorio per regolare la velocità della rotazione
      setRotationAngle(rotationValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.overlay}>
          <img
            className={classes.ventaglioDx}
            src={ventagliodx}
            alt="ventaglio destro"
            style={{ transform: `rotate(${rotationAngle * -1}deg)` }}
          />
          <img
            className={classes.ventaglioSx}
            src={ventagliosx}
            alt="ventaglio sinistro"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          />
        </div>
        <img className={classes.girlImage} src={girlRamen} alt="girl" />
      </div>

      <Footer />
    </>
  );
};

export default Home;
