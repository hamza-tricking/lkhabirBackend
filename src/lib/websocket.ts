export interface Notification {
  id: string;
  type: 'new_order' | 'order_update' | 'user_created';
  title: string;
  message: string;
  data?: any;
  timestamp: Date;
  read: boolean;
}

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: ((notification: Notification) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3; // Reduced attempts
  private reconnectDelay = 2000;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isWebSocketAvailable = true;

  constructor() {
    // Always try to connect WebSocket for real-time notifications
    if (typeof window !== 'undefined') {
      console.log('WebSocket enabled - attempting connection');
      this.connect();
    }
  }

  private connect() {
    // Use WebSocket with correct port - backend runs on port 5000
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://dmtart.pro:5000';
    
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        
        // Send authentication token if available
        const token = localStorage.getItem('token');
        if (token && this.ws) {
          this.ws.send(JSON.stringify({
            type: 'auth',
            token
          }));
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'notification') {
            const notification: Notification = {
              ...data.notification,
              timestamp: new Date(data.notification.timestamp)
            };
            
            this.notifyListeners(notification);
            
            // Show browser notification if permission granted
            if (Notification.permission === 'granted') {
              new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.ico'
              });
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }
      
      this.reconnectTimer = setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached - switching to polling');
      this.isWebSocketAvailable = false;
      this.startPolling();
    }
  }

  private startPolling() {
    // Poll for notifications every 30 seconds as fallback
    setInterval(async () => {
      if (!this.isWebSocketAvailable) {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://dmtart.pro/lkhabir/api'}/orders/recent`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const orders = await response.json();
              // Check for new orders and create notifications
              orders.forEach((order: any) => {
                const notification: Notification = {
                  id: order._id,
                  type: 'new_order',
                  title: 'طلب جديد',
                  message: `طلب ${order.type === 'usb' ? 'USB' : 'دورة'} جديد من ${order.fullName}`,
                  data: order,
                  timestamp: new Date(order.createdAt),
                  read: false
                };
                this.notifyListeners(notification);
              });
            }
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }
    }, 30000);
  }

  private notifyListeners(notification: Notification) {
    this.listeners.forEach(listener => {
      try {
        listener(notification);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  public subscribe(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}

// Singleton instance
export const websocketService = new WebSocketService();
