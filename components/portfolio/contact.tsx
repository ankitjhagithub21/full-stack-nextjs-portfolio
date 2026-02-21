"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess(true)
        setForm({ name: "", email: "", message: "" })
      }
    } catch (error) {
      console.error("Error sending message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent"
        >
          Let’s Work Together
        </motion.h2>

        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 relative group"
        >
          {/* Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

          <form
            onSubmit={handleSubmit}
            className="relative p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl space-y-6"
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-4 bg-transparent border border-white/20 rounded-xl focus:border-pink-500 outline-none text-white peer"
                placeholder=" "
              />
              <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-400 bg-black px-1 rounded">
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-4 bg-transparent border border-white/20 rounded-xl focus:border-pink-500 outline-none text-white peer"
                placeholder=" "
              />
              <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-400 bg-black px-1 rounded">
                Your Email
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-4 bg-transparent border border-white/20 rounded-xl focus:border-pink-500 outline-none text-white peer resize-none"
                placeholder=" "
              />
              <label className="absolute left-4 top-4 text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink-400 bg-black px-1 rounded">
                Your Message
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-white hover:scale-[1.02] transition transform duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-400 text-center">
                Message sent successfully 🚀
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}
