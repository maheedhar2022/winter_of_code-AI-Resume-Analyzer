from fastapi import FastAPI

app = FastAPI(title="AI Resume Analyzer")

@app.get("/")
def root():
    return {"status": "AI Resume Analyzer backend is running"}
