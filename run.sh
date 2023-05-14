#!/bin/bash

# Open the first folder
cd ./server_LLM/

# Run the Python script
python3 t.py &

# Go back to the main folder
cd ..

# Open the second folder
cd ./server/

# Start the Node.js server
npm run start &

# Go back to the main folder
cd ..

# Open the third folder
cd ./client/

# Start the development server
npm run dev &

