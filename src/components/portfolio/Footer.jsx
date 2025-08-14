import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#21212145] pb-[30px] pt-[10px] px-[50px] mt-[196px]">
      <ul className="flex justify-center items-center flex-wrap gap-5 list-none my-[30px]">
        {[
          { href: "#", label: "Home", i18n: "nav_home" },
          { href: "#projects", label: "Projects", i18n: "nav_projects" },
          { href: "#skills", label: "Skills", i18n: "nav_skills" },
          { href: "#certificates", label: "Certificates", i18n: "nav_certificates" },
          { href: "#about", label: "About", i18n: "nav_about" },
          { href: "#contact", label: "Contact", i18n: "nav_contact" },
        ].map(({ href, label, i18n }) => (
          <li key={label}>
            <a
              href={href}
              data-i18n={i18n}
              className="text-white opacity-80 text-base transition-all duration-300 relative hover:opacity-100 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
            >
              {label}
            </a>
          </li>
        ))}

        <li>
          <a
            href="/login"
            data-i18n="nav_login"
            aria-label="Go to login page"
            className="text-white opacity-80 text-base transition-all duration-300 relative hover:opacity-100 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-white after:scale-x-0 after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
          >
            Login
          </a>
        </li>
      </ul>

      <p className="text-center mt-5 text-white opacity-60 text-sm" data-i18n="footer_copyright">
        &copy; 2025 qvanle | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;

