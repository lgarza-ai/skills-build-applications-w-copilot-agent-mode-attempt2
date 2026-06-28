import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) throw new Error('Unable to load teams');
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <ul className="list-group">
        {items.map((team) => (
          <li className="list-group-item" key={team._id || team.id}>
            <strong>{team.name}</strong> — {team.focus} ({team.members?.length || team.members || 0} members)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
