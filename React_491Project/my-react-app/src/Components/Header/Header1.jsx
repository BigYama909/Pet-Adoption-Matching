import React, { useState } from 'react';
import styles from "./Header.module.css";

function Header() {
    // State to track if night mode is enabled
    const [isNightMode, setIsNightMode] = useState(false);
  
    // Function to toggle night mode
    const toggleNightMode = () => {
      setIsNightMode(!isNightMode);
    };
  
    // Add a method to dynamically change the class or style based on isNightMode
    const getHeaderClassName = () => {
      return isNightMode ? styles.nightHeader : styles.header;
    };
    return (
        <div className={styles.top_bar}>
          <header className={styles.header}>
            {/* Logo */}
            <div className={styles.img_logo}>
              <a href="/" className={styles.logoLink}>
                <img
                  className={styles.logo}
                  src="/src/assets/logo_for_website.png"
                  alt="Pet Adoption Match Logo"
                />
              </a>
            </div>
    
            <div className={styles.nav_bar}>
              {/* Navigation Bar */}
              <nav className={styles.nav}>
                <ul className={styles.navList}>
                  {/* Enclose nav items in a ul for semantic structure */}
                  <li className={styles.navItem}>
                    <a href="/">Home</a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="/about">About Us</a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="/providers">Pet Care Providers</a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="/matching">Matching</a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="/donate">Donate Now</a>
                  </li>
                </ul>
              </nav>
            </div>
    
            {/* Login/Sign Up Section */}
            <div className={styles.loginSignup}>
              <a href="/login" className={styles.loginLink}>
                <button className={styles.loginButton}>Login</button>
              </a>
              <a href="/signup" className={styles.signupLink}>
                <button className={styles.signupButton}>Sign Up</button>
              </a>
            </div>
    
            {/* Night Mode Toggle Button */}
            <button
              className={styles.nightModeToggle}
              aria-label="Toggle night mode"
            >
                {isNightMode ? 'Day Mode' : 'Night Mode'} {/* Button text indicating current mode */}
            </button>
          </header>
        </div>
      );
    }
    
    export default Header;
    