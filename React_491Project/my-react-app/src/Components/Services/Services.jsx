import styles from "./Services.module.css";
import Decorative from "./Images/Decorative.svg"
import DogCare from "./Images/Group-40287.svg"
import CatCare from "./Images/Group-40286.svg"
import PetGrooming from "./Images/Group-40289.svg"
import VeterinaryCare from "./Images/Layer_1.svg"
import Boarding from "./Images/Group-40291.svg"
import Health from "./Images/Group-40290.svg"

function Services() {
    return (
        <section className="service_section">
        <div className={`${styles.w_layout_blockcontainer} ${styles.main_container} ${styles.w_container}`}>
          <div className={styles.service_container}>
            <div className={styles.service_heading_wrapper}>
              <h3 className={styles.h1}>Some recommend services for your pet</h3>
              <img src={Decorative} loading="lazy" alt="" className= {`${styles.decorative} ${styles.service}`} />
            </div>
            <div className={styles.service_blocks_wrapper}>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.orange_shadow}`}>
                <img src={DogCare} loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Dog Care</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}>Spacious and clean boarding facilities are designed with your dog's comfort in mind.</p>
              </div>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.green_shadow}`}>
                <img src={CatCare} loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Cat Care</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}>Dedicated team of caretakers ensures that your cat receives attention at home.</p>
              </div>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.light_purple_shadow}`}>
                <img src={PetGrooming} loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Pet Grooming</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}>Spacious and clean boarding facilities are designed with your dog's comfort in mind.</p>
              </div>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.violet_shadow}`}>
                <img src={VeterinaryCare}loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Veterinary Care</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}>We are committed to providing exceptional veterinary care for your beloved pets.</p>
              </div>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.light_blue_shadow}`}>
                <img src={Boarding} loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Pet Boarding</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}> facilities and advanced medical equipment to deliver best treatment options.</p>
              </div>

              <div className={`${styles.service_block} ${styles.shadow} ${styles.pink_shadow}`}>
                <img src={Health} loading="lazy" alt="Service icon" className={styles.service_block_icon} />
                <h4 className={styles.h6}>Health & Treatment</h4>
                <p className={`${styles.paragraph} ${styles.dark_font_color}`}>Spacious and clean boarding facilities are designed with your dog's comfort in mind.</p>
              </div>

            </div>
          </div>
        </div>
        <div id="Service" className={styles.anchor_div}></div>
      </section>
    );
}
export default Services 