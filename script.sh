# Function for backend
start_backend() {
    echo "[1/7] Moving to backend directory..."
    cd chatbot-backend/socrates || { echo "Backend directory not found"; exit 1; }

    echo "[2/7] Initializing npm project..."
    npm init -y

    echo "[3/7] Installing backend dependencies..."
    npm install express socket.io cors

    echo "[4/7] Starting backend server..."
    node server.js
}

# Function for frontend
start_frontend() {
    echo "[5/7] Moving to frontend directory..."
    cd chatbot-frontend || { echo "Frontend directory not found"; exit 1; }

    echo "[6/7] Installing frontend dependencies..."
    npm install socket.io-client

    echo "[7/7] Starting frontend server..."

    npm start
}

# Start backend in background
(start_backend) &

# Start frontend in foreground
start_frontend
