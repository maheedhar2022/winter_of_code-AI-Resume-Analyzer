import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setScore(data.match_score);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px" }}>
      <h1>AI Resume Analyzer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <textarea
        rows="6"
        placeholder="Paste job description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        style={{ width: "100%" }}
      />

      <br /><br />

      <button onClick={handleAnalyze}>Analyze</button>

      {score !== null && (
        <h2 style={{ marginTop: "20px" }}>
          Match Score: {score}%
        </h2>
      )}
    </div>
  );
}

export default App;
