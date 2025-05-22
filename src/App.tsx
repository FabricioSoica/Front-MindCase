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

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/user/:id" element={<EditProfile />} />
      <Route path="/my-articles/:id" element={<MyArticles />} />
      <Route path="/" element={<Feed />} />
      <Route path="/article/new" element={<ArticleForm />} />
      <Route path="/article/:id/edit" element={<EditArticle />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
