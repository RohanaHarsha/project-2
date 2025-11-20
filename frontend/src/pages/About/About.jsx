// ...existing code...
import React from "react";
import Heading from "../../components/commen/Heading";
import img1 from "../../img/immio.jpg";
import styles from "./About.module.css";
import Navbar from "../../components/commen/navbar";
import Footer from '../../components/Footer/footer';

const stats = [
  { id: 1, value: "10k+", label: "Happy Clients" },
  { id: 2, value: "1.2k", label: "Properties Listed" },
  { id: 3, value: "98%", label: "Customer Satisfaction" },
];

const About = () => {
  return (
    <>
      <Navbar />
      <section className={styles.about}>
        <header className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Welcome to Daffodil Zone</p>
            <h1 className={styles.heroTitle}> We Make Real Estate Simple</h1>
            <p className={styles.lead}>
              Connecting people to properties they love — through thoughtful service and modern tools.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primary}>Discover Our Services</button>
              <a className={styles.ghost} href="/contact">Contact Us</a>
            </div>
          </div>
        </header>

        <div className={styles.container}>
          <div className={styles.left}>
            <Heading
              title="Our Agency Story"
              subtitle="Learn about our journey, mission, and values"
            />
            <p className={styles.paragraph}>
              At Daffodil Zone, we believe a home is more than bricks and mortar — it’s where memories are made.
              Founded in 2022, we combine local market expertise with modern tools to make buying, selling and
              renting seamless and transparent.
            </p>

            <p className={styles.paragraph}>
              Whether you’re searching for a cozy apartment, a family home or an investment property, our team
              provides personalized support every step of the way. Honesty, clarity and results are at the heart of
              what we do.
            </p>

            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.id} className={styles.stat}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>

            <button className={styles.btnSecondary}>See Current Listings</button>
          </div>

          <aside className={styles.right}>
            <div className={styles.imageCard}>
              <img src={img1} alt="Daffodil Zone office" loading="lazy" />
              <div className={styles.imageCaption}>
                Trusted, local agents — modern service.
              </div>
            </div>
          </aside>
        </div>

        <section className={styles.mission}>
          <div className={styles.container}>
            <div className={styles.missionCard}>
              <h3>Our Mission</h3>
              <p>
                To make property search and transactions clear, fast and enjoyable by combining human care with
                reliable technology.
              </p>
            </div>

            <div className={styles.missionCard}>
              <h3>How We Work</h3>
              <ul className={styles.bullet}>
                <li>Local market expertise</li>
                <li>Verified listings and transparent pricing</li>
                <li>Personalised support and safe transactions</li>
              </ul>
            </div>

            <div className={styles.missionCard}>
              <h3>Get Started</h3>
              <p>Call us or browse listings online — we’ll match you with properties that fit your life and budget.</p>
              <a className={styles.primaryLink} href="tel:+0000000000">Call: +00 000 000</a>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
};

export default About;
// ...existing code...