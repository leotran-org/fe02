import {
    Globe,
    Handshake,
    LineChart,
    Rocket,
    GraduationCap,
    Mic,
} from "lucide-react";

const experienceData = [
    {
        icon: <Globe className="w-12 h-12 text-amber-500" />,
        title: "Giám đốc Quốc gia tại Navagis",
        description: "Đối tác chiến lược của Google với hơn 20 năm kinh nghiệm.",
    },
    {
        icon: <Handshake className="w-12 h-12 text-amber-500" />,
        title: "Đối tác Quỹ Đầu tư Expara",
        description: "Đối tác phát triển Chương trình Tăng tốc tại Quỹ Đầu tư Expara.",
    },
    {
        icon: <LineChart className="w-12 h-12 text-amber-500" />,
        title: "Giám đốc Kinh doanh tại Unitex",
        description: "Công ty tư vấn giải pháp AI và Blockchain cho doanh nghiệp.",
    },
    {
        icon: <Rocket className="w-12 h-12 text-amber-500" />,
        title: "Founder của OffChain Saigon",
        description: "Cộng đồng blockchain tại Việt Nam.",
    },
    {
        icon: <GraduationCap className="w-12 h-12 text-amber-500" />,
        title: "Giảng viên tại đại học HUTECH",
        description: "Giảng viên Khoa Tài chính Thương mại tại Đại học HUTECH.",
    },
    {
        icon: <Mic className="w-12 h-12 text-amber-500" />,
        title: "Diễn giả & Cố vấn Khởi nghiệp",
        description:
        "Diễn giả và cố vấn cho các cuộc thi và chương trình đổi mới sáng tạo.",
    },
];

function ExperienceCard({ icon, title, description }) {
    return (
        <div className="w-[300px] h-[240px] flex-shrink-0 bg-white/5 shadow-[0_4px_15px_rgba(255,255,255,0.1)] rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white/80 mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

// Helper to group the data into N groups for 2-row layout
function groupIntoColumns(data, rowCount = 2) {
    const columns = Array.from({ length: Math.ceil(data.length / rowCount) }, () =>
        Array.from({ length: rowCount })
    );
    data.forEach((item, i) => {
        const col = Math.floor(i / rowCount);
        const row = i % rowCount;
        columns[col][row] = item;
    });
    return columns;
}

export default function Experience() {
    const columns = groupIntoColumns(experienceData, 2);

    return (
        <section id="experience">
            <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">
                <div className="w-full max-w-6xl mx-auto py-12">
                    <h3 className="text-center text-lg font-medium text-gray-500 mb-2">
                        LEADERSHIP INSIGHTS
                    </h3>
                    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-10">
                        <span className="text-amber-400">Kinh Nghiệm Lãnh Đạo</span>
                    </h2>

                    <div className="md:flex md:justify-center md:overflow-visible overflow-x-auto scrollbar-hide w-full px-4 md:px-0">
                        <div className="flex gap-x-6 w-max md:w-auto pb-4">
                            {columns.map((col, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center justify-center space-y-6"
                                >
                                    {col.map(
                                        (item, rowIdx) =>
                                            item && (
                                                <ExperienceCard
                                                    key={`${idx}-${rowIdx}`}
                                                    icon={item.icon}
                                                    title={item.title}
                                                    description={item.description}
                                                />
                                            )
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
