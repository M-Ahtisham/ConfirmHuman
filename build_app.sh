# This is a script to build the app, its only for testing

# Works in Linux and MacOS,
# For windows you can use git/bash shell or WSL

# How to run it:
# make sure you have permision to execute this script
# in the root directory of the repository run this
# chmod +x ./build_app.sh
# then you can run this script by ./build_app.sh

echo "Building frontend..."
cd chatbot-frontend
echo "Installing the frontend requirements..."
npm install
npm run build

echo "Now copying build to backend public folder..."
rm -rf ../chatbot-backend/socrates/public/*
cp -r build/* ../chatbot-backend/socrates/public/

echo "Installing backend dependencies..."
cd ../chatbot-backend/socrates
npm install

echo "Starting backend server..."
node server.js &

sleep 4
echo "Socrates is now live and runnig at: http://localhost:3000/"
