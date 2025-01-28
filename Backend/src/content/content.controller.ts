import { Request, Response } from 'express';
import { CreateStaticContentDTO, UpdateStaticContentDTO } from './content.dto';
import StaticContentService from './content.service';

class StaticContentController {
  // Create new static content
  static async createStaticContent(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateStaticContentDTO = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const imageFile = files?.image ? files.image[0] : undefined;
      const videoFile = files?.video ? files.video[0] : undefined;

      if (imageFile) {
        data.image = imageFile.path; // Save the file path of the image
      }

      if (videoFile) {
        data.video = videoFile.path; // Save the file path of the video
      }

      const createdContent = await StaticContentService.createStaticContent(data);
      res.status(201).json(createdContent);
    } catch (error) {
      res.status(400).json({ message: 'Error creating static content', error });
    }
  }

  // Get static content by ID
  static async getStaticContent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const content = await StaticContentService.getStaticContentById(id);
      if (!content) {
        res.status(404).json({ message: 'Content not found' });
        return;
      }
      res.json(content);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching static content', error });
    }
  }

  // Update static content by ID
  static async updateStaticContent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updateData: UpdateStaticContentDTO = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const imageFile = files?.image ? files.image[0] : undefined;
    const videoFile = files?.video ? files.video[0] : undefined;

    if (imageFile) {
      updateData.image = imageFile.path; // Save the file path of the image
    }

    if (videoFile) {
      updateData.video = videoFile.path; // Save the file path of the video
    }

    try {
      const updatedContent = await StaticContentService.updateStaticContent(id, updateData);
      if (!updatedContent) {
        res.status(404).json({ message: 'Content not found' });
        return;
      }
      res.json(updatedContent);
    } catch (error) {
      res.status(400).json({ message: 'Error updating content', error });
    }
  }
}

export default StaticContentController;
