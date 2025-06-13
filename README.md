
# 🩺✨ Dr.Aarogya AI — Next-Gen AI Health Advisor  

An intelligent, AI-powered health advisory platform that predicts potential disease risks, offers AI-generated health recommendations, monitors real-time air quality, and interacts through a voice-enabled chatbot — all inside a beautifully animated, modern dashboard.

## 📸 Demo Preview:
🚀 **Coming Soon:** Animated screenshots & live demo link

## 📊 Key Features:

- 🧠 **Multi-Disease AI Prediction**
  - Diabetes, Heart Disease, Liver Disease, Kidney Risk predictions via trained ML models.

- 💬 **AI Symptom Checker Chatbot**
  - Conversational AI (BERT-based) to interpret user symptoms and suggest possible issues or next steps.

- 📊 **Health Dashboard**
  - Interactive cards & live data charts for risk analysis, personal health trends, and prediction history.

- 🌤️ **Real-time AQI & Weather Health Alerts**
  - Displays local AQI, temperature, and AI-generated recommendations based on environmental health data.

- 🎙️ **Voice-Enabled Interaction**
  - React Speech Recognition integration for symptom checks and health queries.

- 🎨 **Animated Modern UI**
  - Built with React, Tailwind CSS, Lottie animations, and Chart.js for an engaging, clean health app experience.

## 🛠️ Tech Stack:

| Layer          | Tech                                                            | Description                                  |
|:---------------|:----------------------------------------------------------------|:---------------------------------------------|
| **Backend**    | FastAPI, Scikit-learn, Pandas, SQLite                           | AI API server with health prediction models  |
| **Frontend**   | React.js, Tailwind CSS, Axios, Chart.js                         | Interactive web dashboard & form             |
| **ML Models**  | RandomForestClassifier, Logistic Regression, BERT (for chatbot) | Disease risk prediction and symptom analysis |
| **APIs**       | OpenWeatherMap, AQICN, NewsAPI                                  | For environmental health data and news       |
| **Voice Input**| React Speech Recognition                                        | Voice-based symptom input                    |
| **Animations** | LottieFiles, Framer Motion                                      | Smooth animations and transitions            |

## 📦 Project Structure:

```
Dr.Aarogya AI/
├── backend/
│   ├── main.py
│   ├── ai_models/
│   │   └── disease_model.pkl
│   └── models/
│       ├── train_model.py
│       └── diabetes_data.csv
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RiskForm.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started:

### 🔧 Backend Setup:
```bash
cd backend
uvicorn main:app --reload
```

### 🎨 Frontend Setup:
```bash
cd frontend
npm install
npm start
```

## 📌 Future Upgrades:
- 📝 Doctor appointment booking integration  
- 📈 SHAP/Lime explainability for model predictions  
- 📦 Deployable PWA (Progressive Web App) version  
- 📱 Android/iOS App with React Native

Contributions, ideas, and suggestions are always welcome!  
Feel free to check the [issues page](https://github.com/StrimCoder/Dr.Aarogya Ai/issues) or submit a pull request.

## 👨‍⚕️ Created By:
**Bhushan Navsagar** ✨  
_AI/ML Developer & HealthTech Innovator_
[GitHub](https://github.com/StrimCoder) | [LinkedIn](https://www.linkedin.com/in/bhushan-navsagar-2b683a293/)

## 📌 License:
MIT License | Free to use, modify and upgrade.

## 🔥 Pro Tip:
**Dr.Aarogya AI** isn’t just a health app — it’s your personal AI-powered digital health advisor built for next-gen healthcare solutions 🚀
