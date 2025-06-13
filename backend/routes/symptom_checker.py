from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class SymptomInput(BaseModel):
    symptoms: str

@router.post("/symptom-check")
def check_symptoms(data: SymptomInput):
    symptom = data.symptoms.lower()

    possible_issues = {
        "fever": "Possible Flu or Infection. Stay hydrated.",
        "headache": "Possible Stress or Migraine. Try relaxation exercises.",
        "cough": "Could be Cold or Allergies. Rest recommended.",
        "chest pain": "Urgent: Possible heart issue. Consult a doctor immediately."
    }

    for key in possible_issues:
        if key in symptom:
            return {"issue": possible_issues[key]}

    return {"issue": "Unable to detect. Please consult a doctor."}
