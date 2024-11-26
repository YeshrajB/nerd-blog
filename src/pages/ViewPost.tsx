import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../models/post';
import ax from '../api/axiosConfig';
import { usePermissions } from '../hooks/userPermission';
import { PostActions } from '../components/PostActions';
import LoadingAnimation from '../components/LoadingAnimation';


export const ViewPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const result = await ax.get(`posts/${id}`);
        const post: Post = (result.data.post);
        setPost(post);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
          {error || 'Post not found'}
        </h2>
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-600"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-12">
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <PostActions post={post} />
        <h1 className="text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-medium">{"post.author?.name"}</p>
              <p className="text-sm dark:text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))} 
          </div>
        </div>
      </div>
      <div className="prose prose-lg max-w-none dark:text-gray-300">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
    </div>
  );
};
