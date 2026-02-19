import { useEffect, useState } from "react"
import { getAllBlogs } from "./api/blog.api";
import { Route,Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Footer } from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Profile from "./pages/Profile";



export default function App() {
 
  return (
        <>
         <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
            <Route
     path="/blogs"
       element={
      <ProtectedRoute>
      <BlogList />
      </ProtectedRoute>
    } 
         />
           <Route
  path="/blogs/:id"
  element={
    <ProtectedRoute>
      <BlogDetails />
    </ProtectedRoute>
  }
/>
                   <Route
  path="/create-blog"
  element={
    <ProtectedRoute>
      <CreateBlog />
    </ProtectedRoute>
  }
/>
    <Route
  path="/blogs/edit/:id"
  element={
    <ProtectedRoute>
      <EditBlog />
    </ProtectedRoute>
  }
/>   
    <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        </Routes>
          <Footer></Footer>
        </>
  )
}