import { useEffect, useState } from "react";
import navLinks from "../constants/navLinks";
import logo from "../assets/logo.png";
import "./css/NavBar.css"; 

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isSticky ? "sticky" : ""}>
      <nav>
        <div className="logo">
          <a href="#">
            <img src={logo} alt="Leo Tran Logo" draggable="false" />
          </a>
        </div>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="nav-section">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={link.hoverColor}
                data-i18n={`nav_${link.id}`}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Special My Blog Link */}
          <li>
            <a href="/blog" className="hover-blog">
              My Blog
            </a>
          </li>

          <li>
            <label className="switch">
              <input type="checkbox" id="toggleButton" defaultChecked />
              <span className="slider"></span>
            </label>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

