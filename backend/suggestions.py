def generate_suggestions(match_score, missing_skills):
    suggestions = []

    if match_score < 30:
        suggestions.append(
            "Your resume has low alignment with the job description. Consider tailoring it to the role."
        )
    elif match_score < 60:
        suggestions.append(
            "Your resume moderately matches the job description. Adding missing skills can improve the score."
        )
    else:
        suggestions.append(
            "Your resume strongly matches the job description. Minor improvements can make it even better."
        )

    if missing_skills:
        suggestions.append(
            "Consider adding or highlighting these skills: " + ", ".join(missing_skills)
        )

    suggestions.append(
        "Ensure your resume clearly lists technical skills, projects, and relevant experience."
    )

    return suggestions
