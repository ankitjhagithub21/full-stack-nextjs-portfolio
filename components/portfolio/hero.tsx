"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set(e.clientX - innerWidth / 2)
      mouseY.set(e.clientY - innerHeight / 2)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () =>
      window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 blur-3xl" />

      <div className="relative max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE - Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Your Name
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg"
          >
            Full Stack Developer crafting immersive digital experiences with
            modern technologies.
          </motion.p>

          {/* Buttons */}
          <div className="flex gap-6 pt-4">
            <a
              href="#projects"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE - 3D Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-[400px] rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center"
        >
          {/* Floating Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-40" />

          <div className="relative text-center space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              Creative Developer
            </h2>
            <p className="text-gray-400">
              Building modern web apps with Next.js & MongoDB
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute top-20 left-10 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-pink-500/20 rounded-full blur-3xl"
      />
    </section>
  )
}
