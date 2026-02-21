"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface About {
  _id: string
  title: string
  subtitle: string
  description: string
  profileImage?: {
    url: string
    public_id: string
  }
  resumeUrl?: string
  yearsExperience: number
  projectsCompleted: number
  skills: string[]
}

interface AboutProps {
  data: About | null
}

export default function About({ data }: AboutProps) {
  if (!data) {
    return (
      <section id="about" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">About information not available</p>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT - Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />

          <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl bg-white/5">
            <Image
              src={data.profileImage?.url || "/profile.jpg"}
              alt="Profile"
              width={500}
              height={600}
              className="object-cover w-full h-full hover:scale-105 transition duration-500"
            />
          </div>
        </motion.div>

        {/* RIGHT - Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {data.title}
          </h2>

          <p className="text-gray-400 leading-relaxed">
            {data.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <h3 className="text-3xl font-bold text-purple-400">{data.yearsExperience}+</h3>
              <p className="text-gray-400 text-sm mt-2">
                Years Experience
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-center"
            >
              <h3 className="text-3xl font-bold text-pink-400">{data.projectsCompleted}+</h3>
              <p className="text-gray-400 text-sm mt-2">
                Projects Completed
              </p>
            </motion.div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Key Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Button */}
          {data.resumeUrl && (
            <motion.a
              href={data.resumeUrl}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-purple-500/40 transition"
            >
              Download Resume
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
