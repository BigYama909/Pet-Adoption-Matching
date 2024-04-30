import styles from "./Header.module.css";
import { useTheme } from '/src/Components/ThemeContext.jsx'; 
import user_icon from "./user_icon.webp"

function Header() {
  const {isNightMode, toggleNightMode} = useTheme();

   // Dynamically set the header class based on isNightMode
   const headerClass = isNightMode ? styles.nightHeader : styles.header;
   const navLink = isNightMode ? styles.nightNavItem : styles.navItem;
   const toggle = isNightMode ? styles.lightModeToggle: styles.nightModeToggle;

  return (
    <div className={styles.top_bar}>
      <header className={headerClass}>
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

        <div className={styles.iconsContainer}>
          <a href="/userprofile" className={styles.iconLink}>
            <img
              className={styles.userIcon}
              src={user_icon}
              alt="User Profile"
            />
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
