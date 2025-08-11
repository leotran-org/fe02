import React, { useEffect } from "react";
import avatar from "../../assets/avatar2.png";

// ==============================
// HOOK: useSpinningText
// ==============================
const useSpinningText = (elementId, words, interval = 2000) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    let index = 0;
    element.textContent = words[index];

    const animate = () => {
      element.style.animation = "textFadeOut 0.5s forwards ease";
      setTimeout(() => {
        index = (index + 1) % words.length;
        element.textContent = words[index];
        element.style.animation = "textFadeIn 0.5s forwards ease";
      }, 500);
    };

    const intervalId = setInterval(animate, interval);
    return () => clearInterval(intervalId);
  }, [elementId, words, interval]);
};

// ==============================
// COMPONENT: HeadingText
// ==============================
const HeadingText = ({ words }) => {
  useSpinningText("Spinning-Text", words);
  return (
    <h1
      id="Spinning-Text"
      className="inline-block text-amber-500 text-[2.5rem] sm:text-[3.2rem] md:text-[4.2rem] font-bold mb-2 whitespace-nowrap transition-all duration-500 ease-in-out"
    >
      {words[0]}
    </h1>
  );
};

// ==============================
// COMPONENT: IntroSection
// ==============================
const IntroSection = () => (
  <div className="mb-6">
    <h3 className="text-gray-300 text-2xl font-normal mb-2" data-i18n="greeting">I'm</h3>
    <HeadingText words={["Leo Trần", "Trần Kim Duy Lân", "đổi mới & sáng tạo"]} />
  </div>
);

// ==============================
// COMPONENT: AboutText
// ==============================
const AboutText = () => (
  <div className="mb-8 pr-5 max-w-[700px]">
    <p
      data-i18n="about_me"
      className="text-gray-300 text-base font-normal leading-7 mix-blend-lighten"
    >
      Tôi là Trần Kim Duy Lân (Leo Tran), một chuyên gia trong lĩnh vực công nghệ, blockchain,
      trí tuệ nhân tạo và khởi nghiệp tại Việt Nam. Với sứ mệnh "Kết nối - Phát triển - Truyền cảm hứng",
      tôi cam kết xây dựng một hệ sinh thái công nghệ mạnh mẽ, bền vững và góp phần thúc đẩy chuyển đổi
      số toàn diện cho doanh nghiệp và xã hội.
    </p>
  </div>
);

// ==============================
// COMPONENT: CallToActionButtons
// ==============================
const CallToActionButtons = () => (
  <div className="flex flex-wrap gap-4">
    <a
      href="/blog"
      className="inline-block px-8 py-3 rounded-full border border-white/20 backdrop-blur-md text-white font-medium text-base transition duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden z-10 bg-white/10 hover:translate-y-[-6px] hover:shadow-lg hover:after:opacity-15"
      data-i18n="learn_more"
    >
      My Blog
    </a>
    <a
      href="/gallery"
      className="inline-block px-8 py-3 rounded-full border backdrop-blur-md text-white font-medium text-base transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] relative overflow-hidden z-10
      bg-gradient-to-br from-amber-400/20 to-yellow-200/30 border-[rgba(255,255,255,0.2)]
      hover:-translate-y-1.5 hover:shadow-lg hover:after:opacity-15"
      data-i18n="see_projects"
    >
      Media Gallery
    </a>
  </div>
);

// ==============================
// COMPONENT: ProfileImage
// ==============================
const ProfileImage = () => (
  <div className="w-full max-w-[400px] flex flex-col items-center">
    <div className="relative overflow-hidden rounded-full shadow-2xl transform perspective-[1000px] rotate-y-[-5deg] transition duration-500 ease-in-out mb-6">
      <img
        id="profile-pic"
        src={avatar}
        draggable="false"
        alt="LeoTran"
        className="w-full h-auto rounded-full transition-transform duration-500 ease-in-out"
      />
    </div>
  </div>
);

// ==============================
// COMPONENT: LeftContent
// ==============================
const LeftContent = () => (
  <div className="flex-1 min-w-[300px] max-w-[650px]">
    <IntroSection />
    <AboutText />
    <CallToActionButtons />
  </div>
);

// ==============================
// COMPONENT: RightContent
// ==============================
const RightContent = () => (
  <div className="flex-1 min-w-[300px] flex justify-center items-center md:-mr-36">
    <ProfileImage />
  </div>
);

// ==============================
// COMPONENT: Home
// ==============================
const Home = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center pt-5 mb-16 text-white">
      <section className="w-full max-w-[1200px] px-10 pt-24 relative z-10" id="home">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <LeftContent />
          <RightContent />
        </div>
      </section>

      {/* Animation styles */}
      <style>
        {`
@keyframes textFadeOut {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
}

@keyframes textFadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

#Spinning-Text {
  animation: none;
}
`}
      </style>
    </div>
  );
};

export default Home;

