from flask import Flask, render_template, request
import pandas as pd
import joblib
from datetime import datetime, timedelta

app = Flask(__name__)

# Load model and encoders
model = joblib.load("model.pkl")
train_encoder = joblib.load("train_no_encoder.pkl")
class_encoder = joblib.load("class_encoder.pkl")
status_encoder = joblib.load("status_encoder.pkl")

# Load route data
df = pd.read_csv("train_data.csv")
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

def get_train_route(row):
    route = [row['source'].strip().upper()]
    if pd.notna(row['intermideate']):
        intermediate = [st.strip().upper() for st in row['intermideate'].split(',')]
        route.extend(intermediate)
    route.append(row['destination'].strip().upper())
    return route

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        train_no = request.form['train_no'].strip()
        class_ = request.form['class'].strip()
        source = request.form['source'].strip().upper()
        destination = request.form['destination'].strip().upper()
        avl = 0;
        wl = int(request.form['wl'])
        booking_date = datetime.today().date()
        journey_date = datetime.strptime(request.form['travel_date'], "%Y-%m-%d").date()


        # Validate train number
        rows = df[df['Train no'].astype(str) == train_no]
        if rows.empty:
            return render_template('result.html', prediction="Train not found.")

        # Get and validate train route
        route = get_train_route(rows.iloc[0])
        if source not in route or destination not in route:
            return render_template('result.html', prediction="Source or destination not on train route.")
        if route.index(source) >= route.index(destination):
            return render_template('result.html', prediction="Source must be before destination.")

        # Encode inputs
        train_encoded = train_encoder.transform([train_no])[0]
        class_encoded = class_encoder.transform([class_])[0]

        # Predict for current and next 4 days
        predictions = []
        for i in range(5):
            travel_date_i = journey_date + timedelta(days=i)
            gap = (travel_date_i - booking_date).days
            input_df = pd.DataFrame([[
                train_encoded,
                class_encoded,
                avl,
                wl,
                gap
            ]], columns=['train_no', 'class', 'avl', 'wl', 'days_gap'])

            probs = model.predict_proba(input_df)[0]
            confirm_idx = list(status_encoder.classes_).index('confirmed')
            percent = round(probs[confirm_idx] * 100, 2)

            predictions.append({
                "date": travel_date_i.strftime("%Y-%m-%d"),
                "percent": percent
            })

        return render_template('result.html', predictions=predictions)

    except Exception as e:
        return render_template('result.html', prediction=f"❌ Error: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)
