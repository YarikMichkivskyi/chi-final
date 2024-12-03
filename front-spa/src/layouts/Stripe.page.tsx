import React from 'react';
import {getAllExhibits} from "../api/actions/exhibit.api";
import {Typography} from '@mui/material';
import {PostsList} from "../components/PostsList";
import PageFrame from "../components/PageFrame";
import {AllExhibitResponse} from "../common/types/exhibit/allExhibitResponse.type";
import {useRequest} from "ahooks";
import {useSocket} from "../hooks/hooks";
import {AxiosResponse} from "axios";
import { useSearchParams } from 'react-router-dom';
import {AllExhibit} from "../common/types/exhibit/allExhibit.type";

const StripePage = () => {

    const [data, setData] = React.useState<{data:AllExhibit[], lastPage:number}>({
        data: [],
        lastPage: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"))||1;

    const {loading, run, } = useRequest(
        () => getAllExhibits(page, 10),
        {
            onSuccess: (data: AxiosResponse<AllExhibitResponse>) => {
                setData(data.data)
            },
            refreshDeps:[page]
        }
    );

    const setPage = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    useSocket(run);

    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>All Posts</Typography>
            <PostsList
                page={searchParams.get('page') || '1'}
                loading={loading}
                refreshList={run}
                totalPages={data.lastPage}
                exhibits={data.data}
                setPage={setPage}
            />
        </PageFrame>
    );
};

export default StripePage;