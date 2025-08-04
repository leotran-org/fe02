import contactImg from "../assets/contact.png";
import { FaPhoneAlt, FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
>
      <div className="relative min-h-screen w-full flex items-center justify-center pt-5 text-white">

    
      <div className="w-full max-w-6xl rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-10 p-10 items-center">
        
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src={contactImg}
            alt="Trần Kim Duy Lân tại Eiffel"
            className="rounded-2xl shadow-lg w-full max-w-sm object-cover"
          />
        </div>

        {/* Right: Form + Contact Info */}
        <div className="space-y-10 w-full">
          {/* Contact Form */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
              Send <span className="font-light text-gray-700">a Message</span>
            </h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Author Information */}
          <div className="space-y-4 border-t pt-6 border-gray-300">
            <h3 className="text-xl font-semibold text-blue-900">Or Connect With Me</h3>

            <div className="flex items-center space-x-4 text-gray-700">
              <FaPhoneAlt className="text-yellow-600" />
              <span className="font-semibold">0908310791</span>
            </div>

            <div className="flex items-center space-x-4 text-gray-700">
              <FaEnvelope className="text-yellow-600" />
              <span className="font-semibold">lankimduytran@gmail.com</span>
            </div>

            <div className="flex items-center space-x-4 text-gray-700">
              <FaLinkedin className="text-blue-700" />
              <a
                href="https://linkedin.com/in/lankimduytran"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/lankimduytran
              </a>
            </div>
          </div>
        </div>
      </div>
</div>
    </section>
  );
}

