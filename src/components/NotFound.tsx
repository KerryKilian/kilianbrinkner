function NotFound() {
  return (
    <div className="page">
      <h1>Diese Seite konnte nicht gefunden werden.</h1>
      <h2>Wieso?</h2>
      <p>{"Wenn du Pfade manuell in die Leiste eingibst, kann Netlify damit nicht umgehen. Deshalb musst du das Clientseitige Routing innerhalb der Anwendung nutzen." + 
        "Sooorry :("}
      </p>
    </div>
  );
}

export default NotFound;