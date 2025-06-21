import React from "react";
import clsx from "clsx";
import { User } from "lucide-react";

function UserProfileCard(props: {
  name: string;
  id: number;
  email: string;
  role:string;
  status: "ACTIVE" | "INACTIVE";
  profilePicUrl: string;
}) {
    console.log("props",props)
  const { name, id, email,role, status, profilePicUrl } = props;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-5 ">
      {/* Profile Picture */}
        {profilePicUrl ? ( <img
        src={profilePicUrl}
        alt={name}
        className="w-25 h-25 rounded-full object-cover border"
      />):(<User className="w-25 h-25 rounded-full object-cover border bg-pink"></User>)}
     

      {/* User Info */}
      <div className="flex-1 space-y-1 items-center justify-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">User ID: {id}</p>
        <p className="text-sm text-gray-600">Role: {role}</p>
        <p className="text-sm text-gray-600">Email: {email}</p>
        <p></p>
        <span 
          className={clsx(
            "inline-block px-3 py-1 text-xs font-medium rounded-full ",
            status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default UserProfileCard;
