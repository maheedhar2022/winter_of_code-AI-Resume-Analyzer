import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);

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
    setResult(data);
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

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Match Score: {result.match_score}%</h2>

          <h3>Matched Skills</h3>
          <ul>
            {result.matched_skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3>Missing Skills</h3>
          <ul>
            {result.missing_skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
