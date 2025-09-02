import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-hero">
        <h1>About Café Fausse</h1>
        <p>Our story of culinary excellence and passion</p>
      </div>

      <div className="about-container">
        <section className="restaurant-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends 
            traditional Italian flavors with modern culinary innovation. Our mission is to provide an 
            unforgettable dining experience that reflects both quality and creativity.
          </p>
          <p>
            From our humble beginnings as a small neighborhood bistro, we have grown into one of 
            Washington DC's premier fine dining destinations, while never losing sight of our core 
            values: exceptional food, warm hospitality, and a commitment to using only the finest, 
            locally sourced ingredients.
          </p>
        </section>

        <section className="founders">
          <h2>Meet Our Founders</h2>
          
          <div className="founder-profiles">
            <div className="founder">
              <div className="founder-image">
                <img 
                  src="/images/Chef-Antonio.png" 
                  alt="Chef Antonio Rossi" 
                  className="chef-photo"
                />
              </div>
              <div className="founder-info">
                <h3>Chef Antonio Rossi</h3>
                <h4>Executive Chef & Co-Founder</h4>
                <p>
                  With over 20 years of culinary experience, Chef Rossi trained in the finest 
                  kitchens of Italy before bringing his expertise to Washington DC. His passion 
                  for authentic Italian cuisine, combined with his innovative approach to modern 
                  cooking techniques, creates the unique flavor profile that defines Café Fausse.
                </p>
                <p>
                  Chef Rossi believes in the power of fresh, seasonal ingredients and maintains 
                  close relationships with local farmers and suppliers to ensure every dish 
                  meets his exacting standards.
                </p>
              </div>
            </div>

            <div className="founder">
              <div className="founder-image">
                <img 
                  src="/images/Maria-Lopez.png" 
                  alt="Maria Lopez" 
                  className="chef-photo"
                />
              </div>
              <div className="founder-info">
                <h3>Maria Lopez</h3>
                <h4>General Manager & Co-Founder</h4>
                <p>
                  Maria brings a wealth of hospitality experience and a keen eye for creating 
                  memorable dining experiences. Her background in restaurant management and 
                  her passion for exceptional service ensure that every guest feels welcomed 
                  and valued at Café Fausse.
                </p>
                <p>
                  Under Maria's leadership, our front-of-house team delivers the warm, 
                  professional service that has become synonymous with the Café Fausse experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="values">
          <h2>Our Commitment</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Quality Ingredients</h3>
              <p>
                We source only the finest, freshest ingredients from local farms and trusted 
                suppliers, ensuring every dish meets our high standards for quality and flavor.
              </p>
            </div>
            <div className="value-item">
              <h3>Culinary Innovation</h3>
              <p>
                While respecting traditional Italian cooking methods, we continuously explore 
                new techniques and flavor combinations to create unique and memorable dishes.
              </p>
            </div>
            <div className="value-item">
              <h3>Exceptional Service</h3>
              <p>
                Our dedicated team is committed to providing warm, attentive service that 
                makes every guest feel special and ensures an unforgettable dining experience.
              </p>
            </div>
            <div className="value-item">
              <h3>Community Focus</h3>
              <p>
                We believe in supporting our local community by partnering with nearby farms, 
                participating in local events, and creating a welcoming space for all.
              </p>
            </div>
          </div>
        </section>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At Café Fausse, we are dedicated to creating an unforgettable dining experience 
            through exceptional food, outstanding service, and a warm, inviting atmosphere. 
            We strive to be more than just a restaurant – we aim to be a place where memories 
            are made, relationships are celebrated, and the art of fine dining is truly appreciated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
