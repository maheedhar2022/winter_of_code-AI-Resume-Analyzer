import json
import re

def extract_skills(text):
    text = text.lower()

    with open("backend/skills.json", "r") as f:
        skills = json.load(f)

    found_skills = set()

    for skill in skills:
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, text):
            found_skills.add(skill)

    return sorted(found_skills)
