import React, {useState} from 'react';
import {Box, Typography, Card, CardContent, CardMedia, Button} from '@mui/material';
import {MyExhibit} from "../common/types/exhibit/myExhibit.type";
import {deleteExhibit} from "../api/actions/exhibit.api";
import CommentList from "./CommentList";
import {toast} from "react-toastify";
import {useRequest} from "ahooks";

type PostProps = {
    exhibit: MyExhibit;
    isOwner: boolean;
    refreshListFunction: () => void;
};

const Post: React.FC<PostProps> = ({exhibit, isOwner, refreshListFunction}) => {
    const [showComments, setShowComments] = useState(false);


    const { run: handleDelete } = useRequest(() => deleteExhibit(exhibit.id.toString()), {
        manual: true,
        onSuccess: () => {
            toast.success('Exhibit deleted successfully.');
            refreshListFunction();
        },
        onError: (error: any) => {
            toast.error(`Error deleting exhibit: ${error.message}`);
        },
    });

    return (
        <Card variant="outlined" sx={{mb: 2, pb: 2, pt:4, px:6, width: 1000, maxWidth: 800}}>
            <Typography variant="body1"  sx={{mb:3}}>
                {exhibit.owner.username} - {new Date(exhibit.createdAt).toLocaleString()}
            </Typography>
            <CardMedia
                component="img"
                height="500"
                image={process.env.STATIC_PROVIDER_URL + exhibit.imageUrl}
                alt={exhibit.description}
                sx={{objectFit: "contain"}}
            />
            <CardContent>
                <Typography variant="body1" gutterBottom>{exhibit.description}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="primary" onClick={() => setShowComments(!showComments)}>
                        Comments
                    </Button>
                    {isOwner && <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>}
                </Box>
            </CardContent>
            {showComments && (
                <Box mt={2}>
                    <CommentList exhibitId={exhibit.id}/>
                </Box>
            )}
        </Card>
    );
};

export default Post;