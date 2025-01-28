import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useCreateStaticContentMutation, useUpdateStaticContentMutation } from '../../../services/staticContentApi';
import { TextField, Button, Box, Typography, CircularProgress, Container, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const StaticContent: React.FC<{ id?: string }> = ({ id }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const [createStaticContent, { isLoading: isCreating }] = useCreateStaticContentMutation();
  const [updateStaticContent, { isLoading: isUpdating }] = useUpdateStaticContentMutation();

  // Form submission handler
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('content', data.content);

    // Handle file uploads for image and video
    if (data.image?.[0]) formData.append('image', data.image[0]);
    if (data.video?.[0]) formData.append('video', data.video[0]);

    try {
      if (id) {
        await updateStaticContent({ id, data: formData });
        toast.success('Content updated successfully!');
      } else {
        await createStaticContent(formData);
        toast.success('Content created successfully!');
      }
    } catch (error) {
      toast.error('Error uploading content');
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ padding: 4, backgroundColor: '#f9f9f9' }} elevation={3}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            {id ? 'Edit Static Content' : 'Create Static Content'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}
            <Box mb={3}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    variant="outlined"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Description */}
            <Box mb={3}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Content */}
            <Box mb={3}>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={6}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    required
                  />
                )}
              />
            </Box>

            {/* Image Upload */}
            <Box mb={3}>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Upload an Image
              </Typography>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="file" accept="image/*" />
                    {errors.image && <Typography color="error">Image is required</Typography>}
                  </>
                )}
              />
            </Box>

            {/* Video Upload */}
            <Box mb={3}>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                Upload a Video
              </Typography>
              <Controller
                name="video"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="file" accept="video/*" />
                    {errors.video && <Typography color="error">Video is required</Typography>}
                  </>
                )}
              />
            </Box>

            {/* Submit Button */}
            <Box mb={3}>
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ padding: '12px 0' }}>
                {isCreating || isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </Button>
            </Box>
          </form>
        </Paper>
      </motion.div>

      <ToastContainer />
    </Container>
  );
};

export default StaticContent;
