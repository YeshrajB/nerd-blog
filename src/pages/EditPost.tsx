import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { Post } from "../models/post";
import { ProtectedRoute } from "../components/ProtectedRoute";

interface EditPostProps {
    // post: Post;
    // onSubmit: (user: User) => void;
    // onCancel: () => void;
}

const EditPost : React.FC<EditPostProps> = ({ }) => {
  const navigate = useNavigate();

  // const [currentPost, setPost] = useState<Post>(post);

  return (
    <ProtectedRoute
      requiredPermissions={[{ action: 'Update', resource: 'Post' }]}
      >
      <div className="min-h-[50vh] flex items-center dark:text-white justify-center">
          This feature is not available yet. Stay tuned!
      </div>
    </ProtectedRoute>
  );
};

export default EditPost;
