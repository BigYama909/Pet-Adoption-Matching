import styles from "./SearchBar.module.css";
import adoptapet from "/src/assets/adoptapet.jpeg";

function SearchBar() {
  return (
    <>
    <div className={styles.big_container}>
      <img className={styles.homepage_image} src={adoptapet}></img>
      <div className={styles.overlay_text}>
        <p>
          Let's get started. Search pets by types or locations from shelters and
          rescues.
        </p>
      </div>
      <div className={styles.search_bar_container}>
        <div className={styles.search_bar}>
          <input className={styles.type_search} type="text" placeholder="Search Dogs, Kittens, etc"></input>
          <input className={styles.location_search} type="text" placeholder="90250, CA, USA"></input>
          <button className={styles.search_icon} type="submit">
            <i className={`fas fa-search ${styles.searchIcon}`}></i>
            Get Started</button>
        </div>
      </div>
    </div>
    <div className={styles.under_container}><hr></hr></div>
    </>
  );
}

export default SearchBar;
