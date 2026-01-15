import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Please upload a resume and paste job description");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex justify-center items-start pt-24 px-6 py-12">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full p-8 text-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-center text-white">
          AI Resume Analyzer
        </h1>
        <p className="text-gray-300 text-center mt-2 mb-6 text-sm">
          Analyze your resume against a job description using ML
        </p>

        <div className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            className="w-full text-sm bg-slate-800 rounded p-2"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <textarea
            rows="5"
            placeholder="Paste the job description (skills, responsibilities, requirements)..."
            className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 rounded-lg p-3 font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {result && (
          <div className="mt-8 space-y-4">
            <h2
              className={`text-xl font-semibold ${
                result.match_score < 30
                  ? "text-red-400"
                  : result.match_score < 60
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              Match Score: {result.match_score}%
            </h2>

            <div className="w-full bg-white/10 rounded-full h-3 mt-2">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  result.match_score < 30
                  ? "bg-red-500"
                  : result.match_score < 60
                  ? "bg-yellow-500"
                  : "bg-green-500"
                }`}
             style={{ width: `${result.match_score}%` }}
          ></div>
        </div>



          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-gray-100">Matched Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.matched_skills.map((s) => (
                  <span
                     className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            </div>

          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-gray-100">Missing Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.missing_skills.map((s) => (
                  <span
                    
                    className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            </div>

          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold mb-2 text-gray-100">Suggestions</h3>
              <ul className="list-disc list-inside text-gray-300">
                {result.suggestions.map((s, i) => (
                  <li className="leading-loose text-gray-300">
                    <span className="text-indigo-400 mr-2">→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>
        )}

        <p className="text-xs text-gray-400 tracking-wide text-center mt-6">
          Built using NLP and Machine Learning (TF-IDF + Cosine Similarity)
        </p>

      </div>
    </div>
  );
}

export default App;
