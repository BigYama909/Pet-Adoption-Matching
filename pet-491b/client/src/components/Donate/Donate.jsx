import React, { useState, useEffect } from "react";
import Header from "../Header/LoggedInHeader";
import Footer from "../Footer/index";
import styles from "./Donate.module.css";
import Donation from "./Images/donation.jpeg";
function Donate() {
  const [customAmount, setCustomAmount] = useState("");
  // Example state definitions
  const [currentAmount, setCurrentAmount] = useState(18000); // Example current amount
  const [goalAmount, setGoalAmount] = useState(24000); // Example goal amount
  const currentProgress = (currentAmount / goalAmount) * 100; // Calculate progress percentage

  useEffect(() => {
    // Set the document title using the browser's document object
    document.title = "Donate Now";
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.make_a_donation}></div>
        <div className={styles.header}>
          <img src={Donation} alt="Donate" />
          <div className={styles.headerText}>
            <h1>Make a donation</h1>
            <p>
              Every donation is a lifeline that extends the reach of our
              compassionate endeavors. It's not just a gift, but a gesture of
              hope that ripples through the lives of individuals and families in
              dire straits. With your support, we can sustain and expand
              programs that offer nourishment, shelter, and medical assistance
              to those who find themselves on hard times. Your contributions
              also empower us to invest in education and skill-building
              workshops that create pathways out of poverty. Imagine a world
              where every act of kindness you exhibit is transformed into
              someone's newfound stability—this is the world you help build with
              every dollar you donate.
            </p>

            <p>
              Consider the magnitude of change your generosity can usher in.
              When you donate today, you join a community of visionaries
              committed to a better tomorrow. Your contribution, regardless of
              size, weaves into the tapestry of collective action that supports
              advancements in healthcare, education, and environmental
              conservation. It's more than charity; it's an investment in a
              future where every person has the opportunity to thrive. We thank
              you from the bottom of our hearts for standing with us, for
              believing in the power of change, and for choosing to make a
              difference.
            </p>
          </div>
        </div>
        {/* Assuming currentProgress, currentAmount, goalAmount, supporters, and timeLeft are defined in your component */}
        <div className={styles.progress_bar_container}>
          <h2 className={styles.progress_bar_text_above}>
            Help us reach our goal!
          </h2>
          <div className={styles.progress_bar_background}>
            <div
              className={styles.progress_bar_foreground}
              style={{ width: `${currentProgress}%` }}
            ></div>
          </div>
          <div className={styles.progress_bar_footer}>
            <span className={styles.current_amount}>
              ${currentAmount.toLocaleString()} raised
            </span>
            <span className={styles.goal_amount}>
              Goal: ${goalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.donation_grid}>
          {/* Donation Option 1 */}
          <div
            className={styles.donation_option}
            style={{ background: "#ffccbc" }}
          >
            {/* Content for Donation Option 1 */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input
                type="hidden"
                name="business"
                value="sampleemail@gmail.com"
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="amount" value="25" />
              <div className={styles.icon} style={{ color: "#6d4c41" }}>
                <i className="fas fa-bone"></i>
              </div>
              <h2 className={styles.donation_amount}>$25</h2>
              <input
                type="submit"
                value="Donate"
                className={styles.paypal_button}
              />
            </form>
          </div>

          {/* Donation Option 2 */}
          <div
            className={styles.donation_option}
            style={{ background: "#ffab91" }}
          >
            {/* Content for Donation Option 2 */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input
                type="hidden"
                name="business"
                value="sampleemail@gmail.com"
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="amount" value="50" />
              <div className={styles.icon} style={{ color: "#5d4037" }}>
                <i className="fas fa-paw"></i>
              </div>
              <h2 className={styles.donation_amount}>$50</h2>
              <input
                type="submit"
                value="Donate"
                className={styles.paypal_button}
              />
            </form>
          </div>

          {/* Donation Option 3 */}
          <div
            className={styles.donation_option}
            style={{ background: "#ff8a65" }}
          >
            {/* Content for Donation Option 3 */}
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
            >
              <input type="hidden" name="cmd" value="_xclick" />
              <input
                type="hidden"
                name="business"
                value="sampleemail@gmail.com"
              />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="amount" value="100" />
              <div className={styles.icon} style={{ color: "#4e342e" }}>
                <i className="fas fa-fish"></i>
              </div>
              <h2 className={styles.donation_amount}>$100</h2>
              <input
                type="submit"
                value="Donate"
                className={styles.paypal_button}
              />
            </form>
          </div>

          {/* Custom Donation Option */}
          <div
            className={styles.donation_option}
            style={{ background: "#ff7043" }}
          >
            <div className={styles.icon}>
              <i className="fas fa-dog"></i>
            </div>
            <div className={styles.custom_amount}>
              <label htmlFor="customAmount">$?</label>
              <input
                type="number"
                id="customAmount"
                placeholder="$"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
            <button
              className={styles.paypal_button}
              onClick={() =>
                window.open(
                  `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sampleemail@gmail.com&currency_code=USD&amount=${customAmount}`,
                  "_blank"
                )
              }
            >
              Donate
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Donate;
