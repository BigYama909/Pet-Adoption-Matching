import React from 'react';
import styles from './survey.module.css';

const SurveyLink = () => {
  return (
    <div className={styles.surveySection}>
      <h2 className={styles.title}>Adopted a pet using our website? Let us know your experience.</h2>
      <button className={styles.button}>
        <a href="https://forms.gle/yoLwX4RdhWJFYNLM6" target="_blank" rel="noopener noreferrer">
          Take the Survey
        </a>
      </button>
    </div>
  );
};

export default SurveyLink;