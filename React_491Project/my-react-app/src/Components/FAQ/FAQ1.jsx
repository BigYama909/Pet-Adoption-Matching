import React, { useState } from 'react';
import styles from "./FAQ.module.css";
import OrangePhone from "./Images/OrangePhone.svg";
import PetAdoption from "./Images/pet_adoption.png";

function FAQ() {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQItem = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What's the difference between a shelter and a rescue?",
      answer: `Shelters are brick and mortar facilities where homeless pets are cared for while they await adoption. They are public or privately owned and often use words like “humane society” or “SPCA” in their name, although they are all separate independently run organizations and not affiliated with one another. Shelters often allow same day adoptions and have staff, volunteers, and hours of operation when they are open for adopters to meet pets.
               <br />
               Rescues are privately operated groups that typically rely on volunteers and a network of loving foster homes to board pets while they await adoption, although they may also have a physical facility. They typically hold adoption events at pet stores, parks, and other pet-friendly locations on weekends so adopters can meet pets and inquire about the rescue's adoption process.`,
    },
    // Add more FAQ items here...
  ];

  return (
    <section className={styles.FAQ_section}>
      <div className={`${styles.w_layout_blockcontainer} ${styles.main_container_of_faq}`}>
        <div className={styles.faq_container}>
          <h3 className={styles.h1_title}>Frequently asked questions</h3>
          <div className={styles.faq_row}>
            <div className={`${styles.faq_left_block} ${styles.shadow} ${styles.orange_shadow}`}>
              <div className={styles.faq_left_block_text_wrapper}>
                <h4 className={styles.your_question}>You have more questions?</h4>
                <a href="tel:1234567890" className={styles.phone_link}>
                  <img src={OrangePhone} loading="lazy" alt="phone icon" className={`${styles.phone_icon} ${styles.hide_on_mobile}`} />
                  <div className={styles.call_us}>Call us: 1234567890</div>
                </a>
              </div>
              <div className={styles.faq_image_wrapper}>
                <img className={styles.faq_img} src={PetAdoption} alt="FAQ" />
              </div>
            </div>

            <div className={styles.faq_accordion_wrapper}>
              {/* Dynamically render accordion blocks */}
              {faqItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={styles.accordion_block} onClick={() => toggleFAQItem(index)}>
                    <div className={styles.accordion_row}>
                      <div className={styles.question_title}>{item.question}</div>
                      <div className={styles.accordion_toggle_indicator}>
                        {/* Toggle indicator icons */}
                      </div>
                    </div>
                    {openFAQIndex === index && (
                      <div className={styles.accordion_para_wrapper}>
                        <div className={styles.accordion_space}></div>
                        <p className={styles.paragraph_faq} dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                      </div>
                    )}
                  </div>
                  <div className={styles.horizontal_divider}></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
