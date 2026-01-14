from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from backend.resume_parser import extract_text_from_pdf
from backend.matcher import calculate_match_score

app = FastAPI(title="AI Resume Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "AI Resume Analyzer backend is running"}

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...),job_description: str = Form(...)):
    resume_text = extract_text_from_pdf(file.file)
    score = calculate_match_score(resume_text,job_description)
    return {
        "match_score": score
    }
