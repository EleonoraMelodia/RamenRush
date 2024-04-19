// FooterItems.jsx

import React from "react";
import styles from "./Footer.module.css"; // Importa lo stile del componente FooterItems

const FooterItems = ({ Links, title }) => {
  return (
    <ul>
      <h1 className={styles.title}>{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className={styles.link}
            href={link.link} >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterItems;
