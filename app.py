from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import symptom_checker, disease_predictor, chat

app = FastAPI(
    title="Dr.Aarogya AI Health Advisor",
    description="AI-powered personal health companion API.",
    version="1.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Dr.Aarogya AI Health Advisor API"}

# Include routers
app.include_router(symptom_checker.router)
app.include_router(disease_predictor.router)
app.include_router(chat.router)