import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

// Auth
import Splash from './pages/Splash';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

// Main User Flow
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetail from './pages/DestinationDetail';
import Booking from './pages/Booking';
import PaymentProcess from './pages/PaymentProcess';
import BookingsList from './pages/BookingsList';
import AudioConnect from './pages/AudioConnect';
import AudioPlayer from './pages/AudioPlayer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import SettingsPage from './pages/Settings';

import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminDestinations from './pages/AdminDestinations';
import AdminTransactions from './pages/AdminTransactions';
import AdminSettings from './pages/AdminSettings';

function MainApp() {
  const { user, accessibility } = useContext(AppContext);

  return (
    <div className={`${accessibility.highContrast ? 'high-contrast' : ''} ${accessibility.largeText ? 'large-text' : ''}`} style={{ height: '100%', width: '100%', backgroundColor: 'var(--bg-color)', color: 'var(--text-dark)' }}>
      <Router>
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/" element={user ? (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/home" />) : <Splash />} />
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/home'} /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Routes inside MainLayout (has BottomNav) */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookings" element={<BookingsList />} />
            <Route path="/profile" element={user?.role === 'admin' ? <Navigate to="/admin" /> : <Profile />} />
          </Route>

          {/* User Routes without BottomNav */}
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/payment-process" element={<PaymentProcess />} />
          <Route path="/audio-connect/:ticketId" element={<AudioConnect />} />
          <Route path="/audio-player/:ticketId" element={<AudioPlayer />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Admin Routes inside AdminLayout */}
          <Route element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/destinations" element={<AdminDestinations />} />
            <Route path="/admin/transactions" element={<AdminTransactions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
