import { motion, type Transition } from "motion/react";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";

export default function Header() {
  const blobSize = 288; // 288px = w-72 h-72

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX - blobSize / 2);
      setMouseY(e.clientY - blobSize / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const randomPosition = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const x = Math.random() * width - blobSize / 2;
    const y = Math.random() * height - blobSize / 2;

    return {
      y: y + "px",
      x: x + "px",
      scale: Math.random() * 0.4 + 0.6,
    };
  };

  const transition: Transition = {
    duration: Math.random() * 5 + 15,
    delay: 0,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse",
  };

  const colors = ["bg-cyan-500", "bg-teal-500", "bg-indigo-500"];
  const nbBlobs = 9;

  const socials: {
    icon: LucideIcon;
    text: string;
    link: string;
    color: string;
  }[] = [
    {
      icon: Mail,
      text: "valentinomanzon@gmail.com",
      link: "mailto:valentinomanzon@gmail.com",
      color: "text-purple-500",
    },
    {
      icon: Phone,
      text: "+33 7 83 87 33 80",
      link: "tel:+33783873380",
      color: "text-teal-500",
    },
    {
      icon: MapPin,
      text: "Genève, Suisse",
      link: "https://www.google.com/maps/place/Gen%C3%A8ve",
      color: "text-emerald-500",
    },
  ];

  const links: {
    icon: LucideIcon;
    text: string;
    link: string;
    color?: string;
    className?: string;
  }[] = [
    {
      icon: Download,
      text: "Télécharger mon CV",
      link: "/documents/cv.pdf",
      className: "text-white bg-gradient-to-r from-indigo-500 via-cyan-500 to-teal-500",
    },
    {
      icon: Linkedin,
      text: "Linkedin",
      link: "https://www.linkedin.com/in/valentino-manzon/",
      color: "text-cyan-500",
    },
    {
      icon: Github,
      text: "Github",
      link: "https://github.com/valentino-manzon",
      color: "text-emerald-500",
    },
  ];

  return (
    <div id="header" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {Array.from({ length: nbBlobs }).map((_, index) => (
          <motion.div
            key={index}
            className={`absolute w-72 h-72 ${colors[index % colors.length]} rounded-full blur-3xl opacity-30`}
            initial={randomPosition()}
            animate={randomPosition()}
            transition={transition}
          />
        ))}

        <div
          className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-10"
          style={{
            top: mouseY + "px",
            left: mouseX + "px",
            scale: 1,
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center z-10">
        <img
          src="/images/profile.png"
          alt="Valentino Manzon"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full ring-4 ring-white"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-center">
          Valentino Manzon
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl mt-4 text-center">
          <span className="text-white mr-2">Développeur Fullstack</span>
          <span className="text-cyan-200 mr-2 font-bold">React</span>
          <span className="text-white mr-2">et</span>
          <span className="text-cyan-200 font-bold">.NET</span>
        </h2>

        <div className="flex flex-col gap-6 justify-center items-center mt-8 sm:mt-12 w-full max-w-4xl">
          {/* Informations de contact - responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
            {socials.map((social, index) => (
              <div
                key={index}
                className="rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 p-3 sm:p-4 flex items-center justify-center gap-2 text-white hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20"
                onClick={() => window.open(social.link)}
              >
                <social.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${social.color} flex-shrink-0`} />
                <span className="text-sm sm:text-base truncate">{social.text}</span>
              </div>
            ))}
          </div>

          {/* Liens - responsive layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            {links.map((link, index) => (
              <div
                key={index}
                className={`rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 p-3 sm:p-4 flex items-center justify-center gap-2 text-white hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20 ${link.className}`}
                onClick={() => window.open(link.link)}
              >
                <link.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${link.color} flex-shrink-0`} />
                <span className="text-sm sm:text-base whitespace-nowrap">{link.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll down */}
      <motion.div
        className="absolute bottom-5 left-0 w-full h-10 flex items-center justify-center"
        animate={{ opacity: scrollY > 100 ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <ArrowDown className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-bounce" />
      </motion.div>
    </div>
  );
}
