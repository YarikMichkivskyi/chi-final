import { useEffect } from "react";
import {connectToSocket, disconnectSocket} from "../../api/socket/socket";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import { RootState } from "../../common/types/types";

const useSocket = (onNewPost: () => void) => {
    const id = useSelector((state: RootState) => state.userData.id)||0;

    useEffect(() => {
        const socket = connectToSocket(id);

        const handleNewPost = () => {
            toast('New Post');
            onNewPost();
        };

        socket.on('newPost', handleNewPost);

        return () => {
            socket.off('newPost', handleNewPost);
            disconnectSocket();
        };
    }, [onNewPost]);
};

export {useSocket};