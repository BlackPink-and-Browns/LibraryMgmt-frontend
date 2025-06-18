import { Bell, X, BookCheck, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from '../api-service/notifications/notification.api';

const NotificationButton: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: notifications = [], isLoading } = useGetNotificationsQuery({ read: '' });
  const [markAsRead] = useMarkNotificationReadMutation();

  const [hidden, setHidden] = useState<number[]>([]); // Track dismissed notifications

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const unreadCount = notifications.filter((n) => !n.read && !hidden.includes(n.id)).length;

  const handleDismiss = async (id: number) => {
    try {
      await markAsRead(id); // PATCH /notifications/:id
      setHidden((prev) => [...prev, id]); // Remove from UI
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'BOOK_AVAILABLE':
        return <BookCheck size={16} className="text-green-600 mr-2" />;
      case 'BOOK_OVERDUE':
        return <AlertCircle size={16} className="text-red-600 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'fixed', top: '24px', right: '32px', zIndex: 999 }}>
      <button
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316 60%, #ef4444 100%)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={toggleDropdown}
        aria-label="Open Notifications"
      >
        <Bell style={{ width: '24px', height: '24px', color: '#fff' }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              backgroundColor: '#dc2626',
              color: '#fff',
              borderRadius: '9999px',
              width: '18px',
              height: '18px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            width: '300px',
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            padding: '8px',
          }}
        >
          <strong style={{ fontSize: '14px', display: 'block', marginBottom: '6px' }}>
            Notifications
          </strong>

          {isLoading ? (
            <p>Loading...</p>
          ) : notifications.filter((n) => !hidden.includes(n.id)).length === 0 ? (
            <p style={{ fontSize: '13px', color: '#6b7280' }}>No notifications</p>
          ) : (
            notifications
              .filter((n) => !hidden.includes(n.id))
              .map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#dbeafe', // light blue background
                    padding: '8px',
                    borderRadius: '6px',
                    marginBottom: '6px',
                  }}
                >
                  {getIcon(n.type)}
                  <span style={{ flex: 1 }}>{n.message}</span>
                  <button
                    onClick={() => handleDismiss(n.id)}
                    style={{
                      color: '#9ca3af',
                      marginLeft: '8px',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
