# Step 1: Build the Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY chatbot-frontend/package*.json ./
RUN npm install
COPY chatbot-frontend/ ./
RUN npm run build

# Step 2: Set up the Backend
FROM node:20-slim
WORKDIR /app
# Updated path for Plato
COPY chatbot-backend/plato/package*.json ./
RUN npm install
COPY chatbot-backend/plato/ ./

# Step 3: Copy Frontend build to Backend public folder
COPY --from=frontend-builder /app/frontend/build ./public

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]