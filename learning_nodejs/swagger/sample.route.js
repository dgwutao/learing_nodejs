// src/routes/users.ts
import { Router } from 'express';
const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: 获取用户列表
 *     security:
 *       - ApiKeyHeader: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: 页码，从 1 开始
 *         required: true
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 成功返回用户数组
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res) => {
  // ... 你的业务逻辑
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: 创建新用户
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: 用户创建成功
 */
router.post('/users', (req, res) => {
  // ... 你的业务逻辑
});

export default router;