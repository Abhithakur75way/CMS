import express from 'express';
import { authenticate } from '../common/middleware/auth.middleware';
import { authorizeAdmin } from '../common/middleware/admin.middleware';
import { create, update, remove, getForm } from './form.controller';
import { validateCreateForm } from '../common/middleware/validate.middleware';
import { apiRateLimiter } from '../common/middleware/limiter.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: API endpoints for managing forms
 */

/**
 * @swagger
 * /forms:
 *   post:
 *     summary: Create a new form
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Form data to create a new form
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Form created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post('/forms', authenticate, authorizeAdmin, validateCreateForm, create, apiRateLimiter);

/**
 * @swagger
 * /forms/{id}:
 *   put:
 *     summary: Update a form by ID
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated form data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fields:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Form updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Form not found
 */
router.put('/forms/:id', authenticate, authorizeAdmin, validateCreateForm, update, apiRateLimiter);

/**
 * @swagger
 * /forms/{id}:
 *   delete:
 *     summary: Delete a form by ID
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Form not found
 */
router.delete('/forms/:id', authenticate, authorizeAdmin, remove, apiRateLimiter);

/**
 * @swagger
 * /forms/{id}:
 *   get:
 *     summary: Get form details by ID
 *     tags: [Forms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Form not found
 */
router.get('/forms/:id', authenticate, authorizeAdmin, getForm, apiRateLimiter);

export default router;
