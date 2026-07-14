import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { sendMessage, getHistory } from '../controllers/chat.controller';

const router = Router();

router.post('/', authMiddleware, sendMessage);
router.get('/:sessionId', authMiddleware, getHistory);

export default router;
