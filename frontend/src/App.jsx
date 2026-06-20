import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://ai-research-assistant-37l3.onrender.com/upload",
        formData
      );

      const newDoc = {
        filename: response.data.filename,
        summary: response.data.summary,
        time: "Analyzed just now",
      };

      setDocuments((prev) => [newDoc, ...prev]);

      setFile(null);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* Sidebar */}

      <div className="sidebar">
        <div className="logo">
          <div className="logo-icon">🤖</div>
          <h2>AI Research Assistant</h2>
        </div>

        <div className="profile">
          <h3>Sakti Sankar</h3>
          <p>@shaktlenka</p>
        </div>

        <button
          className="upload-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <br />

        <div className="history">
          <h3>📂 History</h3>

          {documents.length === 0 ? (
            <p>No documents uploaded</p>
          ) : (
            documents.map((doc, index) => (
              <div
                key={index}
                className="history-item"
                title={doc.filename}
              >
                📄 {doc.filename}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main */}

      <div className="main">
        <div className="welcome">
          <h1>👋 Welcome Back, Sakti</h1>

          <p>
            Analyze documents and extract AI-powered
            insights.
          </p>
        </div>

        {/* Upload Area */}

        <div className="upload-box">
          <h2>⬆</h2>

          <h3>Drag & Drop Documents Here</h3>

          <p>
            Drag & Drop or Browse Files
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          {file && (
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              📄 {file.name}
            </p>
          )}

          <button
            className="upload-btn"
            onClick={handleUpload}
          >
            Upload & Analyze
          </button>
        </div>

        {/* Summary Cards */}

        {documents.map((doc, index) => (
          <div
            key={index}
            className="summary-card"
          >
            <h3>📄 {doc.filename}</h3>

            <h4>✨ AI Insights</h4>

            <p>{doc.summary}</p>

            <div className="time">
              ✓ {doc.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;