import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Define paths
current_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(current_dir, 'diabetes_data.csv')

# Load Data
data = pd.read_csv(csv_path)

X = data.drop('Outcome', axis=1)
y = data['Outcome']

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# RandomForest Model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Create directory if it doesn't exist
os.makedirs(os.path.join(current_dir), exist_ok=True)

# Save Model
model_path = os.path.join(current_dir, 'disease_model.pkl')
joblib.dump(model, model_path)

print(f"✅ Model trained & saved successfully to {model_path}")