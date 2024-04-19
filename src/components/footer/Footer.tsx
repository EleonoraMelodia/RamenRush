// Footer.jsx

import React from "react";
import FooterItems from "./FooterItems";
import { CLIENTSERVICE, CAREERS, SUPPORT, INFO, ICONS } from "./footerOptions";
import styles from "./Footer.module.css"; // Importa lo stile del footer

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <FooterItems Links={CLIENTSERVICE} title="LEGAL" />
        <FooterItems Links={CAREERS} title="CARRERS" />
        <FooterItems Links={SUPPORT} title="SUPPORT" />
        <FooterItems Links={INFO} title="FAQ" />
      </div>
      <div className={styles.footerInfo}>
        <span>© 2024 All rights not reserved .</span>
        <span>Terms | Privacy Policy</span>
        {/* <SocialIcons icons={ICONS} /> */}
      </div>
    </footer>
  );
};

export default Footer;
