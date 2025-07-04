import { Calendar, Code, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <div className="relative bg-slate-900 py-6 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400">
          {/* Copyright */}
          <div className="flex items-center gap-3">
            <Copyright className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              2025 Valentino Manzon. Tous droits réservés.
            </span>
          </div>

          {/* Version CV */}
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm">Version Juillet 2025</span>
          </div>

          {/* Développement */}
          <div className="flex items-center gap-3">
            <Code className="w-4 h-4 text-gray-500" />
            <span className="text-sm">
              Développé avec ❤️ et React + TypeScript
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
