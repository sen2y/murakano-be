/**
 * @swagger
 * tags:
 *   - name: 사용자 API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: 회원가입
 *     tags: [사용자 API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               nickname:
 *                 type: string
 *                 example: usernickname
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/check/nickname:
 *   get:
 *     summary: 회원가입 - 닉네임 중복 조회
 *     tags: [사용자 API]
 *     parameters:
 *       - in: query
 *         name: nickname
 *         schema:
 *           type: string
 *           example: usernickname
 *         required: true
 *     responses:
 *       200:
 *         description: Nickname availability checked
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/check/email:
 *   get:
 *     summary: 회원가입 - 이메일 중복 조회
 *     tags: [사용자 API]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: user@example.com
 *         required: true
 *     responses:
 *       200:
 *         description: Email availability checked
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/local/login:
 *   post:
 *     summary: 로컬 로그인
 *     tags: [사용자 API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/kakao/login:
 *   post:
 *     summary: 카카오 로그인
 *     tags: [사용자 API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: kakaoCode
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [사용자 API]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: JWT 재발급
 *     tags: [사용자 API]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: 회원탈퇴
 *     tags: [사용자 API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/role:
 *   get:
 *     summary: 사용자 권한 조회
 *     tags: [사용자 API]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User role retrieved successfully
 *       500:
 *         description: Internal server error
 */
