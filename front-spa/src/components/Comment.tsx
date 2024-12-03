import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentT } from '../common/types/types';
import { deleteComment } from '../api/actions/comment.api';
import {toast} from "react-toastify";
import {useRequest} from "ahooks";

type CommentProps = {
    exhibitId: number;
    comment: CommentT;
    refreshListFunction: () => void;
    isOwner: boolean;
};

const Comment: React.FC<CommentProps> = ({exhibitId, comment, refreshListFunction, isOwner }) => {
    const { run: handleDelete } = useRequest(() => deleteComment(exhibitId.toString(), comment.id), {
        manual: true,
        onSuccess: () => {
            toast.success('Comment deleted successfully.');
            refreshListFunction();
        },
        onError: (error: any) => {
            toast.error(`Error deleting comment: ${error.message}`);
        },
    });

    return (
        <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, position: 'relative' }}>
            <Typography variant="body2" color="text.secondary">
                {comment.owner.username} - {new Date(comment.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
            {isOwner && (
                <IconButton
                    aria-label="delete"
                    onClick={handleDelete}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <DeleteIcon color="error" />
                </IconButton>
            )}
        </Box>
    );
};

export default Comment;
