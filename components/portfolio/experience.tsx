"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  description?: string
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience")
        const data = await res.json()
        setExperiences(data.experiences || [])
      } catch (error) {
        console.error("Failed to load experience")
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [])

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Experience Timeline
        </motion.h2>

        {loading && (
          <p className="text-center text-gray-400">
            Loading experience...
          </p>
        )}

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 transform -translate-x-1/2 rounded-full" />

          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex ${
                    isLeft
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 w-5 h-5 bg-purple-500 rounded-full border-4 border-black transform -translate-x-1/2 z-10" />

                  {/* Card */}
                  <div className="w-full md:w-5/12 p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
                    <h3 className="text-xl font-semibold text-white">
                      {exp.role}
                    </h3>

                    <p className="text-purple-400 font-medium">
                      {exp.company}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(exp.startDate).toLocaleDateString()}{" "}
                      -{" "}
                      {exp.endDate
                        ? new Date(
                            exp.endDate
                          ).toLocaleDateString()
                        : "Present"}
                    </p>

                    {exp.description && (
                      <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
