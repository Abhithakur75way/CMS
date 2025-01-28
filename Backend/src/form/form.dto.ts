export interface CreateFormDto {
    formName: string;
    fields: {
      fieldName: string;
      fieldType: string;
      required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string; // for regex validation (email, etc.)
    options?: string[]; // For dropdown fields
    }[];
}

export interface UpdateFormDto {
    formName?: string;
    fields?: {
      fieldName: string;
      fieldType: string;
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      pattern?: string;
      options?: string[];
    }[];
  }