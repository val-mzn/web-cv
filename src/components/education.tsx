import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import Section from "./section";
import SectionTitle from "./section-title";

export default function Education() {
  const formations = [
    {
      diploma: "Titre RNCP Niveau 6 (Bac+3)",
      school: "EPSI - Ecole privée de sciences informatiques",
      location: "Grenoble, France",
      period: "2020 - 2023",
      description:
        "Spécialisation en développement logiciel et architecture des systèmes d'information",
      mentions: [],
      color: "cyan",
    },
    {
      diploma: "Baccalauréat Scientifique",
      school: "Maurice Tieche",
      location: "Grenoble, France",
      period: "2017 - 2020",
      description:
        "Formation généraliste couvrant algorithmique, programmation et systèmes",
      mentions: [],
      color: "teal",
    },
  ];

  const certifications = [
    {
      title: "ES6 & React",
      issuer: "m2iformation.fr",
      date: "2024",
      credential: "ES6 & React",
      verified: true,
      color: "cyan",
    },
    {
      title: "Formation .NET Core Fullstack",
      issuer: "ATP Formation",
      date: "2024",
      credential: "Formation .NET Core ",
      verified: true,
      color: "teal",
    },
    {
      title: "Formation Kubernetes",
      issuer: "Kubernetes",
      date: "2025",
      credential: "Formation Kubernetes",
      verified: false,
      color: "indigo",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "cyan":
        return {
          icon: "text-cyan-400",
          hover: "hover:text-cyan-300",
          accent: "text-cyan-400"
        };
      case "teal":
        return {
          icon: "text-teal-400",
          hover: "hover:text-teal-300",
          accent: "text-teal-400"
        };
      case "indigo":
        return {
          icon: "text-indigo-400",
          hover: "hover:text-indigo-300",
          accent: "text-indigo-400"
        };
      default:
        return {
          icon: "text-cyan-400",
          hover: "hover:text-cyan-300",
          accent: "text-cyan-400"
        };
    }
  };

  return (
    <Section id="education" >
      <SectionTitle title="Diplômes" icon={GraduationCap} />

      <div className="space-y-16">
        {/* Section Formations */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {formations.map((formation, index) => {
              const colors = getColorClasses(formation.color);
              return (
                <div key={index} className="group relative">
                  <div className="rounded-2xl p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 h-full flex flex-col">
                    <div className="flex-1">
                      <div className="absolute top-4 right-4 flex items-start justify-between mb-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-gray-300 text-sm mb-1 bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            <span>{formation.period}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 text-sm bg-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm border border-white/20">
                            <MapPin className="h-4 w-4 text-teal-400" />
                            <span>{formation.location}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className={`text-xl font-bold text-white mb-2 group-${colors.hover} transition-colors duration-300`}>
                        {formation.diploma}
                      </h4>

                      <p className={`${colors.accent} font-semibold mb-4`}>
                        {formation.school}
                      </p>

                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {formation.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Certifications */}
        <div>
          <SectionTitle title="Formations" icon={Award} />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {certifications.map((cert, index) => {
              const colors = getColorClasses(cert.color);
              return (
                <div key={index} className="group relative">
                  <div className="rounded-xl p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/15 transition-all duration-500 flex items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-lg font-bold text-white group-${colors.hover} transition-colors duration-300`}>
                          {cert.title}
                        </h4>
                        {cert.verified ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 ml-2" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                            <span className="text-gray-400 text-sm">A venir</span>
                          </div>
                        )}
                      </div>

                      <p className={`${colors.accent} font-medium mb-1`}>
                        {cert.issuer}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
