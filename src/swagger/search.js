/**
 * @swagger
 * tags:
 *   - name: 검색 API
 */

/**
 * @swagger
 * /words/search/{searchTerm}:
 *   post:
 *     summary: 개발 용어 검색
 *     tags:
 *       - 검색 API
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to look for
 *     responses:
 *       200:
 *         description: A list of search words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: SEARCH_WORDS_SUCCESS
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: exampleWord
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/recent:
 *   get:
 *     summary: 최근 검색어 조회
 *     tags: [검색 API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent searches retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /words/rank:
 *   get:
 *     summary: 인기 검색어 조회
 *     tags:
 *       - 검색 API
 *     responses:
 *       200:
 *         description: A list of rank words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RANK_WORDS_SUCCESS
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: exampleWord
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /words/search/related:
 *   get:
 *     summary: 연관 검색어 조회
 *     tags:
 *       - 검색 API
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: The search term to look for related words
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of related words to return
 *     responses:
 *       200:
 *         description: A list of related words
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: RELATED_WORDS_SUCCESS
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: exampleWord
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/recent/{searchTerm}:
 *   delete:
 *     summary: 최근 검색어 삭제
 *     tags: [검색 API]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term to delete
 *     responses:
 *       200:
 *         description: Recent search term deleted successfully
 *       500:
 *         description: Internal server error
 */
