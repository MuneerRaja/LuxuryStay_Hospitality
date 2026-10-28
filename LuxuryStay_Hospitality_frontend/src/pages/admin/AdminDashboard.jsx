import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  Calendar, 
  DoorOpen, 
  Users, 
  TrendingUp, 
  Building, 
  User,
  ArrowRight,
  DollarSign,
  Star
} from "lucide-react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const mockRevenue = [
  { day: "Mon", amount: 2450 },
  { day: "Tue", amount: 3100 },
  { day: "Wed", amount: 2800 },
  { day: "Thu", amount: 3550 },
  { day: "Fri", amount: 4200 },
  { day: "Sat", amount: 5100 },
  { day: "Sun", amount: 4800 },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsRes, hotelsRes, usersRes] = await Promise.all([
          api.get("/rooms"),
          api.get("/hotels"),
          api.get("/users")
        ]);
        setRooms(roomsRes.data.data);
        setHotels(hotelsRes.data.data);
        setUsers(usersRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const occupancy = totalRooms ? ((occupied / totalRooms) * 100).toFixed(1) : 0;
  const totalHotels = hotels.length;
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.isActive).length;

  const stats = [
    {
      title: "Total Hotels",
      value: totalHotels,
      icon: Building,
      color: "accent",
      trend: "+2 this month",
    },
    {
      title: "Total Rooms",
      value: totalRooms,
      icon: DoorOpen,
      color: "accent",
      trend: `${occupied} occupied`,
    },
    {
      title: "Occupancy Rate",
      value: `${occupancy}%`,
      icon: TrendingUp,
      color: "accent",
      trend: "+5% vs last week",
    },
    {
      title: "Active Users",
      value: `${activeUsers}/${totalUsers}`,
      icon: User,
      color: "accent",
      trend: `${totalUsers} total`,
    },
  ];

  const recentBookings = [
    { id: 101, guest: "John Doe", room: "Deluxe Suite", checkin: "Oct 30", amount: 450 },
    { id: 102, guest: "Jane Smith", room: "Standard", checkin: "Oct 31", amount: 280 },
    { id: 103, guest: "Mike Lee", room: "Family Room", checkin: "Nov 1", amount: 520 },
    { id: 104, guest: "Sarah Wilson", room: "Premium Suite", checkin: "Nov 2", amount: 680 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Welcome Message */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-card p-5 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-primary text-primary mb-1">
                Welcome back, {user?.username || 'Admin'}!
              </h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Here's an overview of your hotel management system.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/"
                className="btn btn-sm btn-secondary rounded-lg"
              >
                View Public Site
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-primary text-primary mt-2 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-accent">{stat.trend}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart & Bookings */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-card p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-primary text-lg sm:text-xl text-primary">
                Revenue – Last 7 Days
              </h3>
              <div className="flex items-center gap-2 text-accent text-sm">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium">$26,000</span>
              </div>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#a37d4c"
                    strokeWidth={3}
                    dot={{ fill: '#a37d4c', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#a37d4c' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-card p-5 sm:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-primary text-lg sm:text-xl text-primary">
                Recent Bookings
              </h3>
              <Link 
                to="/admin/bookings"
                className="text-accent text-sm hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent font-medium text-sm">
                        {booking.guest[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">
                        {booking.guest}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.room} • {booking.checkin}
                      </p>
                    </div>
                  </div>
                  <span className="text-accent font-medium text-sm">
                    ${booking.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 sm:px-6">
        <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-xl p-5 sm:p-6 border border-accent/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-primary text-lg sm:text-xl text-primary mb-1">
                Quick Actions
              </h3>
              <p className="text-gray-500 text-sm">
                Manage your hotels, rooms, and users efficiently
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/admin/hotels"
                className="btn btn-sm btn-primary rounded-lg"
              >
                <Building className="w-4 h-4" />
                Manage Hotels
              </Link>
              <Link
                to="/admin/rooms"
                className="btn btn-sm btn-secondary rounded-lg"
              >
                <DoorOpen className="w-4 h-4" />
                Manage Rooms
              </Link>
              <Link
                to="/admin/users"
                className="btn btn-sm btn-outline rounded-lg"
              >
                <Users className="w-4 h-4" />
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;