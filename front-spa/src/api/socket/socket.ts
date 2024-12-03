import { io, Socket } from 'socket.io-client';

const url = process.env.SOCKET_SERVER_URL;

let socket: Socket | null = null;

export const connectToSocket = () => {
    if (!socket) {
        socket = io(url);
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};