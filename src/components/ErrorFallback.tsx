export default function ErrorFallback({ error }: { error: Error }) {
    return (
      <div>
        <div className="card text-white border-primary m-2 p-2">
        <h1>Achtung! Fehler: </h1>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
      </div>
      
    );
  }
  