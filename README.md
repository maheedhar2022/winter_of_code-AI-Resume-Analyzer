📄 AI Resume Analyzer

- AI Resume Analyzer is a web-based application that uses Machine Learning and Natural Language Processing (NLP) to evaluate how well a resume matches a given job description. It provides an explainable match score, highlights matched and missing skills, and gives actionable suggestions to improve the resume.

🔍 Problem Statement

- Recruiters often receive hundreds of resumes for a single job role, making manual screening inefficient and time-consuming. On the other hand, candidates rarely receive clear feedback on why their resume was rejected.

- There is a need for an automated system that:

- Evaluates resume–job relevance

- Explains the matching score

- Identifies skill gaps clearly

💡 Solution

- AI Resume Analyzer solves this problem by:

- Comparing resume content with a job description

- Generating a match score (0–100%)

- Extracting and comparing skills

- Providing human-readable improvement suggestions

- The system prioritizes explainability over black-box predictions.

✨ Key Features

- Upload resume in PDF format

- Paste any job description

- ML-based resume–job matching score

- Matched and missing skills analysis

- Clear improvement suggestions

- Clean, modern, and readable UI

🧠 Machine Learning Approach

- The application uses classical NLP techniques for transparency and reliability:

- Resume Parsing

- Resume PDFs are converted into plain text using pdfplumber.

- Text Preprocessing

- Resume text and job description are cleaned and normalized.

- Vectorization

- TF-IDF (Term Frequency–Inverse Document Frequency) is used to convert text into numerical vectors.

- Similarity Measurement

- Cosine Similarity computes how closely the resume matches the job description.

- Skill Extraction

- A predefined skill list is matched against both texts using keyword-based NLP.

- Gap Analysis

- Matched skills and missing skills are identified.

- Suggestions are generated based on score and missing skills.

🏗️ System Architecture
- User (React Frontend)
        |
        |  Resume PDF + Job Description
        v
- FastAPI Backend
        |
        |-- Resume Parsing (PDF → Text)
        |-- TF-IDF Vectorization
        |-- Cosine Similarity
        |-- Skill Extraction
        |
        v
- JSON Response
(Match Score + Skills + Suggestions)

⚙️ Tech Stack
- Frontend

- React.js

- Tailwind CSS (via CDN)

- Backend

- FastAPI (Python)

- Machine Learning / NLP

- scikit-learn

- TF-IDF Vectorization

- Cosine Similarity

- Keyword-based Skill Extraction

🚀 How to Run Locally

- Backend Setup
- python -m venv venv
- source venv/bin/activate      # Windows: venv\Scripts\activate
- pip install -r requirements.txt
- python -m uvicorn backend.main:app --reload


- Backend runs at:

- http://127.0.0.1:8000

- Frontend Setup
- cd frontend
- npm install
- npm start


- Frontend runs at:

- http://localhost:3000
