
// frontend/src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = ({ refresh }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [refresh]);

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <h2 className="text-2xl mb-4">Posts</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-bold">{post.title}</h3>
                        <p className="text-gray-600 mt-2">{post.content}</p>
                        <div className="mt-4 text-sm text-gray-500">
                            By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;