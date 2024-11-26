import React, { useState } from "react";

interface DeleteButtonProps {
  user: { id: string; name: string };
  onDelete: (userId: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ user, onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = () => {
    setShowDialog(false);
    onDelete(user.id);
  };

  return (
    <>
      <button
        className="text-red-500 hover:underline ml-2"
        onClick={() => setShowDialog(true)}
      >
        Delete
      </button>

      {/* Custom Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">Are you sure you want to delete {user.name}?</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirm}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
