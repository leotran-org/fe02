// About.jsx
import avatar from "../assets/avatar.png";
import rmit from "../assets/rmit.png";
import cbs from "../assets/cbs.png";

// Avatar Block Component
function AvatarBlock() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center relative">
      <img
        src={avatar}
        alt="Trần Kim Duy Lân"
        className="bg-white w-96 h-auto rounded-2xl object-cover transform md:scale-130 transition-transform duration-300"
      />
    </div>
  );
}


// About Content Component
function AboutContent() {
  return (
    <div className="hidden md:flex flex-col justify-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-amber-400 mb-6 mix-blend-lighten">
        About Me
      </h2>
      <p className="text-gray-300 text-base md:text-lg leading-relaxed mix-blend-lighten">
        Tôi là Trần Kim Duy Lân (Leo Tran), một chuyên gia trong lĩnh vực công nghệ, blockchain,
        trí tuệ nhân tạo và khởi nghiệp tại Việt Nam.
      </p>
      <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 mix-blend-lighten">
        Với sứ mệnh "Kết nối - Phát triển - Truyền cảm hứng", tôi cam kết xây dựng một hệ sinh thái công nghệ
        mạnh mẽ, bền vững và góp phần thúc đẩy chuyển đổi số toàn diện cho doanh nghiệp và xã hội.
      </p>
    </div>
  );
}

// Education Card Component
function EducationCard({ title, description, time }) {
  return (
    <div className="bg-white/5 p-5 rounded-2xl shadow-[0_4px_15px_rgba(255,255,255,0.1)] flex flex-col items-start">
      <h3 className="text-xl font-semibold text-amber-300/80">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
      <p className="text-gray-500 mt-8">{time}</p>
    </div>
  );
}

// Education Section Component
function EducationSection() {
  return (
    <div className="relative w-full flex-col items-center justify-center px-6 scroll-mt-20">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-6 text-center">Học vấn</h2>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
          Với nền tảng học vấn vững chắc từ các trường đại học hàng đầu trong nước và quốc tế, tôi đã xây dựng kiến thức toàn diện về kinh doanh và công nghệ.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EducationCard
            title="RMIT Vietnam"
            description="Học tập các kiến thức nền tảng về kinh doanh và tài chính."
            time="2012 – 2016"
          />
          <EducationCard
            title="Copenhagen Business School"
            description="Chuyên sâu về chiến lược kinh doanh quốc tế và đổi mới sáng tạo."
            time="2016 – 2018"
          />
        </div>
      </div>
      <div className="w-full h-10"></div>
    </div>
  );
}

// Main About Component
export default function About() {
  return (
    <section id="about">
      {/* About Block */}
      <div className="hidden md:flex relative w-full items-center justify-center pt-5 text-white">
        <div className="w-full max-w-6xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5 p-5 mb-10">
          <AvatarBlock />
          <AboutContent />
        </div>
      </div>

      {/* Education Block */}
      <EducationSection />
    </section>
  );
}

