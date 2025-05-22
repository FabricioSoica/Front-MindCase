import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderiza os componentes filhos (a rota protegida)
  return <>{children}</>;
} 