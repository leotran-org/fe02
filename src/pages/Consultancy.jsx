import {
  Rocket,
  Brain,
  RefreshCw,
  Handshake,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

export default function Consultancy() {
  return (
    <section id="consultancy">
      <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">


        <div className="w-full max-w-6xl mx-auto py-12">
          <h3 className="text-center text-lg font-medium text-gray-500 mb-2">
            CONSULTING EXPERTISE
          </h3>
          <h2 className="text-center text-4xl font-extrabold text-blue-900 mb-10">
            <span className="text-purple-600">Chuyên môn & Dịch vụ hợp tác</span>
          </h2>

          {/* Scrollable Card Container */}
          <div className="overflow-x-auto scrollbar-hide flex justify-center">
            <div className="flex flex-wrap gap-x-6 gap-y-6 min-w-max w-fit pb-4">

              <div className="flex flex-col items-center justify-center space-y-6 mb-6">
                {/* Card 1 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Rocket className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Blockchain & Web3
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tư vấn DeFi, NFT, Smart Contracts và Metaverse.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Brain className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Trí tuệ nhân tạo
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tư vấn AI Marketing, GenAI và Machine Learning.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6 mb-6">
                {/* Card 3 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <RefreshCw className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Chuyển đổi số
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tối ưu hóa quy trình và chuyển đổi số cho doanh nghiệp.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Handshake className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Khởi nghiệp & Đầu tư
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Cố vấn Startup, phát triển sản phẩm và gọi vốn.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6 mb-6">
                {/* Card 5 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <GraduationCap className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo tổ chức
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Tổ chức workshop, chương trình đào tạo kỹ năng số và công nghệ.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="w-[300px] h-[240px] bg-white border border-gray-100 shadow-xl rounded-2xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Lightbulb className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Mạng lưới & Đối tác
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Kết nối chuyên gia và phát triển mạng lưới quốc tế.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

