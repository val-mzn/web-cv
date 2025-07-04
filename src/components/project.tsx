import { Rocket, Github, ExternalLink, Calendar, Code2, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Section from "./section";
import SectionTitle from "./section-title";

// Import des icônes des technologies
import ReactIcon from "../assets/icons/react/react-original.svg";
import TypeScriptIcon from "../assets/icons/typescript/typescript-original.svg";
import TailwindIcon from "../assets/icons/tailwindcss/tailwindcss-original.svg";
import DotNetIcon from "../assets/icons/dotnetcore/dotnetcore-original.svg";
import CSharpIcon from "../assets/icons/csharp/csharp-original.svg";
import NodeJsIcon from "../assets/icons/nodejs/nodejs-original.svg";
import SQLServerIcon from "../assets/icons/microsoftsqlserver/microsoftsqlserver-original.svg";
import DockerIcon from "../assets/icons/docker/docker-original.svg";

export default function Project() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = [
    {
      id: "poqet",
      title: "Application mobile PWA - Secteur Hospitalier",
      description: "Conception et développement complet d'une application mobile React PWA pour la gestion des données hospitalières. Déployée sur App Store et Google Play.",
      image: "/images/project-ecommerce.jpg",
      technologies: [
        { name: "React", icon: ReactIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "TailwindCSS", icon: TailwindIcon },
        { name: ".NET Core", icon: DotNetIcon },
        { name: "SQL Server", icon: SQLServerIcon }
      ],
      features: [
        "Authentification JWT",
        "Planning des temps médicaux",
        "Interface d'administration",
        "API REST sécurisée"
      ],
      status: "En production",
      date: "2025",
      category: "Full Stack"
    },
    {
      id: "social",
      title: "Réseau Social Full Stack",
      description: "Développement d'une plateforme sociale complète avec API REST .NET, authentification JWT, système de posts en temps réel et gestion d'images. Architecture microservices dockerisée avec CI/CD automatisé.",
      image: "/images/project-tasks.jpg", // Placeholder
      technologies: [
        { name: "React", icon: ReactIcon },
        { name: "Node.js", icon: NodeJsIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Tailwind", icon: TailwindIcon },
        { name: "Docker", icon: DockerIcon }
      ],
      features: [
        "Collaboration temps réel",
        "Notifications push",
        "Drag & Drop",
        "Rapports analytiques",
        "Intégrations Slack/Teams"
      ],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://tasks-demo.com",
      status: "En développement",
      date: "2024",
      category: "Full Stack"
    },
    {
      id: "poker-planning",
      title: "Application - Estimation poker planning",
      description: "Conception et développement d'une application de poker planning permettant aux équipes de développement d'estimer collectivement la complexité des tâches en points d'effort",
      image: "/images/project-api.jpg", // Placeholder
      technologies: [
        { name: "C#", icon: CSharpIcon },
        { name: ".NET Core", icon: DotNetIcon },
        { name: "Docker", icon: DockerIcon },
        { name: "SQL Server", icon: SQLServerIcon }
      ],
      features: [
        "Rate limiting",
        "Circuit breaker",
        "Logging centralisé",
        "Métriques Prometheus",
        "Documentation OpenAPI"
      ],
      githubUrl: "https://github.com/username/api-gateway",
      liveUrl: null,
      status: "En production",
      date: "2023",
      category: "Full Stack"
    },
    {
      id: "portfolio-cv",
      title: "Portfolio Interactif",
      description: "CV numérique moderne avec animations fluides, design responsive et optimisations de performance.",
      image: "/images/project-portfolio.jpg",
      technologies: [
        { name: "React", icon: ReactIcon },
        { name: "TypeScript", icon: TypeScriptIcon },
        { name: "Tailwind", icon: TailwindIcon }
      ],
      features: [
        "Animations Framer Motion",
        "Design responsive",
        "Performance optimisée"
      ],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://mon-portfolio.com",
      status: "En production",
      date: "2024",
      category: "Frontend"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En production": return "bg-emerald-500";
      case "En développement": return "bg-cyan-500";
      case "Terminé": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Full Stack": return "from-purple-500 to-purple-600";
      case "Frontend": return "from-cyan-500 to-cyan-600";
      case "Backend": return "from-teal-500 to-teal-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <Section id="projects">
      <SectionTitle title="Projets" icon={Rocket} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Image du projet */}
            <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              
              {/* Placeholder pour l'image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Code2 className="w-16 h-16 text-white/30" />
              </div>
              
              {/* Badge statut */}
              <div className="absolute top-4 left-4 z-20">
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)} shadow-lg`}>
                  {project.status}
                </div>
              </div>
              
              {/* Badge catégorie */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(project.category)} shadow-lg`}>
                  {project.category}
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {/* En-tête */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </div>
                </div>
                
                {/* Liens */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4 text-white" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4 text-white" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Technologies utilisées</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg border border-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                    >
                      <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                      <span className="text-xs text-gray-300">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités clés */}
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredProject === project.id ? "auto" : 0,
                  opacity: hoveredProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-sm font-medium text-white mb-2">Fonctionnalités clés</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-xs text-gray-400">
                      <Star className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

    </Section>
  );
}