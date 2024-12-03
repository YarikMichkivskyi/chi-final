import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {getComments} from '../api/actions/comment.api';
import Comment from './Comment';
import {CommentT, RootState} from '../common/types/types';
import CreateCommentModal from "./CreateCommentModal";
import {useSelector} from "react-redux";

const CommentList: React.FC<{ exhibitId: number }> = ({exhibitId}) => {
    const [comments, setComments] = useState<CommentT[]>([]);
    const id = useSelector((state:RootState) => state.userData.id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        fetchComments();
    }
    const openModal = () => {
        setIsModalOpen(true);
    }

    const fetchComments = async () => {
        const response = await getComments(exhibitId.toString());
        setComments(response.data);
    };

    useEffect(() => {
        fetchComments();
    }, [exhibitId]);

    return (
        <>
            <Box>
                {comments.map((comment) => (
                    <Comment key={comment.owner.id} comment={comment} refreshListFunction={fetchComments} exhibitId={id??-1}
                             isOwner={comment.owner.id === id}/>
                ))}
            </Box>
            <Button variant="contained" color="primary" onClick={openModal}>
                Add Comment
            </Button>
            {
                isModalOpen &&
                <CreateCommentModal exhibitId={exhibitId} closeModal={closeModal}/>
            }
        </>

    );
};

export default CommentList;