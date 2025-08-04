import projectLinks from "../constants/projectLinks";

export default function Projects() {
  return (
    <section
      id="projects"
    > 
    <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">

      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 tracking-tight">
          📘 Topics & Dự án
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projectLinks.map((group, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 transition duration-200 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-4">
                {index + 1}. {group.category}
              </h3>
              <ul className="list-decimal list-inside space-y-2 text-sm text-gray-800">
                {group.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
        </div>
    </section>
  );
}

