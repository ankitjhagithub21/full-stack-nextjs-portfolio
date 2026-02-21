"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface Project {
  _id: string
  title: string
  description: string
  image:{
    url:string
  }
  category: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const data = await res.json()
        setProjects(data.projects || [])
      } catch (error) {
        console.error("Failed to load projects")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section
      id="projects"
      className="py-24 px-6 relative"
    >
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading projects...
          </p>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl"
            >
              {/* Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={project.image.url}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                  <ExternalLink className="text-white w-8 h-8" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-3">
                  {project.description}
                </p>

                <span className="text-xs text-purple-400 uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
