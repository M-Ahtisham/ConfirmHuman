# THis is for testing only, its an easy way to launch the project

# How to run it:
# make sure you have permision to execute this script
# in the root directory of the repository run this
# chmod +x ./script.sh
# then you can run this script by ./script.sh

# if it doesn't work let me know and check the README.md on how to run it

# A function that starts the backend
start_backend() {
    echo "[1/7] Changing to backend directory..."
    cd chatbot-backend/socrates || { echo "Backend server directory not found"; exit 1; } # this is the fall back if the direcotry isnt found

    echo "[2/7] Initializing npm project..."
    npm init -y

    echo "[3/7] Installing the backend requirements..."
    npm install express socket.io cors # CHange this if we add more requirements

    echo "[4/7] Starting backend server..."
    node server.js
}

# A function that starts the frontend
start_frontend() {
    echo "[5/7] Changing to frontend directory..."
    cd chatbot-frontend || { echo "Frontend directory not found"; exit 1; }

    echo "[6/7] Installing frontend requirements..."
    npm install socket.io-client # This doesn't work on some devices for some reason, idk why

    echo "[7/7] Starting frontend server..."

    npm start
}

# Start backend in a new subchell in the background
(start_backend) &

# Start frontend in the shell
start_frontend
