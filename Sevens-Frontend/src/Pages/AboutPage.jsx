import "../styles/AboutPage.css"

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Queen Martine",
      position: "Founder & CEO",
      image: "/images/team-member-1.jpg",
      bio: "Sarah founded Sevens in 2015 with a vision to create a seamless online shopping experience. With over 15 years in retail and e-commerce, she leads our company strategy and growth initiatives.",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Creative Director",
      image: "/images/team-member-2.jpg",
      bio: "Michael oversees all creative aspects of Sevens, from brand identity to user experience. His background in design and fashion helps shape our unique aesthetic and customer journey.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Head of Operations",
      image: "/images/team-member-3.jpg",
      bio: "Emily ensures that all aspects of our business run smoothly, from supply chain to customer service. Her attention to detail and operational expertise keep ShopNow delivering excellence.",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Technology Director",
      image: "/images/team-member-4.jpg",
      bio: "David leads our technology team, developing innovative solutions that power our e-commerce platform. His focus on performance and security ensures a reliable shopping experience.",
    },
  ]

  return (
    <div className="about-page">
      <div className="about-header">
        <div className="container">
          <h1>About Sevens</h1>
          <p>Discover our story, mission, and the team behind your favorite online store</p>
        </div>
      </div>

      <div className="container">
        <section className="our-story">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Sevens began in 2015 as a small online boutique with a curated collection of fashion items. What started
              as a passion project in a tiny apartment has grown into a global e-commerce destination serving customers
              in over 50 countries.
            </p>
            <p>
              Our founder, Martine, recognized a gap in the market for a shopping platform that combined
              high-quality products, exceptional customer service, and a seamless digital experience. With this vision
              in mind, Sevens was born.
            </p>
            <p>
              Over the years, we've expanded our product range to include everything from designer clothing and footwear
              to accessories and lifestyle products. Despite our growth, we've remained true to our core values:
              quality, authenticity, and customer satisfaction.
            </p>
          </div>
          <div className="story-image">
            <img src="/images/about-story.jpg" alt="Our Story" />
          </div>
        </section>

        <section className="mission-values">
          <h2>Our Mission & Values</h2>

          <div className="mission-statement">
            <h3>Mission</h3>
            <p>
              To provide customers with a curated selection of high-quality products and an exceptional shopping
              experience that inspires confidence and style in everyday life.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>Quality</h3>
              <p>
                We carefully select every product in our catalog, ensuring it meets our high standards for materials,
                craftsmanship, and durability.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Customer First</h3>
              <p>
                Our customers are at the heart of everything we do. We strive to exceed expectations with personalized
                service and attention to detail.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sustainability</h3>
              <p>
                We're committed to reducing our environmental impact through eco-friendly packaging, ethical sourcing,
                and sustainable business practices.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously seek new ways to improve our platform, products, and services to deliver the best
                possible shopping experience.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            The passionate individuals behind Sevens who work tirelessly to bring you the best shopping experience.
          </p>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="member-image">
                  <img src={member.image || "/placeholder.svg?height=300&width=300"} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-position">{member.position}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-social">
                    <a href="#" className="social-link">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="social-link">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="milestones">
          <h2>Our Journey</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2024</h3>
                <h4>Sevens Founded</h4>
                <p>
                  Martine launches Sevens as an online boutique with a small collection of curated fashion items.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2026</h3>
                <h4>Expansion to Accessories</h4>
                <p>
                  We expanded our product range to include accessories, partnering with premium brands to offer a wider
                  selection.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2026</h3>
                <h4>International Shipping</h4>
                <p>
                  Sevens begins shipping to international customers, reaching fashion enthusiasts in over 20 countries.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2026</h3>
                <h4>Mobile App Launch</h4>
                <p>
                  We launched our mobile app, making it even easier for customers to shop on the go with exclusive
                  app-only features.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2025</h3>
                <h4>Sustainability Initiative</h4>
                <p>
                  Sevens commits to sustainable practices with eco-friendly packaging and a curated collection of
                  sustainable brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <h2>What Our Customers Say</h2>

          <div className="testimonials-slider">
            <div className="testimonial">
              <div className="testimonial-content">
                <p>
                  "Sevens has been my go-to for fashion and accessories for years. The quality is consistently
                  excellent, and their customer service is unmatched. I always feel confident shopping here."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/customer-1.jpg" alt="Customer" />
                <div>
                  <h4>Jessica T.</h4>
                  <p>Loyal Customer since 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Be the first to know about new arrivals, exclusive offers, and fashion tips.</p>
            <form className="cta-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage

