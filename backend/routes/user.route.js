import express from "express"
import { getProfile, login, logout, signup, updateProfile } from "../controller/user.controller.js";
import { verifyUser } from "../middleware/user.middleware.js";
import upload from "../middleware/upload.js";
const router=express.Router();


router.post('/signup',upload.single('photo'),signup);
router.post('/login',login);
router.post('/logout',logout);
router.get('/getProfile',verifyUser,getProfile);
router.put('/updateProfile',verifyUser,upload.single('photo'),updateProfile);
export default router;
