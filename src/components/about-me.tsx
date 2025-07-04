import { Lightbulb, Palette, Target, User } from "lucide-react";
import SectionTitle from "./section-title";
import Section from "./section";

export default function AboutMe() {
  return (
    <Section id="about">
      <SectionTitle title="À propos de moi" icon={User} />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 text-card-foreground flex flex-col gap-6 rounded-xl p-8 h-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group">
          <p className="text-2xl font-bold text-white"> Mon profil</p>
          <div className="flex flex-col gap-4 text-white text-lg">
            <p className="text-lg text-gray-300 leading-relaxed">
              Jeune développeur passionné par la création d'applications web
              modernes. Ce qui me motive ? Transformer des idées complexes en
              interfaces simples et intuitives que les gens adorent utiliser.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              J'ai toujours eu cette curiosité de comprendre et développer les
              choses, ce qui m'a naturellement mené vers ce métier. Au fil des
              projets, j'ai développé mes compétences fullstack.
            </p>
          </div>

          <div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">23</div>
                <div className="text-sm text-gray-400">ans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-400">3+</div>
                <div className="text-sm text-gray-400">années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">100%</div>
                <div className="text-sm text-gray-400">UI/UX</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 col-span-1">
          <div className="text-card-foreground flex flex-col items-start justify-center gap-6 rounded-xl p-8 h-full bg-gradient-to-br from-cyan-600 to-cyan-700 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/20 rounded-xl backdrop-blur-sm p-2">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-semibold text-white">Innovation</p>
            </div>

            <p className="text-cyan-100 text-sm leading-relaxed">
              Passionné par les nouvelles technologies et l'architecture moderne
              des applications web.
            </p>
          </div>

          <div className="text-card-foreground flex flex-col items-start justify-center gap-6 rounded-xl p-8 h-full bg-gradient-to-br from-teal-600 to-teal-700 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/20 rounded-xl backdrop-blur-sm p-2">
                <Target className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-semibold text-white">Expertise</p>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed">
              3+ années d'expérience en développement fullstack avec une
              expertise React & .NET.
            </p>
          </div>

          <div className="text-card-foreground flex flex-col items-start justify-center gap-6 rounded-xl p-8 h-full bg-gradient-to-br from-indigo-600 to-indigo-700 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all duration-500 group">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/20 rounded-xl backdrop-blur-sm p-2">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-semibold text-white">Design UX/UI</p>
            </div>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Sensibilité marquée pour l'expérience utilisateur et l'ergonomie
              des interfaces.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
