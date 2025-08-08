import img1 from "../../assets/award1.png"; // L'Oreal Brandstorm
import img2 from "../../assets/award2.png"; // InnoEx
import img3 from "../../assets/award3.png"; // Antler presentation
export default function Awards() {
  const educationTimeline = [
    {
      time: "Ongoing",
      title: "Diễn giả & Điều phối chương trình",
      subtitle: "Blockchain, Web3, hướng nghiệp",
      description:
        "Tổ chức tại nhiều trường đại học, truyền cảm hứng và chia sẻ kiến thức thực tiễn về công nghệ mới.",
      delay: 400,
    },
    {
      time: "2023 - 2025",
      title: "Giám khảo & Mentor khởi nghiệp",
      subtitle: "L’Oréal Brandstorm, VSIC",
      description:
        "Đồng hành cùng sinh viên trong các cuộc thi đổi mới sáng tạo và khởi nghiệp.",
      delay: 600,
    },
    {
      time: "Ongoing",
      title: "Đào tạo & Tư vấn doanh nghiệp",
      subtitle: "Đổi mới sáng tạo",
      description:
        "Cố vấn cho lãnh đạo và doanh nghiệp về chiến lược phát triển công nghệ và chuyển đổi số.",
      delay: 800,
    },
  ];

  const experienceTimeline = [
    {
      time: "Navagis, GIS HCM",
      title: "Đại diện trình bày giải pháp",
      subtitle: "Hội nghị quốc tế",
      description:
        "Chia sẻ sáng kiến chuyển đổi số tại sự kiện công nghệ quy mô lớn.",
      delay: 400,
    },
    {
      time: "EdBase.AI",
      title: "Cố vấn nội dung giáo dục",
      subtitle: "Phát triển thương hiệu",
      description:
        "Tham gia xây dựng nội dung học tập và sản phẩm công nghệ giáo dục.",
      delay: 600,
    },
    {
      time: "Blockchain, Web3, AI",
      title: "Chuyên gia công nghệ mới",
      subtitle: "Đào tạo & diễn giả",
      description:
        "Chia sẻ chuyên môn về DeFi, NFT, Metaverse, Web3 và AI trong cộng đồng công nghệ.",
      delay: 800,
    },
  ];

  const renderTimeline = (items: any[]) =>
    items.map((item, index) => (
      <li key={index} data-aos="fade-up" data-aos-duration="2000" data-aos-delay={item.delay}>
        <div className="relative pl-6">
          <div className="absolute left-0 top-1.5 w-3 h-3 bg-primary rounded-full"></div>
          <div className="mb-1 text-sm text-amber-400">{item.time}</div>
          <h5 className="text-lg font-bold">
            {item.title}
            <span className="block text-sm font-medium text-gray-500">
              - {item.subtitle}
            </span>
          </h5>
          <p className="text-gray-300 mt-2">{item.description}</p>
        </div>
      </li>
    ));

  return (
    <section id="awards">
      <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">
        <div className="mb-12">
          <div
            className="text-center mb-8"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay="300"
          >
            <p className="text-gray-600 uppercase tracking-wide">qualification</p>
            <h2 className="text-3xl font-bold">
              <span className="text-primary text-amber-400">Achievements</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-stretch gap-2">
            <div className="flex-1" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400">
              <div className="bg-transparent rounded-lg p-6 h-full">
                <ul className="timeline space-y-6">{renderTimeline(educationTimeline)}</ul>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-400 mx-4"></div>

            <div className="flex-1" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
              <div className="bg-transparent rounded-lg p-6 h-full">
                <ul className="timeline space-y-6">{renderTimeline(experienceTimeline)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

