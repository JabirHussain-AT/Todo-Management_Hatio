import express from 'express';
import verifyUserAuth from '../utils/middleware/authMiddleware';
import { sendOtp , signUp , login , checkAuth  } from  '../controller/authController'

const router = express.Router();

router.post('/send-otp', sendOtp );
router.post('/sign-up',signUp)
router.post('/login',login)
router.get('/check',verifyUserAuth,checkAuth)

export default router;