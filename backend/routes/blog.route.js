import express from 'express';
import { addCommentToBlog, createBlog, deleteBlogById, getAllBlogs, getBlogByAuthorId, getBlogById, searchBlogs, toggleLikeBlog, updateBlogById } from '../controller/blog.controller.js';
import { verifyAdmin, verifyUser } from "../middleware/user.middleware.js";
import upload from "../middleware/upload.js";
const router = express.Router();

router.post('/createblog',verifyAdmin,upload.single('photo'),createBlog);
router.get('/getallblogs',getAllBlogs);
router.get('/getblogbyid/:id',getBlogById);
router.put('/updateblog/:id',verifyAdmin,upload.single('photo'),updateBlogById);
router.delete('/deleteblog/:id',verifyAdmin,deleteBlogById);
router.get('/getauthorblog',verifyAdmin,getBlogByAuthorId);
router.put("/:id/like", verifyUser, toggleLikeBlog);
router.put("/:id/comment", verifyUser, addCommentToBlog);
router.get("/search", searchBlogs);



export default router;

