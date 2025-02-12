import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { RankingsPage } from './pages/RankingsPage';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="/:category/rankings/:slug" element={<RankingsPage />} />
        <Route path="/:category/rankings/:slug/:productId" element={<ProductPage />} />
      </Routes>
    </div>
  );
}