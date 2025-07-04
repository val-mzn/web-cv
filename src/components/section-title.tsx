import type { LucideIcon } from "lucide-react";

export default function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mb-8">
      <div className="flex items-center justify-center gap-4 text-white">
        <Icon className="h-12 w-12 p-3 text-white bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl shadow-lg" />
        <span className="text-4xl font-bold leading-tight">{title}</span>
      </div>

      <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-teal-600 mx-auto rounded-full" />
    </div>
  );
}
