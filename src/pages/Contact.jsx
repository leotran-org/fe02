import React from "react";

export default function Contact() {
  const submitForm = (e) => {
    e.preventDefault();
    // Add submission logic here
  };

  return (
    <section id="contact" className="relative py-12 mt-10 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap gap-10">
        {/* Contact Info - 1/3 Width */}
        <div className="w-full lg:w-1/3 space-y-6">
          {/* Email */}
          <div className="flex items-start p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 hover:bg-white/10">
            <div className="mr-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-lg mb-1">Email</h4>
              <p>
                <a href="mailto:hehehe@protonmail.com" className="text-white hover:text-purple-300 transition">
                  hehehe@protonmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 hover:bg-white/10">
            <div className="mr-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-lg mb-1">Location</h4>
              <p className="text-white/80">Istanbul, Turkey</p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-start p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 hover:bg-white/10">
            <div className="mr-4 w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2c-3.1-.6-5.8-2.3-8.63-3.07-2.5-1.1-6-6-6-6S2.2 6 4.1 2h3a2 2 0 0 1 2 1.72c.2 1 .5 2 .7 2.81a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1 .2 1.9.5 2.81.7a2 2 0 0 1 1.63 1.93z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-white text-lg mb-1">Social</h4>
              <div className="flex gap-4">
                {[
                  { name: "Instagram", href: "https://www.instagram.com/hehehe.dev/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/in/hehehe/" },
                  { name: "GitHub", href: "https://github.com/hehehe" }
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-purple-300 relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-bottom-left after:transition-transform duration-500"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - 2/3 Width */}
        <div className="w-full lg:w-2/3 p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur transition-all hover:border-white/20">
          <form onSubmit={submitForm} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-2 text-white/90 text-sm">Name</label>
              <input
                id="name"
                name="entry.1977863006"
                type="text"
                placeholder="Your name"
                required
                className="w-full px-4 py-3 rounded-md border border-white/10 bg-black/20 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/30 focus:bg-black/30 transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-white/90 text-sm">Email</label>
              <input
                id="email"
                name="entry.1990805682"
                type="email"
                placeholder="Your email"
                required
                className="w-full px-4 py-3 rounded-md border border-white/10 bg-black/20 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/30 focus:bg-black/30 transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-white/90 text-sm">Message</label>
              <textarea
                id="message"
                name="entry.2105838083"
                placeholder="Your message"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-md border border-white/10 bg-black/20 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/30 focus:bg-black/30 transition"
              ></textarea>
            </div>

            {/* Optional hCaptcha placeholder */}
            <div className="h-captcha opacity-0 absolute left-[250px] top-[366px]" data-sitekey="47607e84-9ffa-481a-9894-d1eec7d2da04" data-theme="dark"></div>

            <input
              type="submit"
              value="Submit Form"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white font-medium text-base cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-lg animate-gradient-shift"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

