import { twMerge } from 'tailwind-merge'

export default function Section({ children, className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge("min-h-screen bg-slate-900 flex items-center justify-center py-16", className)} {...props}>
      <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center z-10">
        {children}
      </div>
    </div>
  );
}