import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import ScrollToHash from "@/components/ScrollToHash";
import { getProjects } from "@/lib/supabase/projects";
import { getExperiences } from "@/lib/supabase/experience";
import { getSkills } from "@/lib/supabase/skills";
import { getSiteContent } from "@/lib/supabase/site-content";

export default async function Home() {
  const [projects, experiences, skills, siteContent] = await Promise.all([
    getProjects(),
    getExperiences(),
    getSkills(),
    getSiteContent(),
  ]);

  return (
    <>
      <ScrollToHash />
      <Hero
        name={siteContent.name}
        tagline={siteContent.tagline}
        email={siteContent.email}
        linkedinUrl={siteContent.linkedinUrl}
        githubUrl={siteContent.githubUrl}
        phrases={siteContent.typedPhrases}
      />
      <About
        projectCount={projects.length}
        skillCount={skills.length}
        bioParagraphs={siteContent.bioParagraphs}
        focusAreas={siteContent.focusAreas}
        images={siteContent.aboutImages}
      />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Contact />
    </>
  );
}
