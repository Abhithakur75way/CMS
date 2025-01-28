import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../../user/user.schema'; // Import the User model
import { IUser } from '../../user/user.dto'; // Import the IUser interface

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      const user = await User.findById(decoded.userId); // Make sure you're using the correct field to fetch user
  
      if (!user) {
        res.status(401).json({ message: 'User  not found' });
        return;
      }
  
      req.user = { _id: user._id.toString(), username: user.username, email: user.email, role: user.role };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
  };