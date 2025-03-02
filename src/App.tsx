import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ProductPage } from './pages/ProductPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/recommendations/:slug" element={<RecommendationsPage />} />
        <Route path="/:category/recommendations/:slug/:productId" element={<ProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}