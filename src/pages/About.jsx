import avatar from "../assets/avatar.png";
import rmit from "../assets/rmit.png";
import cbs from "../assets/cbs.png";

export default function About() {
  return (
    <section id="about">
      {/* About Block */}
        <div className="relative w-full flex items-center justify-center pt-5 text-white">

        <div className="w-full max-w-6xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5 p-5 mb-10">
          {/* Left: Avatar */}
          <div className="flex flex-col items-center justify-center relative">
            <img
              src={avatar}
              alt="Trần Kim Duy Lân"
              className="bg-white w-96 h-auto rounded-2xl object-cover transform md:scale-130 transition-transform duration-300"
            />
          </div>

          {/* Right: About Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 mix-blend-lighten text-amber-400">
              About Me
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mix-blend-lighten">
              Tôi là Trần Kim Duy Lân (Leo Tran), một chuyên gia trong lĩnh vực công nghệ, blockchain, trí tuệ nhân tạo và khởi nghiệp tại Việt Nam.
            </p>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mt-4 mix-blend-lighten">
              Với sứ mệnh "Kết nối - Phát triển - Truyền cảm hứng", tôi cam kết xây dựng một hệ sinh thái công nghệ mạnh mẽ, bền vững và góp phần thúc đẩy chuyển đổi số toàn diện cho doanh nghiệp và xã hội.
            </p>
          </div>
        </div>
      </div>

      {/* Education Block */}

      <div className="relative w-full flex-col items-center justify-center px-6 scroll-mt-20">
        <div className="w-full max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-400 mb-6 text-center">Học vấn</h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
            Với nền tảng học vấn vững chắc từ các trường đại học hàng đầu trong nước và quốc tế, tôi đã xây dựng kiến thức toàn diện về kinh doanh và công nghệ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RMIT Vietnam */}
            <div className="bg-white/5 p-5 rounded-2xl shadow-[0_4px_15px_rgba(255,255,255,0.1)] flex flex-col items-start">
              <h3 className="text-xl font-semibold text-amber-300/80">RMIT Vietnam</h3>
              <p className="text-gray-300 mt-2">Học tập các kiến thức nền tảng về kinh doanh và tài chính.</p>
              <p className="text-gray-500 mt-8">2012 – 2016</p>
            </div>

            {/* Copenhagen Business School */}
            <div className="bg-white/5 p-5 rounded-2xl shadow-[0_4px_15px_rgba(255,255,255,0.1)] flex flex-col items-start">
              <h3 className="text-xl font-semibold text-amber-300/80">Copenhagen Business School</h3>
              <p className="text-gray-300 mt-2">Chuyên sâu về chiến lược kinh doanh quốc tế và đổi mới sáng tạo.</p>
              <p className="text-gray-500 mt-2">2016 – 2018</p>
            </div>
          </div>
        </div>
        <div className="w-full h-10"></div>
      </div>
    </section>
  );
}

