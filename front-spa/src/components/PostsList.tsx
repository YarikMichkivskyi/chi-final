import { Box } from "@mui/material";
import Post from "./Post";
import Pagination from "./Paginator";
import React from "react";
import { MyExhibit, AllExhibit, RootState } from "../common/types/types";
import {useSelector} from "react-redux";

interface PostsListProps {
    exhibits: MyExhibit[] | AllExhibit[];
    page: string;
    totalPages: number;
    setPage: (page: number) => void;
    loading: boolean;
    refreshList:()=>void;
}

export const PostsList: React.FC<PostsListProps> = ({ exhibits, page, totalPages, setPage, loading, refreshList }) => {
    const id = useSelector((state:RootState) => state.userData.id);

    return (
        <>
            <Box display="flex" justifyContent="center" mt={2} mb={4}>
                <Pagination count={totalPages} page={Number(page)} onChange={(e, value) => setPage(value)} />
            </Box>
            <Box>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    exhibits.map((post) => (
                        <Post exhibit={post} key={post.id} isOwner={id===post.owner.id} refreshListFunction={refreshList} />
                    ))
                )}
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination count={totalPages} page={Number(page)} onChange={(e, value) => setPage(value)} />
            </Box>
        </>
    );
};