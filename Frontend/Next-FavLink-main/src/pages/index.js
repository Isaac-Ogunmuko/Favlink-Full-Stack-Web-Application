import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [favLinks, setFavLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/favlinks")
      .then((res) => res.json())
      .then((data) => setFavLinks(data))
      .catch((err) => console.error("Error fetching links:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/favlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, URL: url }),
      });

      if (response.ok) {
        setName("");
        setUrl("");
        const res = await fetch("http://localhost:5000/favlinks");
        const data = await res.json();
        setFavLinks(data);
      }
    } catch (err) {
      console.error("Error adding link:", err);
    }
  };

  const handleDelete = async (linkName) => {
    try {
      const response = await fetch("http://localhost:5000/favlink", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: linkName }),
      });

      if (response.ok) {
        const data = await response.json();
        setFavLinks(data);
      }
    } catch (err) {
      console.error("Error deleting link:", err);
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Head>
        <title>My FavLinks Dashboard</title>
      </Head>

      <main style={{ maxWidth: "800px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <h1 style={{ color: "#111827", marginBottom: "8px" }}>My Favorite Links</h1>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>Manage and organize your go-to web links below.</p>

        {/* Custom Styled Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr style={{ backgroundColor: "#4f46e5", color: "white", textAlign: "left" }}>
              <th style={{ padding: "12px 16px", borderTopLeftRadius: "8px" }}>Name</th>
              <th style={{ padding: "12px 16px" }}>URL</th>
              <th style={{ padding: "12px 16px", borderTopRightRadius: "8px", textAlign: "center" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {favLinks.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", padding: "20px", color: "#9ca3af" }}>
                  No links added yet.
                </td>
              </tr>
            ) : (
              favLinks.map((link, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "12px 16px", fontWeight: "600", color: "#1f2937" }}>{link.name}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <a 
                      href={link.URL} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ color: "#4f46e5", textDecoration: "underline" }}
                    >
                      {link.URL}
                    </a>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <button 
                      onClick={() => handleDelete(link.name)}
                      style={{ 
                        padding: "6px 12px", 
                        backgroundColor: "#ef4444", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "6px", 
                        cursor: "pointer",
                        fontWeight: "600"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Add New Section */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px" }}>
          <h2 style={{ color: "#111827", fontSize: "20px", marginBottom: "16px" }}>Add New Link</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>Name</label>
              <input 
                type="text" 
                placeholder="e.g. GitHub" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "6px" }}>URL</label>
              <input 
                type="text" 
                placeholder="e.g. https://github.com" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                padding: "12px", 
                backgroundColor: "#4f46e5", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                fontWeight: "600", 
                cursor: "pointer",
                marginTop: "4px"
              }}
            >
              Add Link
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}