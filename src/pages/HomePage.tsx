import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Post } from '../models/post';
import axios from "../api/axiosConfig";
import PostContainer from '../components/PostContainer';
import LoadingAnimation from '../components/LoadingAnimation';

export const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
//   const { user } = useAuth();

  const getFeed = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await axios.get(`posts/feed`);
      const posts: Post[] = (result.data.feed);
      setPosts(posts);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
          {error}
        </h2>
        <button
          onClick={() => getFeed}
          className="text-blue-500 hover:text-blue-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white">Latest Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostContainer post={post} />
        ))}
      </div>
    </div>
  );
};