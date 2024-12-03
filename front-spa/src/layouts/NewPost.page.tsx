import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createExhibit } from '../api/actions/exhibit.api';
import { useNavigate } from "react-router-dom";
import PageFrame from "../components/PageFrame";

const NewPost = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            description: '',
            image: null as File | null,
        },
        validationSchema: Yup.object({
            description: Yup.string().required('Please provide a description.'),
            image: Yup.mixed().required('Please upload an image.'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await createExhibit({ description: values.description, image: values.image as File });
                navigate('/home');
            } catch (err) {
                setErrors({ description: 'Failed to create post. Please try again.' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>Create New Post</Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mb: 3 }}
                />
                <Button variant="contained" component="label" sx={{ mb: 3 }}>
                    Upload Image
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                formik.setFieldValue("image", e.target.files[0]);
                            }
                        }}
                    />
                </Button>
                <Box sx={{ mb: 2 }}>
                    {formik.values.image && (
                        <Typography variant="body2">Selected file: {(formik.values.image as File).name}</Typography>
                    )}
                    {formik.touched.image && formik.errors.image && (
                        <Typography color="error" variant="body2">{formik.errors.image}</Typography>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: 200 }}
                    color="primary"
                    fullWidth
                    disabled={formik.isSubmitting}
                >
                    Submit Post
                </Button>
            </form>
        </PageFrame>
    );
};

export default NewPost;