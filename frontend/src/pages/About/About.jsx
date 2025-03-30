import React from "react";
import Heading from "../../components/commen/Heading";
import img1 from "../../img/immio.jpg";
import styles from "./About.module.css";
import Navbar from "../../components/commen/navbar";
import Footer from '../../components/Footer/footer';

const About = () => {
  return (
    <>
      <Navbar />
      <section className={styles.about}>
        <section className={styles.aboutSection}>
          <div className={styles.overlay}></div>
          <div className={styles.aboutSectionText}>
            <p>About Us</p>
            <h1>About Us - Who We Are?</h1>
          </div>
        </section>
        <div className={`${styles.container} ${styles.flex} ${styles.mtop}`}>
          <div className={`${styles.left} ${styles.row}`}>
            <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            <button className={styles.btn2}>More About Us</button>
          </div>
          <div className={`${styles.right} ${styles.row}`}>
            <img src={img1} alt='' />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
