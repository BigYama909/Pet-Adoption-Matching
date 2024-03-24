import styles from "./Header.module.css";
import { useTheme } from '/src/Components/ThemeContext.jsx'; 

function Header() {
  const {isNightMode, toggleNightMode} = useTheme();

   // Dynamically set the header class based on isNightMode
   const headerCLass = isNightMode ? styles.nightHeader : styles.header;
   const navLink = isNightMode ? styles.nightNavItem : styles.navItem;
   const toggle = isNightMode ? styles.lightModeToggle: styles.nightModeToggle;
  return (
    <div className={styles.top_bar}>
      <header className={headerCLass}>
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
              <li className={navLink}>
                <a href="/">Home</a>
              </li>
              <li className={navLink}>
                <a href="/about">About Us</a>
              </li>
              <li className={navLink}>
                <a href="/providers">Pet Care Providers</a>
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
          className={toggle}
          aria-label="Toggle night mode"
          onClick={toggleNightMode}
        ></button>
      </header>
    </div>
  );
}

export default Header;
