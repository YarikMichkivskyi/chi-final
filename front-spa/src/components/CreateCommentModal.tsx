import React, {useState} from 'react';
import {Box, TextField, Button, Typography, Modal} from '@mui/material';
import {addComment} from '../api/actions/comment.api';

type CreateCommentModalProps = {
    exhibitId: number;
    closeModal: () => void;
};

const CreateCommentModal: React.FC<CreateCommentModalProps> = ({exhibitId, closeModal}) => {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = async () => {
        if (commentText.trim()) {
            await addComment(exhibitId.toString(), {text: commentText});
            setCommentText('');
            closeModal()
        }
    };

    return (
        <Modal
            open={true}
            onClose={() => closeModal()}
            aria-labelledby="add-comment-modal"
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
        >
            <Box sx={{backgroundColor: 'white', p: 4, borderRadius: 2, width: 400}}>
                <Typography variant="h6" gutterBottom>Add a Comment</Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your comment here..."
                    sx={{mb: 2}}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                <Button variant="text" onClick={closeModal} sx={{ml: 2}}>Cancel</Button>
            </Box>
        </Modal>
    );
};

export default CreateCommentModal;