import Hero from "@/components/portfolio/hero"
import About from "@/components/portfolio/about"
import Skills from "@/components/portfolio/skills"
import Experience from "@/components/portfolio/experience"
import Education from "@/components/portfolio/education"
import Projects from "@/components/portfolio/projects"
import Contact from "@/components/portfolio/contact"
import Footer from "@/components/portfolio/footer"
import Background from "@/components/portfolio/background"
import CustomCursor from "@/components/portfolio/custom-cursor"

export default function HomePage() {
  return (
    <main className="flex flex-col gap-24 bg-black">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
      <Footer />
      <CustomCursor />
    </main>
  )
}
