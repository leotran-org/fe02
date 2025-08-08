import React from "react";
import waveImg from "../../assets/wave.webp"; // adjust path if needed

const Footer = () => {
  return (
    <footer className="relative bg-[#21212145] pt-[100px] px-[50px] pb-[30px] mt-[196px]">
      {/* Waves */}
      <div className="absolute top-0 left-0 w-full h-[100px] opacity-[0.28] overflow-hidden">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            id={`wave${num}`}
            className={`absolute bottom-[100px] left-0 w-full h-[100px] bg-[length:1000px_100px] ${
              num % 2 === 0 ? "animate-wave2" : "animate-wave1"
            }`}
            style={{
              backgroundImage: `url(${waveImg})`,
              zIndex: 1000 - num + 1,
              opacity: [0.5, 0.7, 0.3, 0.6][num - 1],
            }}
          ></div>
        ))}
      </div>

      {/* Social Icons */}
      <ul className="flex justify-center items-center flex-wrap gap-5 mb-[30px] list-none">
        {[
          { id: "linkedin", href: "https://www.linkedin.com/in/enesehs/", src: "/public/assets/links/linkedin.webp", alt: "LinkedIn" },
          { id: "github", href: "https://github.com/enesehs", src: "/public/assets/links/github.webp", alt: "GitHub" },
          { id: "plasenta-footer", href: "#", src: "/public/assets/links/Plasenta.webp", alt: "Plasenta" },
          { id: "instagram", href: "https://www.instagram.com/enesehs.dev/", src: "/public/assets/links/instagram.webp", alt: "Instagram" },
          { id: "spotify", href: "https://open.spotify.com/user/21a6im72dymlsyyaasjejv2by?si=d8545eb4f9984aa4", src: "/public/assets/links/spotify.webp", alt: "Spotify" },
          { id: "youtube", href: "https://www.youtube.com/@enesehs", src: "/public/assets/links/youtube.webp", alt: "YouTube", size: "w-[50px]" },
        ].map(({ id, href, src, alt, size = "w-[40px]" }) => (
          <li key={id}>
            <a href={href} className="flex justify-center items-center w-[45px] h-[45px] transition-all duration-400 ease-in-out hover:-translate-y-[5px]">
              <img
                src={src}
                alt={alt}
                id={id}
                loading="lazy"
                draggable="false"
                className={`${size} h-auto opacity-75 hover:opacity-100`}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Footer Menu */}
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
      </ul>

      {/* Footer Text */}
      <p className="text-center mt-5 text-white opacity-60 text-sm" data-i18n="footer_copyright">
        &copy; 2025 Enesehs | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;

