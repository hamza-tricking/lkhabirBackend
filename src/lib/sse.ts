export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  timestamp: Date;
  read: boolean;
}

class SSEService {
  private eventSource: EventSource | null = null;
  private listeners: ((notification: Notification) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 2000;
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    // Check if we're in browser environment
    if (typeof window === 'undefined' || typeof EventSource === 'undefined') {
      console.log('SSE not available in server-side rendering');
      return;
    }

    const sseUrl = process.env.NEXT_PUBLIC_SSE_URL || 'https://dmtart.pro/lkhabir/api/sse/notifications';
    
    try {
      this.eventSource = new EventSource(sseUrl);
      
      this.eventSource.onopen = () => {
        console.log('SSE connected');
        this.reconnectAttempts = 0;
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('SSE message received:', data); // Debug log
          
          // Handle different message types
          if (data.type === 'connected') {
            console.log('SSE connection confirmed');
          } else if (data.type === 'new_order' || (data.title && data.message)) {
            const notification: Notification = {
              id: data.data?._id || data.id || Date.now().toString(),
              type: data.type || 'new_order',
              title: data.title || 'طلب جديد',
              message: data.message || 'تم استلام طلب جديد',
              data: data.data,
              timestamp: new Date(data.timestamp || Date.now()),
              read: false
            };
            
            console.log('Creating notification:', notification); // Debug log
            this.notifyListeners(notification);
            
            // Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(notification.title, {
                body: notification.message,
                icon: '/favicon.ico'
              });
            }
          } else {
            // Log any other message types for debugging
            console.log('Unknown SSE message type:', data);
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error, 'Raw data:', event.data);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        this.eventSource?.close();
        this.attemptReconnect();
      };

    } catch (error) {
      console.error('Error creating SSE connection:', error);
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
        console.log(`Attempting to reconnect SSE (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.error('Max SSE reconnection attempts reached');
    }
  }

  private notifyListeners(notification: Notification) {
    this.listeners.forEach(listener => {
      try {
        listener(notification);
      } catch (error) {
        console.error('Error in SSE notification listener:', error);
      }
    });
  }

  public subscribe(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    
    // Request notification permission immediately when user subscribes
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          console.log('Notification permission:', permission);
        });
      } else if (Notification.permission === 'granted') {
        console.log('Notification already granted');
      } else {
        console.log('Notification permission denied');
      }
    }
  }

  public unsubscribe(listener: (notification: Notification) => void) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  public disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export const sseService = new SSEService();
