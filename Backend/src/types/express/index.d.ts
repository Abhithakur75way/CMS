// src/types/express/index.d.ts
import { User } from "../../user/user.schema"; // Adjust the path as needed

declare global {
  namespace Express {
    interface Request {
      user?:{
        id:string;
        role:string;
      } // Add `user` with the correct type (adjust to match your `User` model)
    }
  }
}
