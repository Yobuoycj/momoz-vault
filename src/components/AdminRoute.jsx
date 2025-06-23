import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  // Implement your authentication logic here
  const isAdmin = true; // Replace with actual authentication check
  
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}

export default AdminRoute;