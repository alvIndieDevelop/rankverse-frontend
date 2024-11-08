import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Matchmaking from "./pages/Matchmaking";
// import Tournaments from "./pages/Tournaments";
// import TournamentDetails from "./pages/TournamentDetails";
// import OrganizerDashboard from "./pages/OrganizerDashboard";
import Layout from "./components/Layout";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                {user?.role === "organizer" ? <Dashboard /> : <Dashboard />}
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/matchmaking"
          element={
            <ProtectedRoute>
              <Layout>
                <Matchmaking />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/tournaments"
          element={
            <ProtectedRoute>
              <Layout>
                <Tournaments />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path="/tournaments/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TournamentDetails />
              </Layout>
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
