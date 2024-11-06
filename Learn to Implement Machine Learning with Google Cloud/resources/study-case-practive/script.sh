#!/bin/bash

# Base URL from the GitHub release
BASE_URL="https://github.com/dicodingacademy/a658-machine-learning-googlecloud/releases/tag/serta-mulia-model"

# Name of the model JSON file
MODEL_JSON="model.json"

# Create the models directory if it doesn't exist
mkdir -p ./models

# Loop to download all the shard files
for i in {1..4}; do
    FILE_NAME="group1-shard${i}of4.bin"
    
    # Download each shard file
    echo "Downloading ${FILE_NAME}..."
    curl -L -o ./models/${FILE_NAME} ${BASE_URL}/${FILE_NAME}
    
    # If the download fails, exit the loop
    if [ $? -ne 0 ]; then
        echo "Failed to download ${FILE_NAME}. Exiting..."
        exit 1
    fi
done

# Download the model.json file
echo "Downloading ${MODEL_JSON}..."
curl -L -o ./models/${MODEL_JSON} ${BASE_URL}/${MODEL_JSON}

# Check if model.json download was successful
if [ $? -ne 0 ]; then
    echo "Failed to download ${MODEL_JSON}. Exiting..."
    exit 1
fi

echo "All files downloaded successfully and saved to ./models."