import styles from "./header.module.css";
import { useTheme } from '../../components/ThemeContext.js'
import user_icon from "./user_icon.webp"
import logout from "./log_out.jpg"
import logo_for_website from "../../images/logo_for_website.png";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const {isNightMode, toggleNightMode} = useTheme();

  // Dynamically set the header class based on isNightMode
  const headerClass = isNightMode ? styles.nightHeader : styles.header;
  const navLink = isNightMode ? styles.nightNavItem : styles.navItem;
  const toggle = isNightMode ? styles.lightModeToggle : styles.nightModeToggle;

  const handleLogout = () => {
    console.log("logout");
    window.open("https://pet-adoption-matching.onrender.com/auth/logout", "_self");
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
          <Link to="/home" className={styles.logoLink}>
            <img
              className={styles.logo}
              src={logo_for_website}
              alt="Pet Adoption Match Logo"
            />
          </Link>
        </div>

        <div className={styles.nav_bar}>
          {/* Navigation Bar */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {/* Enclose nav items in a ul for semantic structure */}
              <li className={navLink}>
                <Link to="/home">Home</Link>
              </li>
              <li className={navLink}>
                <Link to="/about">About Us</Link>
              </li>
              <li className={navLink}>
                <Link to="/policy">Privacy Policy</Link>
              </li>
              <li className={navLink}>
                <Link to="/petCare">Pet Care Providers</Link>
              </li>
              <li className={navLink}>
                <Link to="/matching">Matching</Link>
              </li>
              <li className={navLink}>
                <Link to="/donate">Donate Now</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.iconsContainer}>
          <Link to="/userprofile" className={styles.iconLink}>
            <img
              className={`${styles.userIcon} ${styles.userProfileButton}`} // Apply userProfileButton style
              src={user_icon}
              alt="User Profile"
            />
          </Link>
        </div>

        {/* Logout button */}
        <div>
          <button onClick={handleLogout} className={styles.logoutButton}>  {/* Apply logoutButton style */}
            <img className={styles.loggoutIcon} src={logout} alt="Logout"/>
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
