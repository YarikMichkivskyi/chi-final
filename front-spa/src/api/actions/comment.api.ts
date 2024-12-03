import {axiosInstance} from "../axiosInstance";

const getComments = async (exhibitId: string) => {
    return await axiosInstance.get(`/exhibits/${exhibitId}/comments`);
};

const addComment = async (exhibitId: string, commentData: { text: string }) => {
    return await axiosInstance.post(`/exhibits/${exhibitId}/comments`, commentData)
};

const deleteComment = async (exhibitId: string, commentId: string) => {
    return await axiosInstance.delete(`/exhibits/${exhibitId}/comments/${commentId}`);
};

export {getComments, addComment, deleteComment};