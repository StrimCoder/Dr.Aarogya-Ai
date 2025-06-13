
# 🩺✨ Dr.Aarogya AI — Next-Gen AI Health Advisor  

An intelligent, AI-powered health advisory platform that predicts potential disease risks, offers AI-generated health recommendations, monitors real-time air quality, and interacts through a voice-enabled chatbot — all inside a beautifully animated, modern dashboard.

## 📸 Demo Preview:

![Screenshot 2025-06-13 092137](https://github.com/user-attachments/assets/0a080210-b1e7-4c3b-99e8-88a6a72dc620)

![Screenshot 2025-06-13 092241](https://github.com/user-attachments/assets/52cbb95a-dbe8-4983-87f7-ac65133a7458)

![Screenshot 2025-06-13 092309](https://github.com/user-attachments/assets/935c3811-a602-4d42-8c60-31491a45aedd)

![Screenshot 2025-06-13 092411](https://github.com/user-attachments/assets/b88a9f17-fe0a-4429-93c3-3fa9c02d2e0c)

![Screenshot 2025-06-13 092427](https://github.com/user-attachments/assets/52e19b20-3dfb-4b39-bfff-7fe239e6391b)

![Screenshot 2025-06-13 092437](https://github.com/user-attachments/assets/3dc4cc53-b6b8-4cef-abcf-4ee3acbdac22)

![Screenshot 2025-06-13 092447](https://github.com/user-attachments/assets/6d2bcf65-2308-47c9-8c1b-ce5ac344b7ac)

![Screenshot 2025-06-13 092457](https://github.com/user-attachments/assets/bace1c38-04b2-4737-9a23-4eeceb13d467)

![Screenshot 2025-06-13 092505](https://github.com/user-attachments/assets/aa2b9d12-7066-47b6-9c16-2f36c7fa6b40)

![Screenshot 2025-06-13 092319](https://github.com/user-attachments/assets/61915f08-179a-417d-b7f1-48d481878375)

![Screenshot 2025-06-13 092327](https://github.com/user-attachments/assets/b78c9ca7-5a81-4531-a695-872d605b684b)

![Screenshot 2025-06-13 092337](https://github.com/user-attachments/assets/e9df7d15-1892-4384-9f03-042503063d58)

![Screenshot 2025-06-13 092347](https://github.com/user-attachments/assets/78e98352-c3e5-46a9-90bd-37deaacfb197)

![Screenshot 2025-06-13 092354](https://github.com/user-attachments/assets/a2f72567-b74d-4d16-82a4-1fbfbc43d10b)

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


## 🙌 Contribution:
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
