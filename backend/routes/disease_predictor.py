from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import numpy as np
import os

router = APIRouter()

# Define model path
current_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(current_dir, 'models', 'disease_model.pkl')

# Load trained model if it exists
try:
    model = joblib.load(model_path)
except:
    model = None

class RiskInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int

@router.post("/predict-risk")
def predict_disease(data: RiskInput):
    if model is None:
        return {"error": "Model not loaded. Please train the model first."}
        
    input_data = np.array([[data.Pregnancies, data.Glucose, data.BloodPressure, data.SkinThickness, 
                            data.Insulin, data.BMI, data.DiabetesPedigreeFunction, data.Age]])
    
    prediction = model.predict(input_data)[0]

    result = "High Risk: Consult doctor immediately." if prediction == 1 else "Low Risk: Keep maintaining a healthy lifestyle."
    return {"prediction": result}