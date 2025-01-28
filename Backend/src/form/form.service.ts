import { Form } from './form.schema';
import { CreateFormDto, UpdateFormDto } from './form.dto';

export const createForm = async (formData: CreateFormDto) => {
  const form = new Form(formData);
  await form.save();
  return form;
};

export const updateForm = async (formId: string, formData: UpdateFormDto) => {
  const form = await Form.findByIdAndUpdate(formId, formData, { new: true });
  return form;
};

export const deleteForm = async (formId: string) => {
  await Form.findByIdAndDelete(formId);
};

export const getFormById = async (formId: string) => {
  return await Form.findById(formId);
};