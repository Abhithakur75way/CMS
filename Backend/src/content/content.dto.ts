export interface CreateStaticContentDTO {
    title: string;
    description: string;
    content: string;
    image?: string; // Add image field (file path or URL)
  video?: string; // Add video field (file path or URL)
    iframe?: string;
    seoData: {
      title: string;
      description: string;
      keywords: string[];
    };
  }
  
  export interface UpdateStaticContentDTO {
    title?: string;
    description?: string;
    content?: string;
    image?: string;
    video?: string;
    iframe?: string;
    seoData?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
  }
  