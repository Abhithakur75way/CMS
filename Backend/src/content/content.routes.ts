import { Router } from 'express';
import StaticContentController from './content.controller';
import upload from '../common/middleware/upload.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: StaticContent
 *   description: API endpoints for managing static content
 */

/**
 * @swagger
 * /static-content:
 *   post:
 *     summary: Create new static content
 *     tags: [StaticContent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Static content data to create a new entry
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Static content created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/static-content',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
  StaticContentController.createStaticContent
);

/**
 * @swagger
 * /static-content/{id}:
 *   get:
 *     summary: Get static content by ID
 *     tags: [StaticContent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the static content to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Static content retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Static content not found
 */
router.get('/static-content/:id', StaticContentController.getStaticContent);

/**
 * @swagger
 * /static-content/{id}:
 *   put:
 *     summary: Update static content by ID
 *     tags: [StaticContent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the static content to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated static content data
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Static content updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Static content not found
 */
router.put(
  '/static-content/:id',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
  StaticContentController.updateStaticContent
);

export default router;
