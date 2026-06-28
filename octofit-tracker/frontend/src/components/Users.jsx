import { useEffect, useState } from 'react';

function Users() {
  const usersApiUrl = 'https://psychic-orbit-97vj56jpqrvx39r59-8000.app.github.dev/api/users';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(usersApiUrl);
        if (!response.ok) throw new Error('Unable to load users');
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <ul className="list-group">
        {items.map((user) => (
          <li className="list-group-item" key={user._id || user.id}>
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
