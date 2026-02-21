"use client"
import Hero from "@/components/portfolio/hero"
import About from "@/components/portfolio/about"
import Skills from "@/components/portfolio/skills"
import Experience from "@/components/portfolio/experience"
import Education from "@/components/portfolio/education"
import Projects from "@/components/portfolio/projects"
import Contact from "@/components/portfolio/contact"
import Footer from "@/components/portfolio/footer"
import CustomCursor from "@/components/portfolio/custom-cursor"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import LoadingSpinner from "@/components/portfolio/loading-spinner"

export default function HomePage() {
  const { data, loading, error } = usePortfolioData()

  if (loading) {
    return (
      <main className="flex flex-col gap-24 bg-black min-h-screen">
        <LoadingSpinner />
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex flex-col gap-24 bg-black min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Portfolio</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-24 bg-black">
      <Hero />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Experience data={data.experiences} />
      <Education data={data.education} />
      <Projects data={data.projects} />
      <Contact />
      <Footer />
      <CustomCursor />
    </main>
  )
}
