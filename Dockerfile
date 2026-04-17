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
COPY chatbot-backend/socrates/package*.json ./
RUN npm install
COPY chatbot-backend/socrates/ ./

# Step 3: Copy Frontend build to Backend public folder
COPY --from=frontend-builder /app/frontend/build ./public

# Expose the port and start the app
EXPOSE 3000
CMD ["node", "server.js"]