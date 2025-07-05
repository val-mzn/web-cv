import { Code, Zap, Database, Terminal, Wrench, Server, Computer } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Section from "./section";
import SectionTitle from "./section-title";

// Types pour clarifier la structure
type Skill = {
  name: string;
  level: number;
  icon: string; // Path vers SVG
};

type SkillCategory = {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Composant React de lucide-react
  color: string;
  skills: Skill[];
};

// Import des icônes des technologies
import ReactIcon from "../assets/icons/react/react-original.svg";
import TypeScriptIcon from "../assets/icons/typescript/typescript-original.svg";
import NextJsIcon from "../assets/icons/nextjs/nextjs-original.svg";
import TailwindIcon from "../assets/icons/tailwindcss/tailwindcss-original.svg";
import HTML5Icon from "../assets/icons/html5/html5-original.svg";
import DotNetIcon from "../assets/icons/dotnetcore/dotnetcore-original.svg";
import CSharpIcon from "../assets/icons/csharp/csharp-original.svg";
import NodeJsIcon from "../assets/icons/nodejs/nodejs-original.svg";
import SQLServerIcon from "../assets/icons/microsoftsqlserver/microsoftsqlserver-original.svg";
import OracleIcon from "../assets/icons/oracle/oracle-original.svg";
import PythonIcon from "../assets/icons/python/python-original.svg";
import DockerIcon from "../assets/icons/docker/docker-original.svg";
import GitIcon from "../assets/icons/git/git-original.svg";
import LinuxIcon from "../assets/icons/linux/linux-original.svg";
import VSCodeIcon from "../assets/icons/vscode/vscode-original.svg";
import PostmanIcon from "../assets/icons/postman/postman-original.svg";

import VisualStudioIcon from "../assets/icons/visualstudio/visualstudio-original.svg";
import SSHIcon from "../assets/icons/ssh/ssh-original.svg";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      name: "Frontend",
      icon: Computer,
      color: "from-cyan-500 to-cyan-600",
      skills: [
        { name: "React", level: 90, icon: ReactIcon },
        { name: "Tailwind CSS", level: 90, icon: TailwindIcon },
        { name: "HTML/CSS", level: 90, icon: HTML5Icon },
        { name: "TypeScript", level: 80, icon: TypeScriptIcon },
        { name: "Next.js", level: 70, icon: NextJsIcon },
      ]
    },
    {
      id: "backend",
      name: "Backend",
      icon: Server,
      color: "from-teal-500 to-teal-600",
      skills: [
        { name: "C#", level: 90, icon: CSharpIcon },
        { name: ".NET Core", level: 90, icon: DotNetIcon },
        { name: ".NET Framework", level: 80, icon: DotNetIcon },
        { name: "Node.js", level: 70, icon: NodeJsIcon },

      ]
    },
    {
      id: "database",
      name: "Database",
      icon: Database,
      color: "from-purple-500 to-purple-600",
      skills: [
        { name: "SQL Server", level: 90, icon: SQLServerIcon },
        { name: "Oracle", level: 80, icon: OracleIcon },
      ]
    },
    {
      id: "devops",
      name: "DevOps",
      icon: Terminal,
      color: "from-indigo-500 to-indigo-600",
      skills: [
        { name: "Git", level: 95, icon: GitIcon },
        { name: "Docker", level: 80, icon: DockerIcon },
        { name: "Linux", level: 80, icon: LinuxIcon },
        { name: "CI/CD", level: 80, icon: GitIcon },
      ]
    }, 
    {
      id: "tools",
      name: "Tools",
      icon: Wrench,
      color: "from-orange-500 to-orange-600",
      skills: [
        { name: "VSCode", level: 90, icon: VSCodeIcon },
        { name: "Cursor", level: 80, icon: VSCodeIcon },
        { name: "Visual Studio", level: 70, icon: VisualStudioIcon},
        { name: "Postman", level: 70, icon: PostmanIcon },
      ]
    },
    {
      id: "scripting",
      name: "Scripting",
      icon: Code,
      color: "from-pink-500 to-pink-600",
      skills: [
        { name: "Python", level: 90, icon: PythonIcon },
        { name: "Bash", level: 80, icon: SSHIcon },
      ]
    }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 90) return "from-emerald-400 to-emerald-500";
    if (level >= 80) return "from-cyan-400 to-cyan-500";
    if (level >= 70) return "from-amber-400 to-amber-500";
    return "from-rose-400 to-rose-500";
  };

  const getProgressColor = (level: number) => {
    if (level >= 90) return "bg-emerald-500";
    if (level >= 80) return "bg-cyan-500";
    if (level >= 70) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <Section id="skills" className="bg-slate-800">
      <SectionTitle title="Compétences" icon={Code} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            {/* En-tête de catégorie */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
            </div>

            {/* Liste des compétences */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20">
                    {/* Icône de la technologie */}
                    <div className="flex-shrink-0">
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Nom et barre de progression */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                          {skill.level}%
                        </span>
                      </div>
                      
                      {/* Barre de progression */}
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${getProgressColor(skill.level)} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: hoveredSkill === skill.name ? `${skill.level}%` : `${skill.level}%` 
                          }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: skillIndex * 0.1 }}
                        >
                          {/* Effet de brillance */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-6 h-full rounded-full animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Indicateur de niveau */}
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} shadow-lg`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Légende */}
      <motion.div
        className="mt-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          Niveau de maîtrise
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-gray-300">Expert (90%+)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
            <span className="text-gray-300">Avancé (80-89%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-gray-300">Intermédiaire (70-79%)</span>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}