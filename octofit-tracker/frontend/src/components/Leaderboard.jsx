import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiUrl('/api/leaderboard/'));
        if (!response.ok) throw new Error('Unable to load leaderboard');
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <ul className="list-group">
        {items.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id}>
            <strong>#{entry.rank}</strong> {entry.username} — {entry.score} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
