import { Link, useNavigate, } from "react-router-dom";
import { usePermissions } from "../hooks/userPermission";
import { useAuth } from "../contexts/AuthContext";
import { Post } from "../models/post";
import ax from "../api/axiosConfig";

export const PostActions: React.FC<{ post: Post }> = ({ post }) => {
    const { hasPermission, hasRole } = usePermissions();
    const { user } = useAuth()!;
    const navigate = useNavigate();
  
    const canEdit = hasPermission('Update', 'Post') &&
      (hasRole('admin') || hasRole('editor') || post.authorId === user?.id);
    
    const canDelete = hasPermission('Delete', 'Post') &&
      (hasRole('admin') || hasRole('editor') || post.authorId === user?.id);

    const handleDelete = async () => {
      try {
        await ax.delete(`/posts/${post.id}`);
        navigate(-1);
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div className="flex gap-4">
        <button
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-600"
          >
            ← Back to Posts
          </button>
        {canEdit && (
          <Link
            to={`/posts/${post.id}/edit`}
            className="text-blue-500 hover:text-blue-600"
          >
            Edit
          </Link>
        )}
        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        )}
      </div>
    );
  };