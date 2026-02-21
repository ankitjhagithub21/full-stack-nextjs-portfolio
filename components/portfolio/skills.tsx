"use client"

import { motion } from "framer-motion"

interface Skill {
  _id: string
  name: string
  level: number
  category: string
  icon?: string
  order: number
}

interface SkillsProps {
  data: Skill[]
}

export default function Skills({ data }: SkillsProps) {
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

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((skill, index) => (
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

                <p className="text-sm text-gray-400">
                  {skill.category}
                </p>

                {/* Skill Level Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Proficiency</span>
                    <span className="text-xs text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
