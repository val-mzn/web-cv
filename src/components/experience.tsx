import { Briefcase, Calendar, MapPin, ExternalLink, Award } from "lucide-react";
import SectionTitle from "./section-title";
import Section from "./section";

export default function Experience() {
  const experiences = [
    {
      title: "Développeur Fullstack React & .NET",
      company: "Qoia (ex Horizontal Software)",
      location: "Grenoble, France",
      period: "2023 - Présent",
      missions : [
        "Lead technique sur l'architecture React d'une nouvelle application",
        "Conception et développement de modules microservices .NET Core",
        "Mise en place d'une pipeline de traduction automatique entre deux langages de programmation par IA",
        "Refonte graphique complète d'ancien module d'application",
        "Coordination de projets techniques avec méthodes Agile/Scrum",
        "Mise en place d'une architecture microservices dockerisée avec CI/CD automatisé"
      ],
      technologies: ["React", "TypeScript", "C#", ".NET Core", ".NET Framework", "MS SQL Server", "Oracle", "Docker", "Git", "CI/CD", "Agile"],
      color: "from-cyan-600 to-cyan-700",
      current: true,
    },
    {
      title: "Alternant Ingénieur R&D",
      company: "Qoia (ex Horizontal Software)",
      location: "Grenoble, France",
      period: "2022 - 2023",
      missions : [
        "Développement de nouvelles fonctionnalités",
        "Maintenance préventive et résolution rapide d'incidents critiques",
        "Mise en place de tests unitaires et test d'intégration pour améliorer la qualité du code"
      ],
      technologies: ["JavaScript", "jQuery", "C#", ".NET Framework", "MS SQL Server", "Oracle", "Git", "Agile"],
      color: "from-teal-600 to-teal-700",
      current: false,
    },
    {
      title: "Stage Développeur Full Stack",
      company: "My digital Buildin",
      location: "Grenoble, France",
      period: "2021 - 2022",
      missions : [
        "Migration et optimisation de scripts Bash vers Python",
        "Fine tuning d'un modèle de deep learning (YOLO) pour détection de véhicules et de personnes",
        "Intégration de fonctionnalités interactives sur viewer 3D JavaScript/Three.js"
      ],
      technologies: ["Python", "Django", "Bash", "Node.js", "MongoDB"],
      color: "from-indigo-600 to-indigo-700",
      current: false,
    },
  ];

  return (
    <Section id="experience" className="bg-slate-800">
      <SectionTitle title="Expérience" icon={Briefcase} />
      
      <div className="relative">
        {/* Timeline verticale - visible seulement sur desktop */}
        <div className="hidden lg:block absolute left-24 xl:left-27 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-teal-500 to-indigo-500 opacity-30"></div>
        
        <div className="flex flex-col gap-8 lg:gap-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Layout Mobile et Tablet */}
              <div className="lg:hidden">
                <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500">
                  {/* En-tête mobile */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${exp.color} rounded-2xl p-3 shadow-lg flex-shrink-0`}>
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    {exp.current && (
                      <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-400/20 rounded-full px-2 py-1">
                        <Award className="h-3 w-3" />
                        <span>Actuel</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-base sm:text-lg text-cyan-400 font-semibold mb-3">{exp.company}</p>
                    
                    {/* Infos période et lieu */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300 text-sm bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20 w-fit">
                        <Calendar className="h-3 w-3 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20 w-fit">
                        <MapPin className="h-3 w-3 text-emerald-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4 space-y-1">
                    {exp.missions.map((mission, missionIndex) => (
                      <li key={missionIndex} className="list-disc list-inside">{mission}</li>
                    ))}
                  </ul>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-400 tracking-wider">Technologies utilisées</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium text-white bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Layout Desktop */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-8 items-center">
                {/* Timeline point et icône */}
                <div className="col-span-1 flex flex-col items-center relative z-10">
                  <div className={`relative bg-gradient-to-br ${exp.color} rounded-2xl p-5 shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                    <Briefcase className="h-7 w-7 text-white" />
                  </div>
                  
                  <div className="flex flex-col items-center mt-6 text-center space-y-3">
                    <div className="flex items-center gap-2 text-gray-300 text-sm font-medium bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm font-medium bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20">
                      <MapPin className="h-4 w-4 text-emerald-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="col-span-4">
                  <div className="rounded-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group-hover:translate-x-2">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          {exp.current && (
                            <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-400/20 rounded-full px-2 py-1">
                              <Award className="h-3 w-3" />
                              <span>Actuel</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-xl text-cyan-400 font-semibold">{exp.company}</p>
                          <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer hover:text-cyan-400" />
                        </div>
                      </div>
                    </div>
                    
                    <ul className="text-gray-300 leading-relaxed mb-6 list-disc list-inside">
                      {exp.missions.map((mission, missionIndex) => (
                        <li key={missionIndex} className="list-disc list-inside">{mission}</li>
                      ))}
                    </ul>
                    
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-400 tracking-wider">Technologies utilisées</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-2 text-sm font-medium text-white bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  
    </Section>
  );
}