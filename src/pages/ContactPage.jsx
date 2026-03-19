import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const fields = [
  { id: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", half: true },
  { id: "email", label: "Email", type: "email", placeholder: "john@company.com", half: true },
  { id: "mobile", label: "Mobile", type: "tel", placeholder: "+1 000 000 0000", half: true },
  { id: "company", label: "Company Name", type: "text", placeholder: "Acme Inc.", half: true },
  { id: "requirement", label: "Describe Your Requirement", type: "textarea", placeholder: "Tell us about your project, goals, and timeline...", half: false },
];

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", company: "", requirement: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen font-[NeueMontreal] bg-zinc-900 text-white">
      <Navbar />

      <div className="px-[3.922vw] pt-36 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.37, 0, 0.63, 1] }}
          className="mb-16"
        >
          <p className="font-['NeueMontrealLight'] text-zinc-500 text-[1.1vw] mb-3 uppercase tracking-widest">
            Get in touch
          </p>
          <h1 className="font-['FoundersGrotesk'] uppercase text-[7vw] leading-none text-white">
            Contact Us
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.37, 0, 0.63, 1] }}
            className="flex-1"
          >
            {submitted ? (
              <div className="flex flex-col gap-6 py-20">
                <span className="font-['FoundersGrotesk'] uppercase text-[4vw] text-[#cdea68] leading-none">
                  Thank you!
                </span>
                <p className="font-['NeueMontrealLight'] text-zinc-400 text-[1.2vw] leading-relaxed max-w-[40vw]">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-x-6 gap-y-8">
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={field.half ? "w-[calc(50%-12px)]" : "w-full"}
                  >
                    <label
                      htmlFor={field.id}
                      className="block font-['NeueMontrealLight'] text-zinc-400 text-[1vw] mb-2 uppercase tracking-widest"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        value={form[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        rows={5}
                        className="w-full bg-transparent border-b border-zinc-700 focus:border-[#cdea68] outline-none font-['NeueMontrealLight'] text-white text-[1.1vw] py-3 placeholder:text-zinc-600 transition-colors duration-300 resize-none"
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        value={form[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent border-b border-zinc-700 focus:border-[#cdea68] outline-none font-['NeueMontrealLight'] text-white text-[1.1vw] py-3 placeholder:text-zinc-600 transition-colors duration-300"
                      />
                    )}
                  </div>
                ))}

                <div className="w-full pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-4 px-10 py-4 bg-[#cdea68] text-zinc-900 font-['NeueMontrealLight'] text-[1.1vw] rounded-full hover:bg-white transition-colors duration-300"
                  >
                    <span>Send Message</span>
                    <span className="w-2 h-2 rounded-full bg-zinc-900" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right — info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.37, 0, 0.63, 1] }}
            className="lg:w-[28vw] flex flex-col gap-12 pt-2"
          >
            <div>
              <p className="font-['NeueMontrealLight'] text-zinc-500 text-[0.9vw] uppercase tracking-widest mb-3">
                Email
              </p>
              <p className="font-['NeueMontrealLight'] text-white text-[1.1vw]">
                contactus@velosynq.io
              </p>
            </div>
            <div>
              <p className="font-['NeueMontrealLight'] text-zinc-500 text-[0.9vw] uppercase tracking-widest mb-3">
                Based in
              </p>
              <p className="font-['NeueMontrealLight'] text-white text-[1.1vw]">
                Remote — Worldwide
              </p>
            </div>
            <div>
              <p className="font-['NeueMontrealLight'] text-zinc-500 text-[0.9vw] uppercase tracking-widest mb-3">
                Response time
              </p>
              <p className="font-['NeueMontrealLight'] text-white text-[1.1vw]">
                Within 48 hours
              </p>
            </div>
            <div className="border-t border-zinc-800 pt-10">
              <p className="font-['NeueMontrealLight'] text-zinc-500 text-[0.9vw] uppercase tracking-widest mb-5">
                Follow us
              </p>
              <div className="flex flex-col gap-3">
                {["LinkedIn", "Twitter / X", "GitHub"].map((s) => (
                  <span
                    key={s}
                    className="font-['NeueMontrealLight'] text-zinc-400 text-[1.1vw] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
