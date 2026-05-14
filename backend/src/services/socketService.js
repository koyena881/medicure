// This service manages real-time WebSocket connections via Socket.io
// for real-time wearables data integration, emergency alerts, and chat.

class SocketService {
  constructor(io) {
    this.io = io;
    this.setupListeners();
  }

  setupListeners() {
    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      // When a user authenticates, they join a specific room for their ID
      socket.on('join', (userId) => {
        socket.join(userId.toString());
        console.log(`User ${userId} joined their personal room`);
      });

      // Wearable device sending live vitals
      socket.on('vitals_stream', (data) => {
        // data = { patientId, heartRate, spO2, ... }
        
        // AI Microservice check (Mocked here)
        if (data.heartRate > 120 || data.spO2 < 92) {
            this.io.to(data.patientId).emit('emergency_alert', {
                type: 'CRITICAL_VITALS',
                message: 'Abnormal vitals detected! Emergency contacts notified.'
            });
            // Emit to doctors and family as well if we had their rooms
        }

        // Broadcast vitals back to the patient's dashboard
        this.io.to(data.patientId).emit('vitals_update', data);
      });

      // Telemedicine Video Signaling
      socket.on('call_user', (data) => {
        this.io.to(data.userToCall).emit('incoming_call', { signal: data.signalData, from: data.from });
      });

      socket.on('answer_call', (data) => {
        this.io.to(data.to).emit('call_accepted', data.signal);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }
}

module.exports = SocketService;
