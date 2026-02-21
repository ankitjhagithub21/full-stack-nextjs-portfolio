"use client"

import { motion } from "framer-motion"

interface Experience {
  _id: string
  company: string
  position: string
  description: string
  startDate: string
  endDate?: string
  currentlyWorking: boolean
  location?: string
}

interface ExperienceProps {
  data: Experience[]
}

export default function Experience({ data }: ExperienceProps) {
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

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 transform -translate-x-1/2 rounded-full" />

          <div className="space-y-16">
            {data.map((exp, index) => {
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
                      {exp.position}
                    </h3>

                    <p className="text-purple-400 font-medium">
                      {exp.company}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(exp.startDate).toLocaleDateString("en-US", { 
                        year: 'numeric', 
                        month: 'short' 
                      })}{" "}
                      -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : new Date(exp.endDate!).toLocaleDateString("en-US", { 
                            year: 'numeric', 
                            month: 'short' 
                          })}
                    </p>

                    {exp.location && (
                      <p className="text-sm text-gray-500 mt-1">
                        📍 {exp.location}
                      </p>
                    )}

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
