import { Bell, X, BookCheck, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from '../api-service/notifications/notification.api';

interface Notification {
  id: number;
  message: string;
  type: string;
  createdAt: string;
}

const NotificationButton: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [realtimeNotifications, setRealtimeNotifications] = useState<Notification[]>([]);
  const { data: notifications = [], isLoading, refetch } = useGetNotificationsQuery({ read: 'false' });
  const [markAsRead] = useMarkNotificationReadMutation();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleDismiss = async (id: number) => {
    try {
      await markAsRead(id);
      setRealtimeNotifications(prev => prev.filter(n => n.id !== id));
      refetch();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'BOOK_AVAILABLE':
        return <BookCheck size={16} className="text-green-600 mr-2" />;
      case 'BOOK_OVERDUE':
        return <AlertCircle size={16} className="text-red-600 mr-2" />;
      case 'BOOK_REQUEST':
        return <BookCheck size={16} className="text-blue-600 mr-2" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No auth token found');
      return;
    }
    const newSocket = io('https://librarymanagement-backend-f008.onrender.com', {
      auth: {
        token: token
      }
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to Socket server');
    });
    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    newSocket.on('room-joined', (data) => {
      console.log(`Joined room: ${data.room} for user: ${data.userId}`);
    });

    newSocket.on('new-notification', (notification: Notification) => {
      console.log('New notification received:', notification);
      
      setRealtimeNotifications(prev => {
        const exists = prev.some(n => n.id === notification.id);
        if (!exists) {
          return [notification, ...prev];
        }
        return prev;
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const allNotifications = [...notifications, ...realtimeNotifications]
    .filter((notification, index, self) => 
      index === self.findIndex(n => n.id === notification.id)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = allNotifications.length;

  return (
    <div style={{ position: 'fixed', top: '30px', right: '32px', zIndex: 999 }}>
      <button
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, blue 10%, #ef4444 100%)',
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
          ) : unreadCount === 0 ? (
            <p style={{ fontSize: '13px', color: '#6b7280' }}>No new notifications</p>
          ) : (
            allNotifications.map((n) => (
              <div
                key={n.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#dbeafe',
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
