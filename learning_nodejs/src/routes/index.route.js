import express from 'express';
import { logger } from '../utils/logger.util.js';

const router = express.Router();

router.get('/', function(req, res) {
 
  res.status(200).json({
    message:'hello world!'
  });
});

export default router;
