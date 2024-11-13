import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  // State for Authentication Interface
  const [loginData, setLoginData] = useState({
    userId: '',
    password: '',
    twoFactorCode: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State for Role-Based Access Control
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(['Miner', 'Supervisor', 'Admin']);
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'Miner',
    contactInfo: '',
    emergencyDetails: '',
  });

  // State for Activity Monitoring
  const [userActivities, setUserActivities] = useState([]);

  // State for User Profile Management
  const [profileData, setProfileData] = useState({
    contactInfo: '',
    emergencyDetails: '',
  });

  // Handle login form changes
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Implement authentication logic here
    setIsAuthenticated(true); // Set to true for demonstration purposes
  };

  // Handle new user form changes
  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle new user submission
  const handleNewUserSubmit = (e) => {
    e.preventDefault();
    // Add the new user to the users list
    setUsers([...users, newUser]);
    // Reset new user form
    setNewUser({
      name: '',
      role: 'Miner',
      contactInfo: '',
      emergencyDetails: '',
    });
  };

  // Handle profile data change
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Update user profile logic here
  };

  useEffect(() => {
    // Fetch initial data for users and activities
    // For demonstration, using static data
    setUsers([
      { name: 'John Doe', role: 'Miner', contactInfo: '1234567890', emergencyDetails: 'N/A' },
      { name: 'Jane Smith', role: 'Supervisor', contactInfo: '0987654321', emergencyDetails: 'N/A' },
    ]);
    setUserActivities([
      { user: 'John Doe', activity: 'Logged In', timestamp: '2023-10-01 08:00' },
      { user: 'Jane Smith', activity: 'Assigned Role', timestamp: '2023-10-01 09:00' },
    ]);
  }, []);

  if (!isAuthenticated) {
    // Render Authentication Interface
    return (
      <div className="container mx-auto py-12 px-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">User Login</h2>
        <form onSubmit={handleLoginSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              name="userId"
              value={loginData.userId}
              onChange={handleLoginChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Two-Factor Authentication Code</label>
            <input
              type="text"
              name="twoFactorCode"
              value={loginData.twoFactorCode}
              onChange={handleLoginChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-8">
      <h2 className="text-3xl font-bold mb-6 text-green-600">User Management & Access Control</h2>

      {/* Role-Based Access Control */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Role-Based Access Control</h3>
        <form onSubmit={handleNewUserSubmit} className="mb-6">
          <h4 className="text-xl font-semibold mb-2">Add New User</h4>
          <div className="mb-2">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleNewUserChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleNewUserChange}
              className="mt-1 p-2 border w-full rounded"
            >
              {roles.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={newUser.contactInfo}
              onChange={handleNewUserChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Emergency Details</label>
            <input
              type="text"
              name="emergencyDetails"
              value={newUser.emergencyDetails}
              onChange={handleNewUserChange}
              className="mt-1 p-2 border w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add User
          </button>
        </form>

        {/* Users List */}
        <h4 className="text-xl font-semibold mb-2">User List</h4>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Contact Info</th>
              <th>Emergency Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center border-t">
                <td className="py-2">{user.name}</td>
                <td>{user.role}</td>
                <td>{user.contactInfo}</td>
                <td>{user.emergencyDetails}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Activity Monitoring */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">Activity Monitoring</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">User</th>
              <th>Activity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {userActivities.map((activity, index) => (
              <tr key={index} className="text-center border-t">
                <td className="py-2">{activity.user}</td>
                <td>{activity.activity}</td>
                <td>{activity.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Profile Management */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">User Profile Management</h3>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={profileData.contactInfo}
              onChange={handleProfileChange}
              className="mt-1 p-2 border w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Emergency Details</label>
            <input
              type="text"
              name="emergencyDetails"
              value={profileData.emergencyDetails}
              onChange={handleProfileChange}
              className="mt-1 p-2 border w-full rounded"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;