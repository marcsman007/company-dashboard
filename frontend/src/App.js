import React, { useEffect, useState } from 'react';
import { getUsers, createUser, deleteUser, updateUser } from './services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, Typography, Box, Card, CardContent
} from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('employee');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await createUser({ name, email, role });
      setMessage('User added successfully!');
      setError('');
      setName('');
      setEmail('');
      setRole('employee');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setMessage('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMessage('User deleted successfully!');
      setError('');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete');
      setMessage('');
    }
  };

  const startEdit = (user) => {
    setEditId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setMessage('');
    setError('');
  };

  const cancelEdit = () => setEditId(null);

  const saveEdit = async () => {
    try {
      await updateUser(editId, { name: editName, email: editEmail, role: editRole });
      setMessage('User updated successfully!');
      setError('');
      setEditId(null);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update');
      setMessage('');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key].toLowerCase();
    const bValue = b[sortConfig.key].toLowerCase();
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center">Company Dashboard</Typography>

      {/* Dashboard Cards */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        marginBottom: 3
      }}>
        <Card sx={{ minWidth: 150, flex: '1 1 150px', backgroundColor: '#1976d2', color: 'white' }}>
          <CardContent>
            <Typography>Total Users</Typography>
            <Typography variant="h5">{users.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, flex: '1 1 150px', backgroundColor: '#388e3c', color: 'white' }}>
          <CardContent>
            <Typography>Employees</Typography>
            <Typography variant="h5">{users.filter(u => u.role === 'employee').length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, flex: '1 1 150px', backgroundColor: '#fbc02d', color: 'white' }}>
          <CardContent>
            <Typography>Managers</Typography>
            <Typography variant="h5">{users.filter(u => u.role === 'manager').length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 150, flex: '1 1 150px', backgroundColor: '#d32f2f', color: 'white' }}>
          <CardContent>
            <Typography>Admins</Typography>
            <Typography variant="h5">{users.filter(u => u.role === 'admin').length}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10, justifyContent: 'center' }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ flex: '1 1 200px' }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ flex: '1 1 200px' }}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)} sx={{ flex: '1 1 150px' }}>
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <Button variant="contained" color="primary" type="submit" sx={{ flex: '1 1 100px' }}>Add User</Button>
      </form>

      {/* Search */}
      <TextField
        label="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      {/* Messages */}
      {message && <Typography color="success.main" sx={{ marginBottom: 1 }}>{message}</Typography>}
      {error && <Typography color="error.main" sx={{ marginBottom: 1 }}>{error}</Typography>}

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </TableCell>
              <TableCell onClick={() => requestSort('email')} style={{ cursor: 'pointer' }}>
                Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </TableCell>
              <TableCell onClick={() => requestSort('role')} style={{ cursor: 'pointer' }}>
                Role {sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map(user => (
              <TableRow key={user._id} sx={{ backgroundColor: editId === user._id ? '#e3f2fd' : 'transparent' }}>
                <TableCell>
                  {editId === user._id ? <TextField value={editName} onChange={(e) => setEditName(e.target.value)} /> : user.name}
                </TableCell>
                <TableCell>
                  {editId === user._id ? <TextField value={editEmail} onChange={(e) => setEditEmail(e.target.value)} /> : user.email}
                </TableCell>
                <TableCell>
                  {editId === user._id ? (
                    <Select value={editRole} onChange={(e) => setEditRole(e.target.value)}>
                      <MenuItem value="employee">Employee</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editId === user._id ? (
                    <>
                      <Button color="primary" onClick={saveEdit}>Save</Button>
                      <Button color="inherit" onClick={cancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
                      <Button color="primary" onClick={() => startEdit(user)}>Edit</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
