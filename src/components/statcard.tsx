// import React from "react";
// import type { StatCardProps } from "../types/propTypes";
// import { useLocation, useNavigate } from "react-router-dom";
// import clsx from "clsx";



// const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, onClick,variant = "default",status}) => {
    
//     const isDanger = variant === "danger";
//   return (
//     <div
//       onClick={status ? undefined : onClick}
//       className={clsx(
//         "rounded-xl min-w-60 h-30 p-6 shadow-lg transition-all duration-300",
//         status ? "cursor-default ring-2 ring-purple-500" : "cursor-pointer hover:scale-[1.02]",
//         isDanger
//           ? "bg-red-50 text-red-800 hover:shadow-red-200"
//           : "bg-white/80 backdrop-blur-sm text-gray-900 hover:shadow-xl"
//       )}>
//             <div className="flex items-center justify-between">
//         <div>
//           <p className={`text-sm font-medium ${isDanger ? "text-red-600" : "text-gray-600"}`}>
//             {title}
//           </p>
//           <p className={`text-3xl font-bold ${isDanger ? "text-red-800" : "text-gray-900"}`}>
//             {value}
//           </p>
//           {isDanger}
//           {change && (
//             <p
//               className={`text-sm px-2 py-1 rounded-full w-fit mt-1 ${
//                 isDanger ? "bg-red-100 text-red-700" : "bg-green-50 text-green-600"
//               }`}
//             >
//               {change}
//             </p>
//           )}
//         </div>
//         <div
//           className={`p-3 rounded-lg ${
//             isDanger ? "bg-red-100" : "bg-gradient-to-br from-blue-100 to-purple-100"
//           }`}
//         >
//           <Icon className={`h-8 w-8 ${isDanger ? "text-red-600" : "text-blue-600"}`} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatCard;
import React from "react";
import type { StatCardProps } from "../types/propTypes";
import clsx from "clsx";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  onClick,
  variant = "default",
  status = false,
}) => {
  const isDanger = variant === "danger";
  const isActive = status;

  return (
    <div
      onClick={isActive ? undefined : onClick}
      className={clsx(
        "rounded-xl min-w-60 h-30 p-6 shadow-lg transition-all duration-300",
        isDanger
          ? "bg-red-50 text-red-800 hover:shadow-red-200"
          : "bg-white/80 backdrop-blur-sm text-gray-900",
        {
          "cursor-pointer hover:scale-[1.02] hover:shadow-xl": !isActive,
          "cursor-default border-2 border-purple-600 bg-purple-50 ring-purple-500 shadow-md": isActive,
        }
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={clsx(
              "text-sm font-medium",
              isDanger ? "text-red-600" : "text-gray-600",
              isActive && "text-purple-700 font-semibold"
            )}
          >
            {isActive ? "▸ " : ""}
            {title}
          </p>
          <p
            className={clsx(
              "text-3xl font-bold",
              isDanger ? "text-red-800" : "text-gray-900",
              isActive && "text-purple-800"
            )}
          >
            {value}
          </p>
          {change && (
            <p
              className={clsx(
                "text-sm px-2 py-1 rounded-full w-fit mt-1",
                isDanger
                  ? "bg-red-100 text-red-700"
                  : "bg-green-50 text-green-600"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={clsx(
            "p-3 rounded-lg",
            isDanger
              ? "bg-red-100"
              : isActive
              ? "bg-purple-100"
              : "bg-gradient-to-br from-blue-100 to-purple-100"
          )}
        >
          <Icon
            className={clsx(
              "h-8 w-8",
              isDanger ? "text-red-600" : isActive ? "text-purple-700" : "text-blue-600"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
