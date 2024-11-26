import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { ViewPostPage } from './pages/ViewPost';
import { UnauthorizedPage } from './pages/Unauthorized';
import EditPost from './pages/EditPost';
import { AdminDashboard } from './pages/AdminDashboard';
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Roles from "./pages/Roles";


export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts/:id" element={<ViewPostPage/>} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
