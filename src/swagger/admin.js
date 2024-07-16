/**
 * @swagger
 * tags:
 *   - name: 관리자 API
 */

/**
 * @swagger
 * /users/requests/all:
 *   get:
 *     summary: 전체 요청 목록 조회
 *     tags: [관리자 API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All user requests retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/requests/{requestId}/status:
 *   post:
 *     summary: 개발 용어 요청 승인/반려 상태 변경
 *     tags: [관리자 API]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         schema:
 *           type: string
 *         required: true
 *         description: Request ID to update status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               formData:
 *                 type: object
 *               requestType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       500:
 *         description: Internal server error
 */
