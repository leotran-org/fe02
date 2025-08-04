import { CircleDot } from "lucide-react";
import { motion } from "framer-motion";

export default function Certificate() {
  const certificates = [
    {
      title: "edX Verified Certificate for Analyzing and Visualizing Data with Power BI",
      date: "2017",
    },
    {
      title: "Tools for Data Science (Coursera)",
      date: "6/2021 & 7/2021",
    },
    {
      title: "Data Science Orientation (Coursera)",
      date: "6/2021",
    },
    {
      title: "Data Science Methodology (Coursera)",
      date: "7/2021",
    },
    {
      title: "Databases and SQL for Data Science (Coursera)",
      date: "8/2021",
    },
  ];

  return (
    <section
      id="certificate">
      <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">

      <div className="w-full max-w-4xl bg-transparent backdrop-blur-lg rounded-3xl p-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent mb-16">
          <span className="text-amber-400">Chứng chỉ quốc tế về công nghệ & khoa học dữ liệu</span>
        </h2>

        <div className="space-y-10">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="grid grid-cols-[40px_1fr] gap-6 relative group"
            >
              {/* Timeline Dot and Line */}
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full border-4 border-amber-500 p-[2px] z-10 shadow-md">
                  <CircleDot className="w-5 h-5 text-amber-600" />
                </div>
                {idx !== certificates.length - 1 && (
                  <div className="flex-1 w-px bg-gradient-to-b from-amber-500 to-amber-200 mt-1" />
                )}
              </div>

              {/* Certificate Content */}
              <div className="bg-white/5 rounded-xl p-5 shadow-[0_4px_15px_rgba(255,255,255,0.1)] transition-shadow duration-300">
                <h3 className="font-semibold text-amber-100/70 text-lg leading-tight">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
        </div>
    </section>
  );
}

