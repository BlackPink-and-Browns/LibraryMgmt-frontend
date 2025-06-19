const RecentActivity = ({
  recentActivity = [],
}: {
  recentActivity?: Activity[];
}) => {
  if (!recentActivity.length) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500 text-sm">No recent activity found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md p-2">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {recentActivity.map((activity) => (
          <li
            key={activity.id}
            className="border rounded-xl p-3 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center gap-2 ">
              <div>
                <p className="text-sm text-gray-700 gap-2">
                  <span
                    className={`font-semibold text-xs px-2 py-1 rounded gap-2
    ${
      activity.action === "CREATE"
        ? "bg-green-100 text-green-700"
        : activity.action === "UPDATE"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
                  >
                    {activity.action}
                  </span>
                  {activity.entityType} (ID: {activity.entityId})
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
              {activity.user?.username && (
                <span className="text-xs text-gray-600">
                  by <strong>{activity.user.username}</strong>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecentActivity