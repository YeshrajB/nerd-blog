import React, { useState } from "react";
import { User } from "../models/user";
import EditUser from "../pages/EditUser";

interface EditButtonProps {
  user: User;
}

const EditButton: React.FC<EditButtonProps> = ({ user }) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
  <>
    <button
      className="text-blue-500 hover:underline"
      onClick={() => setShowDialog(true)}
    >
      Edit
    </button>
    {showDialog && <EditUser user={user} onCancel={() => setShowDialog(false)} onSubmit={() => setShowDialog(false)}/>}
    </>
  );
};

export default EditButton;
