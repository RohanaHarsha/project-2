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
        <section className={styles.hero}>
          <div className={styles.overlay}></div>
          <div className={styles.heroText}>
            <p>Welcome to Daffodil Zone</p>
            <h1>About Us - Who We Are?</h1>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.left}>
            <Heading
              title="Our Agency Story"
              subtitle="Learn about our journey, mission, and values"
            />
            <p>
              At Daffodil Zone, we believe a home is more than just walls and a roof — it’s where life unfolds. Founded in 2022, our mission has been to connect families with the perfect living space that complements their lifestyle and aspirations.
            </p>
            <p>
              Whether you're searching for a cozy apartment, a luxury villa, or an investment opportunity, we provide a seamless experience powered by technology and personalized service. Our team is committed to honesty, transparency, and putting people first.
            </p>
            <p>
              From booking to buying, we make real estate feel real simple.
            </p>
            <button className={styles.btn2}>Discover More</button>
          </div>
          <div className={styles.right}>
            <img src={img1} alt="About us" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
