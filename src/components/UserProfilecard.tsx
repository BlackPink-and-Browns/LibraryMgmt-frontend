import React from "react";
import clsx from "clsx";
import { User } from "lucide-react";

function UserProfileCard(props: {
  username: string;
  id: number;
  email: string;
  status: "Active" | "Inactive";
  profilePicUrl: string;
}) {
    console.log("props",props)
  const { username, id, email, status, profilePicUrl } = props;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 ">
      {/* Profile Picture */}
        {profilePicUrl ? ( <img
        src={profilePicUrl}
        alt={username}
        className="w-16 h-16 rounded-full object-cover border"
      />):(<User></User>)}
     

      {/* User Info */}
      <div className="flex-1 space-y-1">
        <h2 className="text-lg font-semibold">{username}</h2>
        <p className="text-sm text-gray-600">User ID: {id}</p>
        <p className="text-sm text-gray-600">Email: {email}</p>
        <span 
          className={clsx(
            "inline-block px-3 py-1 text-xs font-medium rounded-full float-right",
            status === "Active"
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
