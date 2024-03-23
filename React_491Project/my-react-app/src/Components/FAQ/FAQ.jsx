import styles from "./FAQ.module.css";
import OrangePhone from "./Images/OrangePhone.svg"
import PetAdoption from "./Images/pet_adoption.png"
import React, {useState} from 'react';

function FAQ() {
  
  // State to manage which FAQ item is open, null means none are open
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQItem = (index) => {
    // If the clicked item is already open, close it, otherwise open the clicked item
    if (openFAQIndex === index) {
      setOpenFAQIndex(null);
    } else {
      setOpenFAQIndex(index);
    }
  };

  // Assuming you might have more FAQ items, here's just one for demonstration
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
              {/* Example Accordion Block */}

              <div className={styles.accordion_block}>
                <div className={styles.accordion_row}>
                  <div className={styles.question_title}>What's the difference between a shelter and a rescue?</div>
                  <div className={styles.accordion_toggle_indicator}>
                    <div className={styles.horizontal_line}>
                      <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.3125 1.13525L11.3125 1.13525" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div className={styles.vertical_line}>
                      <svg width="3" height="14" viewBox="0 0 3 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.8125 11.6353L0.8125 0.635254" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className={styles.accordion_para_wrapper}>
                  <div className={styles.accordion_space}></div>
                  <p className={styles.paragraph_faq}>
                    Shelters are brick and mortar facilities where homeless pets are cared for while they await adoption. They are public or privately owned and often use words like “humane society” or “SPCA” in their name, although they are all separate independently run organizations and not affiliated with one another. Shelters often allow same day adoptions and have staff, volunteers, and hours of operation when they are open for adopters to meet pets.
                    <br />
                    Rescues are privately operated groups that typically rely on volunteers and a network of loving foster homes to board pets while they await adoption, although they may also have a physical facility. They typically hold adoption events at pet stores, parks, and other pet-friendly locations on weekends so adopters can meet pets and inquire about the rescue's adoption process.
                  </p>
                </div>
              </div>
              <div className={styles.horizontal_divider}></div>

              {/* Add more accordion blocks following the same structure */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
