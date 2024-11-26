import { Link } from "react-router-dom";

export const UnauthorizedPage: React.FC = () => {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">
            Unauthorized Access
          </h1>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-600"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
};