import Header from "./components/header";
import Navbar from "./components/navbar";
import AboutMe from "./components/about-me";
import Experience from "./components/experience";
import Skills from "./components/skills";
import Project from "./components/project";
import Education from "./components/education";
import Contact from "./components/contact";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <Navbar />
      <AboutMe />
      <Experience />
      <Education  />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}