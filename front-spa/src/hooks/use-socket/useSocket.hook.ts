import { useEffect } from "react";
import { connectToSocket } from "../../api/socket/socket";
import {toast} from "react-toastify";

const useSocket = (onNewPost: () => void) => {
    useEffect(() => {
        const socket = connectToSocket();

        const handleNewPost = () => {
            toast('New Post');
            onNewPost();
        };

        socket.on('newPost', handleNewPost);

        return () => {
            socket.off('newPost', handleNewPost);
        };
    }, [onNewPost]);
};

export {useSocket};