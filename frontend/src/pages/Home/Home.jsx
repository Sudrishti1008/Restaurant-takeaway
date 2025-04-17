import React from 'react'; // Import React
import './Home.css'; // Import component-specific styling
import heroImage from '../../assets/hero1.png'; // Import hero section image from assets

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
          CRAVE THE FLAVOR. <br />
          CHOMP IT. <br />
          REPEAT.
          </h1>
          <a href="/menu" className="hero-button">View Menu</a>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      </section>

    </div>
  );
};

export default Home; // Export the Home component


