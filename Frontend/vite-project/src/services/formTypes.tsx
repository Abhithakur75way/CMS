export interface CreateFormDto {
    formName: string;
    fields: {
      fieldName: string;
      fieldType: string;
      required?: boolean;
      options?: string[]; // For dropdown fields
    }[];
  }
  
  export interface UpdateFormDto {
    formName?: string;
    fields?: {
      fieldName: string;
      fieldType: string;
      required?: boolean;
      options?: string[];
    }[];
  }