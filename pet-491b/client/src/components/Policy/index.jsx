import React from 'react';
import Header from "../Header/index";
import Footer from "../Footer/index";
import './styles.css';

const PoliciesAndGuidelines = () => {
  return (
    <>
    <Header />
    <div className="policy-container">
      <h1>Policies and Guidelines</h1>
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to Pet Match, a platform dedicated to matching pets with their forever homes. This document outlines the rules and guidelines that all users must adhere to when using our website and services. By accessing and using Pet Match, you agree to these terms.</p>
      </section>

      <section>
        <h2>2. Terms of Use</h2>
        <ul>
          <li>Eligibility: Users must be 18 years of age or older to create an account and engage in pet adoption.</li>
          <li>Account Responsibilities: Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</li>
          <li>Acceptable Use: Users must not use Pet Match to conduct illegal activities, spread malware, or disseminate harmful or offensive content.</li>
        </ul>
      </section>

      <section>
        <h2>3. Privacy Policy</h2>
        <ul>
          <li>Data Collection: We collect personal information, including name, contact details, and, if applicable, payment information, when you register on our site.</li>
          <li>Data Use: Your information is used to facilitate the adoption process, improve our services, and communicate with you about your account and our services.</li>
          <li>Data Sharing: We do not sell or rent personal information to third parties. Personal information is only shared with third parties as necessary for service provision or as required by law.</li>
          <li>Security: We implement various security measures to protect your personal information but cannot guarantee its absolute security.</li>
        </ul>
      </section>

      <section>
        <h2>4. Adoption Guidelines</h2>
        <ul>
          <li>Adoption Process: Users interested in adopting a pet must complete an application form, pass a screening process, and sometimes undergo a home visit.</li>
          <li>Adoption Fees: Adoption fees may apply and are non-refundable unless otherwise specified.</li>
          <li>Post-Adoption: Adopters agree to provide a humane, loving environment, with adequate food, water, shelter, and medical care.</li>
        </ul>
      </section>

      <section>
        <h2>5. User Conduct</h2>
        <p>Interactions: Users must treat other community members with respect and refrain from abusive or discriminatory behavior.</p>
        <p>Reporting Problems: Users are encouraged to report any issues or concerns about animal welfare or user conduct to the administrators of Pet Match.</p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>Content Ownership: All content published on Pet Match remains the intellectual property of the original content creators.</p>
        <p>Use of Content: Users may not use, copy, or distribute any content from this website without express permission.</p>
      </section>

      <section>
        <h2>7. Modifications to Terms and Policies</h2>
        <p>Updates: Pet Match reserves the right to modify these policies at any time. Users will be notified of any significant changes.</p>
        <p>Continued Use: Continued use of the website after such changes will constitute your acceptance of the new terms.</p>
      </section>

      <section>
        <h2>8. Contact Information</h2>
        <p>If you have any questions or suggestions about our Policies and Guidelines, please contact us at 0123456789.</p>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default PoliciesAndGuidelines;
