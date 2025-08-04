import {
  Rocket,
  Brain,
  RefreshCw,
  Handshake,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

const consultingItems = [
  {
    icon: Rocket,
    title: "Blockchain & Web3",
    description: "Tư vấn DeFi, NFT, Smart Contracts và Metaverse.",
  },
  {
    icon: Brain,
    title: "Trí tuệ nhân tạo",
    description: "Tư vấn AI Marketing, GenAI và Machine Learning.",
  },
  {
    icon: RefreshCw,
    title: "Chuyển đổi số",
    description: "Tối ưu hóa quy trình và chuyển đổi số cho doanh nghiệp.",
  },
  {
    icon: Handshake,
    title: "Khởi nghiệp & Đầu tư",
    description: "Cố vấn Startup, phát triển sản phẩm và gọi vốn.",
  },
  {
    icon: GraduationCap,
    title: "Đào tạo tổ chức",
    description: "Tổ chức workshop, chương trình đào tạo kỹ năng số và công nghệ.",
  },
  {
    icon: Lightbulb,
    title: "Mạng lưới & Đối tác",
    description: "Kết nối chuyên gia và phát triển mạng lưới quốc tế.",
  },
];

function Card({ Icon, title, description }: { Icon: any; title: string; description: string }) {
  return (
    <div className="w-[300px] h-[240px] flex-shrink-0 bg-white/5 shadow-[0_4px_15px_rgba(255,255,255,0.1)] rounded-2xl p-6 text-center">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-amber-500" />
      </div>
      <h3 className="text-xl font-bold text-white-80 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Consultancy() {
  const cardPairs = chunkArray(consultingItems, 2);

  return (
    <section id="consultancy">
      <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">
        <div className="w-full max-w-6xl mx-auto py-12">
          <h3 className="text-center text-lg font-medium text-gray-500 mb-2">
            CONSULTING EXPERTISE
          </h3>
          <h2 className="text-center text-4xl font-extrabold text-amber-400 mb-10">
            <span className="text-amber-400">Chuyên môn & Dịch vụ hợp tác</span>
          </h2>

          <div className="overflow-x-auto scrollbar-hide flex justify-center">
            <div className="flex gap-x-6 min-w-max w-fit pb-4">
              {cardPairs.map((pair, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y-6 mb-6"
                >
                  {pair.map(({ icon: Icon, title, description }, idx) => (
                    <Card key={idx} Icon={Icon} title={title} description={description} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

