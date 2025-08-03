import './Home.css';


import avatar from "../assets/about.png";

import FAlinkedin from "../assets/linkedin.png";
import FAFacebook from "../assets/facebook.png";
import FAYoutube from "../assets/youtube.png";
import FAEmail from "../assets/gmail.png";
import FAPhone from "../assets/phone.png";

import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const spinningText = document.getElementById("Spinning-Text");
    if (spinningText) {
      const words = [
        "Leo Trần",
        "Trần Kim Duy Lân",
        "đổi mới & sáng tạo",
      ];
      let currentIndex = 0;
      spinningText.textContent = words[0];

      const animate = () => {
        spinningText.style.animation = "textFadeOut 0.5s forwards ease";
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % words.length;
          spinningText.textContent = words[currentIndex];
          spinningText.style.animation = "textFadeIn 0.5s forwards ease";
        }, 500);
      };

      const intervalId = setInterval(animate, 2000);

      return () => clearInterval(intervalId); // Clean up on unmount
    }
  }, []);

  return (
    <div className="hero-wrapper">
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="left-content">
            <div className="title-container">
              <h3 className="greeting" data-i18n="greeting">I'm</h3>
              <h1 id="Spinning-Text">Enesehs</h1>
            </div>

            <div className="about-me">
              <p data-i18n="about_me">
                Tôi là Trần Kim Duy Lân (Leo Tran), một chuyên gia trong lĩnh vực 
                công nghệ, blockchain, trí tuệ nhân tạo và khởi nghiệp tại Việt Nam.
                Với sứ mệnh "Kết nối - Phát triển - Truyền cảm hứng, tôi cam kết xây
                dựng một hệ sinh thái công nghệ mạnh mẽ, bền vững và góp phần thúc 
                đẩy chuyển đổi số toàn diện cho doanh nghiệp và xã hội.
              </p>
            </div>

            <div className="cta-buttons">
              <a href="#about" className="cta-btn primary-btn" data-i18n="learn_more">Learn More</a>
              <a href="#projects" className="cta-btn secondary-btn" data-i18n="see_projects">See My Projects</a>
            </div>
          </div>

          <div className="right-content">
            <div className="profile-container">
              <div className="profile-frame">
                <img
                  id="profile-pic"
                  src={avatar}
                  draggable="false"
                  alt="LeoTran"
                  data-nosnippet
                />
              </div>

              <div className="social-media">
                <ul className="social-icons">
                  <li>
                    <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                      <img src={FAlinkedin} alt="LinkedIn" id="linkedin" draggable="false" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/" aria-label="Facebook">
                        <img src={FAFacebook} alt="Facebook" id="facebook" draggable="false" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/" aria-label="YouTube">
                      <img src={FAYoutube} alt="YouTube" id="youtube" draggable="false" />
                    </a>
                  </li>
                    <li>
                        <a href="leotran@gmail.com" aria-label="Email">
                            <img src={FAEmail} alt="Email" id="email" draggable="false" />
                        </a>
                    </li>
                    <li>
                        <a href="PhoneNumber" aria-label="Phone">
                            <img src={FAPhone} alt="Phone" id="phone" draggable="false" />
                        </a>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

