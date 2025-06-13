from fastapi import APIRouter
from pydantic import BaseModel
import random

# In a real implementation, you would import your ML model here
# import tensorflow as tf
# from transformers import AutoModelForCausalLM, AutoTokenizer

router = APIRouter()

class ChatInput(BaseModel):
    message: str

# Simple response templates for demonstration
GREETING_TEMPLATES = [
    "Hello! How can I help with your health concerns today?",
    "Hi there! I'm here to assist with any health questions you might have.",
    "Welcome! How are you feeling today?"
]

SYMPTOM_TEMPLATES = {
    "headache": "Headaches can be caused by various factors including stress, dehydration, or eye strain. If it's severe or persistent, you should consult a doctor.",
    "fever": "Fever is often a sign that your body is fighting an infection. Rest, stay hydrated, and take over-the-counter fever reducers if needed. Consult a doctor if it persists over 3 days or exceeds 103°F (39.4°C).",
    "cough": "A cough could be due to a cold, allergies, or other respiratory conditions. Stay hydrated and consider honey for soothing. If it persists for more than a week, consult a healthcare provider.",
    "pain": "Pain can have many causes. Could you describe where you're experiencing pain and its intensity?",
    "tired": "Fatigue can result from poor sleep, stress, or certain medical conditions. Ensure you're getting enough rest and maintaining a balanced diet.",
    "dizzy": "Dizziness might be caused by dehydration, low blood sugar, or inner ear issues. Try sitting down and drinking water. If it persists, seek medical advice."
}

FALLBACK_RESPONSES = [
    "I understand you're concerned about your health. Could you provide more details about your symptoms?",
    "I'm here to help with health-related questions. Can you tell me more about what you're experiencing?",
    "To better assist you, could you describe your symptoms in more detail?",
    "I'm still learning, but I'd like to help. Could you rephrase your question about your health concern?"
]

@router.post("/chat")
async def chat(data: ChatInput):
    user_message = data.message.lower()
    
    # In a real implementation, you would use your ML model here
    # model_response = get_model_response(user_message)
    
    # Simple rule-based responses for demonstration
    if any(greeting in user_message for greeting in ["hello", "hi", "hey", "greetings"]):
        response = random.choice(GREETING_TEMPLATES)
    else:
        # Check for symptoms in the message
        found_symptom = False
        for symptom, response_text in SYMPTOM_TEMPLATES.items():
            if symptom in user_message:
                response = response_text
                found_symptom = True
                break
        
        if not found_symptom:
            response = random.choice(FALLBACK_RESPONSES)
    
    return {"response": response}

# In a real implementation, you would use your ML model like this:
# def get_model_response(message):
#     # Preprocess the input
#     inputs = tokenizer(message, return_tensors="pt")
#     
#     # Generate a response
#     outputs = model.generate(inputs["input_ids"], max_length=100)
#     response = tokenizer.decode(outputs[0], skip_special_tokens=True)
#     
#     return response