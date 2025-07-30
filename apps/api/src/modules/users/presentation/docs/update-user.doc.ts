/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     description: |
 *       Updates an existing user. Requires authentication.
 *       - **ADMIN:** Can update any user
 *       - **MANAGER/USER:** Can only update their own profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, BLOCKED, PENDING]
 *                 description: User status
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Invalid or missing authentication token
 *       403:
 *         description: User does not have permission to update this user
 *       404:
 *         description: User not found
 */
