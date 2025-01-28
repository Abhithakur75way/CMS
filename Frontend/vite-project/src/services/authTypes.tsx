export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    role?: string; // Optional, defaults to 'user'
  }
  
  export interface LoginUserDto {
    email: string;
    password: string;
  }