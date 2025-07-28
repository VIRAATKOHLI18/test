const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock users database
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
    avatar: null
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '+1 (555) 987-6543',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-20',
    avatar: null
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: null,
    role: 'moderator',
    status: 'inactive',
    joinDate: '2024-01-08',
    avatar: null
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 456-7890',
    role: 'user',
    status: 'pending',
    joinDate: '2024-03-01',
    avatar: null
  }
];

// Get all users
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    let filteredUsers = users;
    
    // Search functionality
    if (search) {
      filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredUsers.length / limit),
          totalUsers: filteredUsers.length,
          hasNext: endIndex < filteredUsers.length,
          hasPrev: startIndex > 0
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new user
router.post('/', [
  body('name').isLength({ min: 2 }).trim(),
  body('email').isEmail().normalizeEmail(),
  body('role').isIn(['admin', 'user', 'moderator']),
  body('status').isIn(['active', 'inactive', 'pending'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    
    const { name, email, phone, role, status } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      phone: phone || null,
      role,
      status,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: null
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: newUser }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user
router.put('/:id', [
  body('name').optional().isLength({ min: 2 }).trim(),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['admin', 'user', 'moderator']),
  body('status').optional().isIn(['active', 'inactive', 'pending'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }
    
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user
    users[userIndex] = { ...users[userIndex], ...req.body };
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user: users[userIndex] }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    users.splice(userIndex, 1);
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;