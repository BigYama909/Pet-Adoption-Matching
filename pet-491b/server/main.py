import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import OneHotEncoder
import pickle

# Define dog and cat breeds
dog_breeds = ['French Bulldog', 'Labrador Retriever', 'Golden Retriever', 'German Shepherd', 'Bulldog', 'Poodle', 'Siberian Husky', 'Yorkshire Terrier']
cat_breeds = ['Domestic Shorthair', 'Siamese', 'Maine Coon', 'Ragdoll', 'Bengal', 'Persian', 'Abyssinian', 'Sphinx']

# Example synthetic data
data = {
    'user_id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'pet_id': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    'user_preference_type': ['dog', 'dog', 'cat', 'cat', 'dog', 'cat', 'dog', 'dog', 'cat', 'cat'],
    'pet_type': ['dog', 'cat', 'cat', 'dog', 'dog', 'cat', 'dog', 'cat', 'cat', 'dog'],
    'user_preference_size': ['large', 'small', 'medium', 'large', 'medium', 'small', 'large', 'medium', 'small', 'large'],
    'pet_size': ['large', 'medium', 'medium', 'small', 'medium', 'small', 'large', 'medium', 'small', 'large'],
    'user_preference_breed': ['Poodle', 'Sphinx', 'Maine Coon', 'German Shepherd', 'Yorkshire Terrier', 'Persian', 'Labrador Retriever', 'French Bulldog', 'Siamese', 'Domestic Shorthair'],
    'pet_breed': ['Poodle', 'Siamese', 'Maine Coon', 'Yorkshire Terrier', 'French Bulldog', 'Persian', 'Labrador Retriever', 'Sphinx', 'Ragdoll', 'Golden Retriever'],
    'match': [1, 0, 1, 0, 1, 1, 1, 0, 1, 1]  # 1 means a good match, 0 means not a good match
}

df = pd.DataFrame(data)

# Initialize OneHotEncoder
encoder = OneHotEncoder(sparse_output=False)  # Use sparse_output=False to get a dense array directly

# Fit and transform the encoder on the data
full_encoded_data = encoder.fit_transform(df[['user_preference_type', 'pet_type', 'user_preference_size', 'pet_size', 'user_preference_breed', 'pet_breed']])
encoded_feature_names = encoder.get_feature_names_out()

# Create a new DataFrame from the encoded data
encoded_df = pd.DataFrame(full_encoded_data, columns=encoded_feature_names)

# Append encoded data to the original DataFrame
df = pd.concat([df, encoded_df], axis=1)

# Drop original categorical columns and identifiers before modeling
X = df.drop(columns=['user_id', 'pet_id', 'match', 'user_preference_type', 'pet_type', 'user_preference_size', 'pet_size', 'user_preference_breed', 'pet_breed'])
y = df['match']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the RandomForest classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')

# Save the trained model to a file
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)

# Save the OneHotEncoder to a file
with open('encoder.pkl', 'wb') as file:
    pickle.dump(encoder, file)