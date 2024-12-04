import {axiosInstance} from '../axiosInstance';

const getAllExhibits = async (page:number, limit:number) => {
    return await axiosInstance.get('/exhibits?page='+page+'&limit='+limit);
};

const getMyExhibits = async (page:number, limit:number) => {
    return await axiosInstance.get('/exhibits/my-posts?page='+page+'&limit='+limit);
};

const getExhibitById = async (id: string) => {
    return await axiosInstance.get(`/exhibits/post/${id}`);
};

const createExhibit = async (exhibitData: { description: string; image: File }) => {
    const formData = new FormData();
    formData.append('description', exhibitData.description);
    formData.append('image', exhibitData.image);

    return await axiosInstance.post('/exhibits', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const deleteExhibit = async (id: string) => {
    return await axiosInstance.delete(`/exhibits/${id}`);
};

export {getAllExhibits, getMyExhibits, getExhibitById, createExhibit, deleteExhibit}