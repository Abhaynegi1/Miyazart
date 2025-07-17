'use client';

import React, { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  createdAt: string;
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://finbiznet-backend.onrender.com/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data: Blog[]) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center">Loading blogs...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-lg p-4 shadow-md flex flex-col md:flex-row gap-4">
            <img src={blog.image} alt={blog.title} className="w-full md:w-48 h-32 object-cover rounded" />
            <div>
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">{blog.category} &middot; {new Date(blog.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-800">{blog.description.replace(/\\n/g, '\n')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage; 