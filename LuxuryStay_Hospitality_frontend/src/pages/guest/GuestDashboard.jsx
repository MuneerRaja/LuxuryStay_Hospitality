import { useState, useEffect } from 'react';
import { Calendar, FileText, Star, Bell, Loader, AlertCircle, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardContext } from '../../context/DashboardContext';
import { useAuth } from '../../context/AuthContext';

const GuestDashboard = () => {
  const {
    fetchGuestBookings,
    fetchGuestStats,
    fetchNotifications,
    loading
  } = useDashboardContext();

  const { user } = useAuth();

  const [stats, setStats] = useState({
    upcomingBookings: 0,
    totalBookings: 0,
    points: 0,
    unreadNotifications: 0,
    totalSpent: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoadingData(true);
    setError(null);
    
    try {
      const [bookingsData, statsData, notificationsData] = await Promise.all([
        fetchGuestBookings(),
        fetchGuestStats().catch(() => ({
          totalBookings: 0,
          points: 0,
          totalSpent: 0
        })),
        fetchNotifications(5).catch(() => [])
      ]);

      const now = new Date();
      const upcoming = bookingsData.filter(booking => 
        new Date(booking.checkIn) > now && 
        ['confirmed', 'pending'].includes(booking.status)
      );

      const unread = notificationsData.filter(n => !n.isRead);

      setStats({
        upcomingBookings: upcoming.length,
        totalBookings: bookingsData.length,
        points: statsData.loyaltyPoints || statsData.points || 0,
        unreadNotifications: unread.length,
        totalSpent: statsData.totalSpent || 0
      });

      const sortedBookings = [...bookingsData]
        .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
        .slice(0, 5);
      
      setRecentBookings(sortedBookings);
      setNotifications(notificationsData.slice(0, 5));
    } catch (err) {
      setError(err.message);
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmed' },
      completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
      'checked-in': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Checked In' }
    };
    
    return statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Welcome Section */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-card p-5 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-primary text-primary mb-1">
                Welcome back, {user?.username || 'Guest'}!
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Here's your booking overview
              </p>
            </div>
            <button
              onClick={loadDashboardData}
              disabled={loadingData}
              className="btn btn-sm btn-primary rounded-lg"
            >
              {loadingData ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Refresh
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-4 sm:px-6 mb-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="stat-card group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  Upcoming
                </p>
                <p className="text-2xl sm:text-3xl font-primary text-primary mt-2 mb-1">
                  {stats.upcomingBookings}
                </p>
                <p className="text-xs text-accent">Active reservations</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="stat-card group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  Total Bookings
                </p>
                <p className="text-2xl sm:text-3xl font-primary text-primary mt-2 mb-1">
                  {stats.totalBookings}
                </p>
                <p className="text-xs text-accent">All time</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="stat-card group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  Loyalty Points
                </p>
                <p className="text-2xl sm:text-3xl font-primary text-primary mt-2 mb-1">
                  {stats.points.toLocaleString()}
                </p>
                <p className="text-xs text-accent">Reward points</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          <div className="stat-card group hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  Notifications
                </p>
                <p className="text-2xl sm:text-3xl font-primary text-primary mt-2 mb-1">
                  {stats.unreadNotifications}
                </p>
                <p className="text-xs text-accent">Unread messages</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      {stats.totalSpent > 0 && (
        <div className="px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-5 sm:p-6 border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Spent</p>
                  <p className="text-2xl sm:text-3xl font-primary text-accent mt-1">
                    ${stats.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Lifetime spending</p>
                </div>
                <DollarSign className="w-10 h-10 text-accent/50" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-5 sm:p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Member Status</p>
                  <p className="text-2xl sm:text-3xl font-primary text-green-700 mt-1">
                    {stats.points < 500 ? 'Silver' : stats.points < 2000 ? 'Gold' : 'Platinum'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Loyalty tier</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Bookings */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-primary text-lg sm:text-xl text-primary">
                Recent Bookings
              </h3>
              <Link 
                to="/guest/my-bookings"
                className="text-accent text-sm hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {recentBookings.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No bookings yet</p>
              <Link to="/hotels" className="btn btn-sm btn-primary rounded-lg">
                Explore Hotels
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-premium">
                <thead>
                  <tr>
                    <th>Hotel</th>
                    <th>Room</th>
                    <th className="hidden sm:table-cell">Dates</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => {
                    const statusInfo = getStatusBadge(booking.status);
                    return (
                      <tr key={booking._id}>
                        <td className="font-medium text-primary">
                          {booking.hotel?.name || 'N/A'}
                        </td>
                        <td className="text-gray-600">
                          {booking.room?.type || 'N/A'}
                        </td>
                        <td className="hidden sm:table-cell text-gray-600">
                          {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`badge ${statusInfo.bg} ${statusInfo.text}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="font-medium text-accent">
                          ${booking.totalAmount?.toFixed(2) || '0.00'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div className="px-4 sm:px-6">
          <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-primary text-lg sm:text-xl text-primary">
                  Recent Notifications
                </h3>
                <Link 
                  to="/guest/notifications"
                  className="text-accent text-sm hover:underline flex items-center gap-1"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-4 sm:p-5 transition-colors ${
                    notification.isRead 
                      ? 'bg-white hover:bg-gray-50' 
                      : 'bg-blue-50/50 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.isRead ? 'bg-transparent' : 'bg-accent'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-primary text-sm sm:text-base">
                        {notification.title || notification.message}
                      </p>
                      {notification.description && (
                        <p className="text-gray-500 text-sm mt-1">
                          {notification.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestDashboard;