
import type { HeaderProps } from "../types/propTypes";

// bg-clip-text --> makes text take on background gradient
export default function Header({ heading, description, children }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow backdrop-blur-sm py-6 pl-75  flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <h1 className="text-3xl font-bold bg-theme-dark bg-clip-text text-transparent">
          {heading}
        </h1>
        <p>{description}</p>
      </div>

      <div>
        {children}
      </div>
    </header>
  );
}
