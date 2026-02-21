"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Skill {
  _id: string
  name: string
  level?: string
  category?: string
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills")
        const data = await res.json()
        setSkills(data.skills || [])
      } catch (error) {
        console.error("Failed to fetch skills")
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading skills...
          </p>
        )}

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative z-10 space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>

                {skill.category && (
                  <p className="text-sm text-gray-400">
                    {skill.category}
                  </p>
                )}

                {skill.level && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    {skill.level}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
