const JournalEntry = ({ entry }) => {
  const formattedDate = new Date(entry.timestamp.seconds * 1000).toLocaleString();

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #333", // Dark border for subtle contrast
        borderRadius: "5px",
        background: "#000", // Black background
        color: "#fff", // White text
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", // Slight shadow for depth
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#00FF00" }}>AI Reflection</h3>
      <p style={{ fontStyle: "italic" }}>{entry.response}</p>
      <p style={{ fontSize: "12px", color: "#999" }}>Logged on: {formattedDate}</p>
    </div>
  );
};

export default JournalEntry;
