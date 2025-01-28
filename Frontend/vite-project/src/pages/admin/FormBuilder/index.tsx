import React, { useState, Suspense, lazy } from 'react';
import { useCreateFormMutation } from '../../../services/formApi';
import { Box, Button, Typography, TextField, CircularProgress, Alert, MenuItem, FormControl, InputLabel, Select, Skeleton } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify'; 
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ItemType = 'FORM_FIELD';

// Lazy load the DraggableField component
const DraggableField = lazy(() => import('../../../components/DraggableField.tsx'));

// Yup validation schema
const schema = Yup.object().shape({
    formName: Yup.string().required('Form name is required'),
    fieldName: Yup.string().required('Field name is required'),
});

const FormBuilder = () => {
    const [fieldType, setFieldType] = useState('text');
    const [fields, setFields] = useState<{ id: string; fieldName: string; fieldType: string; options: string[] }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [createForm, { isLoading }] = useCreateFormMutation();
    
    const { control, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const formName = watch('formName');
    const fieldName = watch('fieldName');

    const addField = () => {
        if (!fieldName || !fieldType) {
            setError('Please provide both Field Name and Field Type.');
            return;
        }

        const newField = { id: uuidv4(), fieldName, fieldType, options: [] };
        setFields((prev) => [...prev, newField]);
        reset({ fieldName: '' }); // Reset field name after adding
        setFieldType('text'); // Reset field type to default
    };

    const removeField = (id: string) => {
        setFields((prev) => prev.filter((field) => field.id !== id));
    };

    const moveField = (draggedIndex: number, hoveredIndex: number) => {
        const newFields = [...fields];
        const [draggedField] = newFields.splice(draggedIndex, 1);
        newFields.splice(hoveredIndex, 0, draggedField);
        setFields(newFields);
    };

    const onSubmit = async () => {
        if (!formName) {
            setError('Please provide a form name');
            return;
        }

        try {
            const formData = {
                formName: formName,
                fields: fields,
            };
            await createForm(formData).unwrap();
            toast.success('Form created successfully!');
            reset();
            setFields([]);
            setError(null);
        } catch (err) {
            setError('Error creating form. Please try again.');
            toast.error('Error creating form. Please try again.');
        }
    };

    return (
        <Box sx={{ marginLeft: '250px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Form Builder
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <Box mb={2}>
                <Controller
                    name="formName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Form Name"
                            fullWidth
                            error={!!errors.formName}
                            helperText={errors.formName ? errors.formName.message : ''}
                        />
                    )}
                />
            </Box>

            <Box mb={2}>
                <Controller
                    name="fieldName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Field Name"
                            fullWidth
                            error={!!errors.fieldName}
                            helperText={errors.fieldName ? errors.fieldName.message : ''}
                        />
                    )}
                />
            </Box>

            <Box mb={2}>
                <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                        value={fieldType}
                        onChange={(e) => setFieldType(e.target.value )}
                        label="Field Type"
                    >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="checkbox">Checkbox</MenuItem>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Button 
                onClick={addField} 
                disabled={isLoading} 
                variant="contained"
            >
                Add Field
            </Button>

            <Box mt={3}>
                <Suspense fallback={<Skeleton variant="rectangular" width="100%" height={56} />}>
                    {fields.map((field, index) => (
                        <DraggableField
                            key={field.id}
                            field={field}
                            index={index}
                            removeField={removeField}
                            moveField={moveField}
                        />
                    ))}
                </Suspense>
            </Box>

            <Box mt={2}>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Save Form'}
                </Button>
            </Box>
        </Box>
    );
};

export default FormBuilder;