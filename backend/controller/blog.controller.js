import { Blog } from "../models/blog.model.js"
import mongoose from "mongoose";
export const createBlog= async (req,res)=>{
         try {
            const {title,description,category,photo} = req.body;
            const  newblog=await Blog.create({
                title,description,category,
                  photo: req.file?.path || "", // Cloudinary URL,
                  author:req.user.id
            })
            res.status(201).json({
                message:"blog created successfully",blog:newblog
            })

         } catch (error) {
            res.status(500).json({
                message:"Internal server error",error:error.message
            })
         }
}
export const getAllBlogs= async (req,res)=>{
    try {
        const blogs= await Blog.find();
        res.status(200).json({
            message:"blogs fetched successfully",blogs
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",error:error.message
        })
    }
}
export const getBlogById =async (req,res)=>{
         try {
            const {id}=req.params;
            const blog= await Blog.findById(id);
            if(!blog){
                return res.status(404).json({message:"Blog not found"});
            }
            res.status(200).json({
                message:"Blog fetched successfully",blog
            })
         } catch (error) {
            res.status(500).json({
                message:"Internal server error",error:error.message
            })
         }
}
export const deleteBlogById= async (req,res)=>{
         try {
            const {id}=req.params;
             const blog =await Blog.findById(id);
            if(!blog){
                return res.status(404).json({message:"Blog not found"});
            }
            if(req.user.id!== blog.author.toString()){
                return res.status(403).json({message:"Forbidden: You are not allowed to update this blog"});
            }
              const blogfound = await Blog.findByIdAndDelete(id);
            if(!blogfound){
                return res.status(404).json({message:"Blog not found"});
            }   
            res.status(200).json({
                message:"Blog deleted successfully"
            })
         } catch (error) {
            res.status(500).json({
                message:"Internal server error",error:error.message
            })
         }
}
export const updateBlogById =async(req,res)=>{
         try {
            const {id}=req.params;
            const blog =await Blog.findById(id);
            if(!blog){
                return res.status(404).json({message:"Blog not found"});
            }
            if(req.user.id!== blog.author.toString()){
                return res.status(403).json({message:"Forbidden: You are not allowed to update this blog"});
            }
            const {title,description,category,photo}= req.body;
            const updatedBlog= await Blog.findByIdAndUpdate(id,{
                title,description,category,photo
            },{new:true});
            if(!updatedBlog){
                return res.status(404).json({message:"try later"});
            }
            res.status(200).json({
                message:"Blog updated successfully",blog:updatedBlog
            })
         } catch (error) {
            res.status(500).json({
                message:"Internal server error",error:error.message
            })
         }
}
export const getBlogByAuthorId = async (req, res) => {
  try {
    const authorId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid author ID" });
    }

    const blogs = await Blog.find({ author: authorId });

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleLikeBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if user already liked
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      blog.likes.pull(userId);
    } else {
      // LIKE
      blog.likes.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      message: alreadyLiked ? "Blog unliked" : "Blog liked",
      likesCount: blog.likes.length,
      likes: blog.likes,
    });
  } catch (error) {
    console.error("Like error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const addCommentToBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.id;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    
    blog.comments.push({
      user: userId,
      text: text.trim(),
    });
    
    await blog.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comments: blog.comments,
    });
  } catch (error) {
    console.error("Comment error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const searchBlogs = async (req, res) => {
  try {
    const { keyword, category, author } = req.query;

    const query = {};

    // 🔍 Search by title or description
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    // 📂 Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // 👤 Filter by author
    if (author) {
      query.author = author;
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .populate("author", "fullname email");

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({
      message: "Search failed",
      error: error.message,
    });
  }
};
