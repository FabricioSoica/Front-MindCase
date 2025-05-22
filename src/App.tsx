import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import ArticleDetail from './pages/ArticleDetail';
import ArticleForm from './pages/ArticleForm';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-articles/:id"
        element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Feed />} />
      <Route
        path="/article/new"
        element={
          <ProtectedRoute>
            <ArticleForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/article/:id/edit"
        element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        }
      />

      
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changepassword" element={<ChangePassword />} />
    </Routes>
  );
}
