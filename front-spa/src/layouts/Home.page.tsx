import React from 'react';
import {getMyExhibits} from "../api/actions/exhibit.api";
import {Typography} from '@mui/material';
import {PostsList} from "../components/PostsList";
import PageFrame from "../components/PageFrame";
import {useRequest} from "ahooks";
import {AxiosResponse} from "axios";
import {useSearchParams} from "react-router-dom";
import {MyExhibit} from "../common/types/exhibit/myExhibit.type";
import { MyExhibitResponse } from '../common/types/types';

const HomePage = () => {

    const [data, setData] = React.useState<{data:MyExhibit[], lastPage:number}>({
        data: [],
        lastPage: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page"))||1;

    const {loading, run, } = useRequest(
        () => getMyExhibits(page, 10),
        {
            onSuccess: (data: AxiosResponse<MyExhibitResponse>) => {
                setData(data.data)
            },
            refreshDeps:[page]
        }
    );

    const setPage = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>My Posts</Typography>
            <PostsList
                page={page.toString()}
                loading={loading}
                refreshList={run}
                totalPages={data.lastPage}
                exhibits={data.data}
                setPage={setPage}
            />
        </PageFrame>
    );
};

export default HomePage;