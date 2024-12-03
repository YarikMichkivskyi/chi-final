import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

type PaginationProps = {
    count: number;
    page: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

const Pagination = ({ count, page, onChange }: PaginationProps) => {
    return <MuiPagination count={count} page={page} onChange={onChange} />;
};

export default Pagination;