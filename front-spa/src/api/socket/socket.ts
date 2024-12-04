import { io, Socket } from 'socket.io-client';

const url = process.env.SOCKET_SERVER_URL;

let socket: Socket | null = null;

export const connectToSocket = (userId: number): Socket => {
    if (!socket) {
        socket = io(url!, {
            query: { userId: String(userId) },
        });
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};