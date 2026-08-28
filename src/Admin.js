export default function Admin() {
  return (
    <div
      style={{
        background: "#060912",
        color: "white",
        minHeight: "100vh",
        padding: "2rem"
      }}
    >
      <h1>Admin Dashboard</h1>

      <h2>Clients</h2>

      <ul>
        <li>Kashish Makeup Studio</li>
        <li>Vijaya Pharma</li>
        <li>Kangaroo Education</li>
      </ul>

      <h2>Inbox</h2>

      <div>
        No messages yet.
      </div>
    </div>
  );
}