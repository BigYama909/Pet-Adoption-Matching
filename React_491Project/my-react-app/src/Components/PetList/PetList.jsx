import styles from "./PetList.module.css";
import Chuck from "./Images/Chuck.jpeg";
import Oliver from "./Images/Oliver.jpeg";
import Puntia from "./Images/Puntia.jpeg";
import Toby from "./Images/Toby.jpeg";
function PetList() {
  return (
    <div className={styles.pet_list}>
      <h2 className={styles.meet_our_pet}>Meet Our Pets</h2>
      <p className={styles.check_out}>
        Check out the latest pets looking for forever homes.
      </p>
      <ul className={styles.pet_items}>
        <li>
          <a href="/pet1">
            <img src={Chuck}></img>
          </a>
          <div className={styles.pet_description}>
            <p className={styles.pet_info}>Chuck</p>
            <p className={styles.pet_info}>Male, 10 years</p>
            <p className={styles.pet_info}>Los Angeles/ Barstow, CA</p>
          </div>
        </li>

        <li>
          <a href="/pet2">
            <img src={Oliver}></img>
          </a>
          <div className={styles.pet_description}>
            <p className={styles.pet_info}>Oliver</p>
            <p className={styles.pet_info}>Male, 10 years</p>
            <p className={styles.pet_info}>Los Angeles/ Barstow, CA</p>
          </div>
        </li>

        <li>
          <a href="/pet3">
            <img src={Puntia}></img>
          </a>
          <div className={styles.pet_description}>
            <p className={styles.pet_info}>Puntia</p>
            <p className={styles.pet_info}>Male, 10 years</p>
            <p className={styles.pet_info}>Los Angeles/ Barstow, CA</p>
          </div>
        </li>

        <li>
          <a href="/pet4">
            <img src={Toby}></img>
          </a>
          <div className={styles.pet_description}>
            <p className={styles.pet_info}>Toby</p>
            <p className={styles.pet_info}>Male, 10 years</p>
            <p className={styles.pet_info}>Los Angeles/ Barstow, CA</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default PetList;
