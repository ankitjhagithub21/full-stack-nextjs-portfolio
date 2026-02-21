"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Education {
  _id: string
  degree: string
  institution: string
  startDate: string
  endDate?: string
  description?: string
}

export default function Education() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/education")
        const data = await res.json()
        setEducation(data.education || [])
      } catch (error) {
        console.error("Failed to load education")
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  return (
    <section id="education" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          Education
        </motion.h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading education...
          </p>
        )}

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Glow Background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />

              {/* Card */}
              <div className="relative p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold text-white">
                  {edu.degree}
                </h3>

                <p className="text-cyan-400 font-medium mt-1">
                  {edu.institution}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {new Date(edu.startDate).toLocaleDateString()}{" "}
                  -{" "}
                  {edu.endDate
                    ? new Date(edu.endDate).toLocaleDateString()
                    : "Present"}
                </p>

                {edu.description && (
                  <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
