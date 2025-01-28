import { Schema, model, Document } from 'mongoose';

export interface IStaticContent extends Document {
  title: string;
  description: string;
  content: string;
  image: string;
  videoUrl: string;
  iframeUrl: string;
  seoData: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const StaticContentSchema = new Schema<IStaticContent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: false },
  videoUrl: { type: String, required: false },
  iframeUrl: { type: String, required: false },
  seoData: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    keywords: { type: [String], required: false },
  },
}, { timestamps: true });

export default model<IStaticContent>('StaticContent', StaticContentSchema);
