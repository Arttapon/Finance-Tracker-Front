// front/src/App.jsx

import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/appRouter";

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <p className="text-4xl text-primary">Loading..</p>
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;


