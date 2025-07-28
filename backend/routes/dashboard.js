const express = require('express');
const router = express.Router();

// Mock dashboard data
const getDashboardStats = () => ({
  totalUsers: 2847,
  activeUsers: 1234,
  totalSessions: 5678,
  systemHealth: {
    cpu: 23,
    memory: 67,
    disk: 45,
    uptime: 99.9
  },
  recentActivity: [
    {
      id: '1',
      user: { name: 'John Doe', initials: 'JD' },
      action: 'created',
      target: 'new user account',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      type: 'create'
    },
    {
      id: '2',
      user: { name: 'Sarah Wilson', initials: 'SW' },
      action: 'updated',
      target: 'profile settings',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      type: 'update'
    },
    {
      id: '3',
      user: { name: 'Mike Johnson', initials: 'MJ' },
      action: 'deleted',
      target: 'old backup file',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      type: 'delete'
    },
    {
      id: '4',
      user: { name: 'Emily Davis', initials: 'ED' },
      action: 'logged in',
      target: 'admin panel',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      type: 'login'
    }
  ],
  analytics: {
    userGrowth: [
      { month: 'Jan', users: 1200 },
      { month: 'Feb', users: 1450 },
      { month: 'Mar', users: 1800 },
      { month: 'Apr', users: 2100 },
      { month: 'May', users: 2400 },
      { month: 'Jun', users: 2847 }
    ],
    sessionData: [
      { day: 'Mon', sessions: 890 },
      { day: 'Tue', sessions: 1200 },
      { day: 'Wed', sessions: 980 },
      { day: 'Thu', sessions: 1450 },
      { day: 'Fri', sessions: 1680 },
      { day: 'Sat', sessions: 1200 },
      { day: 'Sun', sessions: 950 }
    ]
  }
});

// Get dashboard overview
router.get('/', (req, res) => {
  try {
    const dashboardData = getDashboardStats();
    
    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get analytics data
router.get('/analytics', (req, res) => {
  try {
    const { period = '7d' } = req.query;
    const dashboardData = getDashboardStats();
    
    let analyticsData = dashboardData.analytics;
    
    // Filter data based on period (mock implementation)
    if (period === '30d') {
      analyticsData = {
        ...analyticsData,
        userGrowth: dashboardData.analytics.userGrowth
      };
    }
    
    res.json({
      success: true,
      data: {
        period,
        analytics: analyticsData
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;