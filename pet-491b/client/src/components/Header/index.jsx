import styles from "./header.module.css";
import { useTheme } from '../../components/ThemeContext.js'
import user_icon from "./user_icon.webp"
import logout from "./logout.jpg"
import logo_for_website from "../../images/logo_for_website.png";
import { useState } from "react";
import  { useEffect } from "react";
import React from "react";


function Header() {
  const {isNightMode, toggleNightMode} = useTheme();

   // Dynamically set the header class based on isNightMode
   const headerClass = isNightMode ? styles.nightHeader : styles.header;
   const navLink = isNightMode ? styles.nightNavItem : styles.navItem;
   const toggle = isNightMode ? styles.lightModeToggle: styles.nightModeToggle;

   const handleLogout = () => {
		console.log("logout");
		window.open("http://localhost:8080/auth/logout", "_self");
		localStorage.removeItem("token");
		localStorage.removeItem("email");
        localStorage.removeItem("name");
		window.location = "/login";
	};

  return (
    <div className={styles.top_bar}>
      <header className={headerClass}>
        {/* Logo */}
        <div className={styles.img_logo}>
          <a href="/home" className={styles.logoLink}>
            <img
              className={styles.logo}
              src={logo_for_website}
              alt="Pet Adoption Match Logo"
            />
          </a>
        </div>

        <div className={styles.nav_bar}>
          {/* Navigation Bar */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {/* Enclose nav items in a ul for semantic structure */}
              <li className={navLink}>
                <a href="/home">Home</a>
              </li>
              <li className={navLink}>
                <a href="/about">About Us</a>
              </li>
              <li className={navLink}>
                <a href="/policy">Privacy Policy</a>
              </li>
              <li className={navLink}>
                <a href="/petCare">Pet Care Providers</a>
              </li>
              <li className={navLink}>
                <a href="/matching">Matching</a>
              </li>
              <li className={navLink}>
                <a href="/donate">Donate Now</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.iconsContainer}>
          <a href="/userprofile" className={styles.iconLink}>
            <img
              className={styles.userIcon}
              src={user_icon}
              alt="User Profile"
            />
          </a>
        </div>

        {/* Logout button */}
        <div >
          <button onClick={handleLogout}>
            <img className={styles.userIcon} src={logout} alt="my image" onClick={handleLogout}/>
          </button>
        </div>



        {/* Night Mode Toggle Button */}
        <button
          className={toggle}
          aria-label="Toggle night mode"
          onClick={toggleNightMode}
        ></button>
      </header>
    </div>
  );
}

export default Header;