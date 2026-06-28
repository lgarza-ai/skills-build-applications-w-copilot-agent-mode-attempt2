import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <span className="badge bg-primary-subtle text-primary-emphasis mb-3">OctoFit Tracker</span>
          <h1 className="display-5 fw-bold">Modern fitness tracking for ambitious teams</h1>
          <p className="lead text-muted">
            Monitor workouts, leaderboards, and progress from a connected multi-tier application.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
              API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
              Frontend
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Application stack</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">React 19 + Vite on port 5173</li>
                <li className="list-group-item">Express + TypeScript on port 8000</li>
                <li className="list-group-item">MongoDB + Mongoose on port 27017</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
