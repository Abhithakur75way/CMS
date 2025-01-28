import { Request, Response } from 'express';
import { CreateFormDto, UpdateFormDto } from './form.dto';
import { createForm, updateForm, deleteForm, getFormById } from './form.service';

export const create = async (req: Request, res: Response): Promise<void> => {
  const formData: CreateFormDto = req.body;
  try {
    const form = await createForm(formData);
    res.status(201).json(form);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating form', error: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const formData: UpdateFormDto = req.body;
  try {
    const form = await updateForm(id, formData);
    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return; // Ensure to return after sending a response
    }
    res.json(form);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating form', error: error.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await deleteForm(id);
    res.json({ message: 'Form deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting form', error: error.message });
  }
};

export const getForm = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const form = await getFormById(id);
    if (!form) {
      res.status(404).json({ message: 'Form not found' });
      return; // Ensure to return after sending a response
    }
    res.json(form);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
};