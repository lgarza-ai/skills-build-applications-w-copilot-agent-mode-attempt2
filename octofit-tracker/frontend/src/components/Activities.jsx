import { useEffect, useState } from 'react';

function Activities() {
  const activitiesApiUrl = 'https://psychic-orbit-97vj56jpqrvx39r59-8000.app.github.dev/api/activities';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(activitiesApiUrl);
        if (!response.ok) throw new Error('Unable to load activities');
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <ul className="list-group">
        {items.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id}>
            <strong>{activity.type}</strong> — {activity.durationMinutes} min, {activity.calories} cal
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
