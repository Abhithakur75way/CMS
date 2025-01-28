import express from 'express';
import { register, login, refreshToken } from './user.controller';
import { authRateLimiter } from '../common/middleware/limiter.middleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: User's email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           description: User's password
 *           example: P@ssw0rd
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', register, authRateLimiter);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login, authRateLimiter);

/**
 * @swagger
 * /user/refresh-token:
 *   post:
 *     summary: Refresh a user's authentication token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/refresh-token', refreshToken, authRateLimiter);

export default router;
