import express from 'express';
import askChatbot from '../faqRecruitment/chatbot.js';


const router = express.Router();


router.post('/', askChatbot);

export default router;