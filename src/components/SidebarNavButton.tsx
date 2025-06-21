import { useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import clsx from "clsx";

type Props = {
  label: string;
  to: string;
  Icon?: React.ElementType;
};

const SidebarNavButton = ({ label, to, Icon = Home }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname===to

  return (
    <div className="w-full flex justify-end h-12">
      <button
        onClick={() => !isActive && navigate(to)}
        className={clsx(
          "w-full flex justify-between items-center gap-3 px-4 py-2 rounded-tl-lg rounded-bl-lg transition-all duration-200",
          isActive
            ? "bg-blue-400 text-white shadow-md"
            : "bg-theme-nav text-gray-700 hover:bg-theme-nav/90 hover:scale-[1.02]"
        )}
      >
        <Icon
          className={clsx(
            "w-5 h-5",
            isActive ? "text-white" : "text-blue-600"
          )}
        />
        <span className="text-sm font-medium">{label}</span>
      </button>
    </div>
  );
};

export default SidebarNavButton;
