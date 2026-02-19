import api from "./axios";

export const createBlog =(data)=>{
    return api.post("/blog/createblog",data);
}
export const getAllBlogs = ()=>{
      return api.get("/blog/getallblogs");
}
export const getBlogById =(id)=>{
    return api.get(`/blog/getblogbyid/${id}`);
}
export const updateBlogById =(id,data)=>{
    return api.put(`/blog/updateblog/${id}`,data);
}   
export const deleteBlogById =(id)=>{
    return api.delete(`/blog/deleteblog/${id}`);
}
export const getAuthorBlog =()=>{
    return api.get("/blog/getauthorblog");
}
export const toggleLikeBlog =(id)=>{
    return api.put(`/blog/${id}/like`);
}
export const addCommentToBlog =(id,data)=>{
    return api.put(`/blog/${id}/comment`,data);
}
export const searchBlogs = (params) =>
  api.get("/blog/search", { params });
