import { useEffect, useState } from 'react';

function Workouts() {
  const workoutsApiUrl = 'https://psychic-orbit-97vj56jpqrvx39r59-8000.app.github.dev/api/workouts';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(workoutsApiUrl);
        if (!response.ok) throw new Error('Unable to load workouts');
        const data = await response.json();
        setItems(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <ul className="list-group">
        {items.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id}>
            <strong>{workout.title}</strong> — {workout.durationMinutes} min, {workout.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
