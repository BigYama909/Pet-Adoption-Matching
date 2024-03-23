import React, { useState, useRef } from "react";
import styles from "./FAQ.module.css";
import OrangePhone from "./Images/OrangePhone.svg";
import PetAdoption from "./Images/pet_adoption.png";

function FAQ() 
{
  // Change state to manage multiple open FAQ indices
  const [openFAQIndices, setOpenFAQIndices] = useState([]);

  const faqItemsLength = 5; // Adjust based on your actual FAQ items
  const accordionRefs = useRef(Array(faqItemsLength).fill(null));

  const toggleFAQItem = (index) => {
    // Check if the index already exists in the openFAQIndices array
    if (openFAQIndices.includes(index)) {
      // If so, remove it (close this FAQ item)
      setOpenFAQIndices(openFAQIndices.filter((i) => i !== index));
    } else {
      // Otherwise, add it (open this FAQ item)
      setOpenFAQIndices([...openFAQIndices, index]);
    }
    // Scroll into view logic remains unchanged but is now conditional on opening an item
    if (!openFAQIndices.includes(index)) {
      setTimeout(() => {
        if (accordionRefs.current[index]) {
          accordionRefs.current[index].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);
    }
  };
      
  const faqItems = [
    {
      question: "What's the difference between a shelter and a rescue?",
      answer: `Shelters are brick and mortar facilities where homeless pets are cared for while they await adoption. They are public or privately owned and often use words like “humane society” or “SPCA” in their name, although they are all separate independently run organizations and not affiliated with one another. Shelters often allow same day adoptions and have staff, volunteers, and hours of operation when they are open for adopters to meet pets.
               <br />
               Rescues are privately operated groups that typically rely on volunteers and a network of loving foster homes to board pets while they await adoption, although they may also have a physical facility. They typically hold adoption events at pet stores, parks, and other pet-friendly locations on weekends so adopters can meet pets and inquire about the rescue's adoption process.`,
    },
    // Add more FAQ items here...
    {
      question: "How can I volunteer at a local animal shelter?",
      answer: `Volunteering at a local animal shelter can be a rewarding experience. Start by visiting the shelter's website or contacting them directly to learn about their volunteer opportunities. Most shelters require an application process and some form of orientation or training. Volunteers can help in various ways, including walking dogs, socializing cats, assisting with adoption events, and providing administrative support.`,
    },

    {
      question: "Do you have adoptable pets in your care?",
      answer:
        "No. Pet Adoption Match is not a shelter or rescue and we do not have pets in our care.Our website is an online platform run by a small but mighty group of pet lovers who believe life, simply put, is better with pets. We&#x27;re confident you&#x27;ll feel the same way when you meet your match, so we build technology to help you do just that",
    },
    {
      question: "What is the process to adopt a pet?",
      answer:
        "Making Every organization&#x27;s adoption process is different and you will have to inquire with the shelter or rescue, directly, for their adoption process details.<br>If the pet is with a rescue, they will likely ask you to complete an adoption application, talk with a volunteer who can tell you more about the pet and, if it seems like a good match, they will arrange for a home visit before completing the adoption. Once you pay the adoption fee and your adoption is complete, they will give you vaccination and sterilization records and arrange for your new pet to come home.If you&#x27;re adopting from a shelter, you may be able to adopt the same day. <br>If the pet is at a shelter with open hours, you can likely visit the facility to meet the pet, complete any necessary paperwork and pay the adoption fee, and then take your new best friend home to get cozy and settle in",
    },
    {
      question: "How much does it cost to adopt a pet?",
      answer:
        "Adoption fees vary from organization to organization, but typically range from $25 to $125 at shelters and $100 to $300 or more at rescues. Adoption fees help to cover the cost of care for pets in the time leading up to adoption (food, supplies, veterinary care and sterilization, etc.) and rarely even come close to what the shelter or rescue actually spends.",
    },
  ];

  return (
    <section className={styles.FAQ_section}>
      <div
        className={`${styles.w_layout_blockcontainer} ${styles.main_container_of_faq}`}
      >
        <div className={styles.faq_container}>
          <h3 className={styles.h1_title}>Frequently asked questions</h3>
          <div className={styles.faq_row}>
            <div
              className={`${styles.faq_left_block} ${styles.shadow} ${styles.orange_shadow}`}
            >
              <div className={styles.faq_left_block_text_wrapper}>
                <h4 className={styles.your_question}>
                  You have more questions?
                </h4>
                <a href="tel:1234567890" className={styles.phone_link}>
                  <img
                    src={OrangePhone}
                    loading="lazy"
                    alt="phone icon"
                    className={`${styles.phone_icon} ${styles.hide_on_mobile}`}
                  />
                  <div className={styles.call_us}>Call us: 1234567890</div>
                </a>
              </div>
              <div className={styles.faq_image_wrapper}>
                <img className={styles.faq_img} src={PetAdoption} alt="FAQ" />
              </div>
            </div>

            <div className={styles.faq_accordion_wrapper}>
              {faqItems.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className={styles.accordion_block}
                    onClick={() => toggleFAQItem(index)}
                    // Dynamically assign ref to each accordion block
                    ref={(el) => (accordionRefs.current[index] = el)}
                  >
                    <div className={styles.accordion_row}>
                      <div className={styles.question_title}>
                        {item.question}
                      </div>
                      <div className={styles.accordion_toggle_indicator}>
                        {/* Always display the horizontal line for both "+" and "-" */}
                        <div className={styles.horizontal_line}>
                          <svg
                            width="14"
                            height="3"
                            viewBox="0 0 14 3"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.3125 1.13525L11.3125 1.13525"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                        {!openFAQIndices.includes(index) && (
                          <div className={styles.vertical_line}>
                            <svg
                              width="3"
                              height="14"
                              viewBox="0 0 3 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0.8125 11.6353L0.8125 0.635254"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    {openFAQIndices.includes(index) && (
                      <div className={styles.accordion_para_wrapper}>
                        <div className={styles.accordion_space}></div>
                        <p
                          className={styles.paragraph_faq}
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        ></p>
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
