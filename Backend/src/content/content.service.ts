import StaticContent, { IStaticContent } from './content.schema';
import { CreateStaticContentDTO, UpdateStaticContentDTO } from './content.dto';

class StaticContentService {
  // Create new static content
  static async createStaticContent(data: CreateStaticContentDTO): Promise<IStaticContent> {
    const staticContent = new StaticContent(data);
    return await staticContent.save();
  }

  // Get static content by ID
  static async getStaticContentById(id: string): Promise<IStaticContent | null> {
    return await StaticContent.findById(id);
  }

  // Update static content by ID
  static async updateStaticContent(id: string, data: UpdateStaticContentDTO): Promise<IStaticContent | null> {
    return await StaticContent.findByIdAndUpdate(id, data, { new: true });
  }
}

export default StaticContentService;
