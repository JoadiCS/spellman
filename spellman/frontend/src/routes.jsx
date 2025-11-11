import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/admin"
      element={(
        <ProtectedRoute requireAdmin>
          <Admin />
        </ProtectedRoute>
      )}
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
