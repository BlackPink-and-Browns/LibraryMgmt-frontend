import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react"; // or any icon you prefer

const SidebarNavButton = ({ label, to, Icon = Home }: { label: string; to: string; Icon?: React.ElementType }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-end">
    <button
      onClick={() => navigate(to)}
      className="w-full flex justify-between bg-gradient-to-br from-blue-100 via-white to-blue-50 items-center gap-3 px-4 py-2 text-gray-700  rounded-tl-lg rounded-bl-lg hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-colors"
    >
      <Icon className="w-5 h-5 text-blue-600" />
      <span className="text-sm font-medium">{label}</span>
    </button>
    </div>
    
)
};

export default SidebarNavButton;
