import React from 'react';
import styles from './Quick_FAQ.module.css'; // Assuming the CSS module is named Faq.module.css
import glanceImage1 from './Images/1.png'
import glanceImage2 from './Images/2.png'
import glanceImage3 from './Images/3.png'
import glanceImage4 from './Images/4.png'
function Faq() {
  return (
    <div className={styles.faq}>

      <div className={styles.head_of_faq}>
        <h2 className={styles.at_a_glance}><strong>At a glance</strong></h2>
        <h4 className={styles.some_faq}>Some frequently asked questions</h4>
      </div>

      <div className={styles.first_row}>

        <div className={styles.column1}>
          <div className={styles.img_and_text}>
            <img src={glanceImage1} alt="Glance 1"/>
            <div className={styles.text}>
              <h5>We do not have pets in our care.</h5>
              <p>Pet Adoption Match does not have a giant facility full of pets (Although that would be fun to work in).</p>
            </div>
          </div>
        </div>

        <div className={styles.column2}>
          <div className={styles.img_and_text}>
            <img src={glanceImage2} alt="Glance 2"/>
            <div className={styles.text}>
              <h5>We are not a shelter or rescue.</h5>
              <p>Pet Adoption Match is an online platform designed to streamline the process of connecting pets in need of homes with potential adopters effortlessly.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.second_row}>
        <div className={styles.column1}>
          <div className={styles.img_and_text}>
            <img src={glanceImage3} alt="Glance 3"/>
            <div className={styles.text}>
              <h5>We can't speak for a shelter or rescue.</h5>
              <p>We are unable to represent a shelter, rescue, or individual pet owner. We know it's hard to sometimes not get a response,
                  but we unfortunately can't tell you why.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.column2}>
          <div className={styles.img_and_text}>
            <img className={styles.pic4} src={glanceImage4} alt="Glance 4"/>
            <div className={styles.text}>
              <h5>What sets us apart from other platforms?</h5>
              <p>Social sharing, a detailed pet ownership cost calculator, advanced matching algorithm.
                  These functionalities enhance the adoption experience, providing valuable information 
                  and increasing the likelihood of successful, lasting matches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
