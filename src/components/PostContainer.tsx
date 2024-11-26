import React from 'react'
import { Post } from '../models/post';
import { Link } from 'react-router-dom';

interface PostContainerProps {
  post: Post
}

const PostContainer: React.FC<PostContainerProps> = ({ post }) => {
  return (
      <div className="mb-4 hover:shadow-lg hover:-translate-y-1 hover:duration-200 hover:cursor-pointer">
        <Link to={`/posts/${post.id}`}>
    <article
    key={post.id}
    className="bg-white p-6 rounded-lg shadow-md dark:bg-slate-800"
    >
    <h2 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h2>
    <p className="text-gray-600 dark:text-slate-300">{post.content.slice(0, 100)}</p>
    <div className="mt-4 text-sm text-gray-500">
        Posted on {new Date(post.createdAt).toLocaleDateString()}
    </div>
    </article>
    </Link>
    </div>
  )
}

export default PostContainer
