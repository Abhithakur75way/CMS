import { Schema, model } from 'mongoose';

const formSchema = new Schema({
  formName: { type: String, required: true },
  fields: [
    {
      fieldName: { type: String, required: true },
      fieldType: { type: String, required: true, enum: ['text', 'email', 'number', 'checkbox', 'dropdown'] },
      required: { type: Boolean, default: false },
      options: [{ type: String }], // For dropdown fields
    },
  ],
  submissions: [
    {
      data: { type: Schema.Types.Mixed }, // Flexible structure for form submissions
      submittedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Form = model('Form', formSchema);
