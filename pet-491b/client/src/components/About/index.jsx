import Header from "../Header/index";
import Footer from "../Footer/index";
import styles from "./about.module.css";
import AboutImage from "../../images/AboutImage.png";
import maskgroup1 from "../../images/maskgroup1.webp";
import maskgroup2 from "../../images/maskgroup2.webp";
import maskgroup3 from "../../images/maskgroup3.webp";
import PlusIcon from "../../images/PlusIcon.svg";
import AdoptAPet from "../../images/adoptapet.jpeg";

function About() {
  return (
    <>
      <Header />
      <section className={styles.about_section}>
        <div
          className={`${styles.w_layout_blockcontainer} ${styles.w_container}`}
        >
          <div className={styles.about_container}>
            <div className={styles.about_heading_wrapper}>+-++
              <h2 className={styles.h1}>
                The founding story behind our practice
              </h2>
            </div>
            <div className={styles.about_row}>
              <div className={styles.about_image_wrapper}>
                <img src={AboutImage} alt="" />
              </div>
              <div className={styles.about_text_wrapper}>
                <p className={styles.paragraph_big}>
                  We have a team of passionate and experienced professionals who
                  are devoted to the well-being of pets. Our staff includes
                  trained veterinarians, groomers, trainers, and caretakers who
                  are committed to providing the best care possible.
                </p>
                <div
                  className={`${styles.about_text} ${styles.shadow} ${styles.orange_shadow}`}
                >
                  <div className={styles.clients_profile_wrapper}>
                    <img
                      src={maskgroup1}
                      loading="lazy"
                      alt="Client Image"
                      className={styles.client_profile}
                    />
                    <img
                      src={maskgroup2}
                      loading="lazy"
                      alt="Client Image"
                      className={styles.client_profile}
                    />
                    <img
                      src={maskgroup3}
                      loading="lazy"
                      alt="Client Image"
                      className={styles.client_profile}
                    />
                    <div
                      className={`${styles.client_profile} ${styles.with_bg_color}`}
                    >
                      <img
                        src={PlusIcon}
                        alt="plus icon"
                        className={styles.plus_icon}
                      />
                    </div>
                  </div>
                  <div className={styles.paragraph_big}>
                    Trusted by over x clients worldwide since 2023
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* Title and horizontal rule */}
        <div className={styles.title_and_hr}>
          <h2 className={styles.title}>Our Story</h2>
        </div>

        {/* Introduction section */}
        <p className={styles.short_intro}>
          <strong>
            Your gateway to finding the perfect furry companion. With our
            innovative approach, we connect you with your classNameeal pet,
            making every adoption a joyful journey filled with love and
            companionship.
          </strong>
        </p>
        {/* Who we are section */}
        <h2 className={styles.who_we_are}>Who we are</h2>
        <p className={styles.introduction}>
          Welcome to Pet Adoption Match, a heartfelt endeavor driven by our
          profound love for animals. Rooted in the belief that every pet
          deserves a permanent home filled with care and affection, our platform
          has emerged as a beacon of compassion in the world of pet adoption.
          Founded on a passion for animal welfare, we are a dedicated group of
          individuals committed to making the adoption process responsible,
          effective, and above all, brimming with empathy. Our primary mission
          is to connect loving adopters with their future furry family members
          in a seamless and rewarding manner.
        </p>
        {/* How we work section */}
        <h2 className={styles.how_we_work}>How we work</h2>
        <p className={styles.introduction}>
          At Pet Adoption Match, we leverage the power of advanced machine
          learning algorithms to facilitate the perfect match between adopters
          and pets. Our commitment to a responsible adoption process ensures
          that each pet finds a home where it is not just a companion but an
          integral part of a loving family. Navigating through our platform is
          designed to be a user-friendly experience, accommodating both seasoned
          pet owners and first-time adopters. The intuitive interface allows
          users to explore pet profiles, delve into comprehensive details, and
          effortlessly engage in meaningful communication with pet owners. More
          than just a platform, Pet Adoption Match is a community that fosters
          compassion in every interaction. We believe in creating a world where
          every pet is cherished, and every adopter experiences the unparalleled
          joy and fulfillment that comes with pet companionship. Join us in this
          heartfelt journey, where the love for pets knows no bounds, and
          together, let's make every adoption a celebration of love, connection,
          and lifelong companionship.
        </p>
        <h2 className={styles.our_commitment}>Our commitment</h2>
        <p className={styles.introduction}>
          Additionally, Pet Adoption Match is committed to ongoing education and
          advocacy for responsible pet ownership. We provide resources,
          guidance, and support to pet owners, ensuring a harmonious bond
          between humans and their animal companions. Join our mission to
          promote the welfare of pets everywhere, and together, let's make a
          positive impact on the lives of countless furry friends in need of
          loving homes.
        </p>
      </div>

      <div className={styles.team_member}>
        <h2 className={styles.our_team}> Our Team</h2>
        <div className={styles.row}>
          {/* First Column */}
          <div className={styles.column}>
            <div className={styles.card}>
              <img className={styles.team_member_pic} src={AdoptAPet}></img>
              <div className={styles.team_container}>
                <h2>Khoa Diep</h2>
                <p className={styles.job_title}>Founder</p>
                <p className={styles.description}>
                  Some text that desceribes me lorem ipsum lorem
                </p>
                <p className={styles.sample_email}>sample@example.com</p>
                <div className={styles.contact_paragraph}>
                    <a className={styles.contact_link}
                      href={`mailto:${"jane@example.com"}`}>
                      Contact
                    </a>
                </div>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className={styles.column}>
            <div className={styles.card}>
              <img className={styles.team_member_pic} src={AdoptAPet}></img>
              <div className={styles.team_container}>
                <h2>David Viers</h2>
                <p className={styles.job_title}>Founder</p>
                <p className={styles.description}>
                  Some text that desceribes me lorem ipsum lorem
                </p>
                <p className={styles.sample_email}>sample@example.com</p>
                <div className={styles.contact_paragraph}>
                    <a className={styles.contact_link}
                      href={`mailto:${"jane@example.com"}`}>
                      Contact
                    </a>
                </div>
              </div>
            </div>
          </div>

          {/* Third Column */}
          <div className={styles.column}>
            <div className={styles.card}>
              <img className={styles.team_member_pic} src={AdoptAPet}></img>
              <div className={styles.team_container}>
                <h2>Ren Yamasaki</h2>
                <p className={styles.job_title}>Founder</p>
                <p className={styles.description}>
                  Some text that desceribes me lorem ipsum lorem
                </p>
                <p className={styles.sample_email}>sample@example.com</p>
                <div className={styles.contact_paragraph}>
                    <a className={styles.contact_link}
                      href={`mailto:${"jane@example.com"}`}>
                      Contact
                    </a>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default About;
