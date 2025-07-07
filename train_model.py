import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv("train_data.csv")

# Clean column names and string entries
df.columns = df.columns.str.strip()
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
 
# Rename necessary columns
df.rename(columns={
    'Train no': 'train_no',
    'category': 'class',
    'status': 'status'
}, inplace=True)

# Ensure all required columns exist
required_cols = ['train_no', 'source', 'destination', 'intermideate', 'class', 'avl', 'wl', 'booking_date', 'journey_date', 'status']
missing = set(required_cols) - set(df.columns)
if missing:
    raise ValueError(f"Missing required columns: {missing}")

# Converting train no to string
df['train_no'] = df['train_no'].astype(str)

# Converting date columns
df['booking_date'] = pd.to_datetime(df['booking_date'])
df['journey_date'] = pd.to_datetime(df['journey_date'])

# Calculating gap in days
df['days_gap'] = (df['journey_date'] - df['booking_date']).dt.days

# Drop columns which are not used in model
df.drop(['booking_date', 'journey_date', 'intermideate', 'source', 'destination'], axis=1, inplace=True)

# Encoding categorical columns
label_encoders = {}
for col in ['train_no', 'class', 'status']:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Splitting data into features and target
X = df[['train_no', 'class', 'avl', 'wl', 'days_gap']]
y = df['status']

# Train or test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
joblib.dump(model, 'model.pkl')
joblib.dump(label_encoders['train_no'], 'train_no_encoder.pkl')
joblib.dump(label_encoders['class'], 'class_encoder.pkl')
joblib.dump(label_encoders['status'], 'status_encoder.pkl')

print("Model and encoders saved.")
