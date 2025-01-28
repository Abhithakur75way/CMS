// user.dto.ts

export interface IUser {
    _id: string;
    username: string;
    email: string;
    role: 'admin' | 'user'; // Assuming you have two roles: admin and user
    refreshToken?: string; // Optional, as it might not be needed all the time
  }
  
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
  
  export interface RefreshTokenDto {
    refreshToken: string;
  }
  