from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the model
model = pickle.load(open('model.pkl', 'rb'))


@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data sent to the API
    data = request.get_json(force=True)

    # Convert data into the format expected by the model (ensure correct feature order and encoding)
    # This step may involve one-hot encoding of categorical data as done during model training
    # For simplicity, assuming numeric input for prediction:
    features = np.array(data['features']).reshape(1, -1)

    # Make prediction
    prediction = model.predict(features)

    # Return prediction
    return jsonify({'prediction': int(prediction[0])})


if __name__ == '__main__':
    app.run(debug=True)
