import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'FORM_FIELD';

interface DraggableFieldProps {
    field: { id: string; fieldName: string; fieldType: string; options: string[] };
    index: number;
    removeField: (id: string) => void;
    moveField: (draggedIndex: number, hoveredIndex: number) => void;
}

const DraggableField: React.FC<DraggableFieldProps> = ({ field, index, removeField, moveField }) => {
    const [, drag] = useDrag({
        type: ItemType,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveField(item.index, index);
                item.index = index; // Update the index of the dragged item
            }
        },
    });

    return (
        <Box ref={(node) => drag(drop(node))} mb={2} p={2} border={1} borderRadius={2} bgcolor="#f9f9f9">
            <Typography variant="body1">{field.fieldName}</Typography>
            <Typography variant=" body2" color="textSecondary">{field.fieldType}</Typography>
            <Button variant="outlined" color="error" onClick={() => removeField(field.id)}>
                Remove
            </Button>
        </Box>
    );
};

export default DraggableField;