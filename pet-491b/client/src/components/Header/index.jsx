import styles from "./header.module.css";
import logo_for_website from "../../images/logo_for_website.png";


function Header() {

  return (
    <div className={styles.top_bar}>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.img_logo}>
          <a href="/" className={styles.logoLink}>
            <img
              className={styles.logo}
              src= {logo_for_website}
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
                <a href="/petCare">Pet Care Providers</a>
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
        ></button>
      </header>
    </div>
  );
}

export default Header;