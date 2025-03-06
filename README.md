# DSA Teaching Assistant

A smart teaching assistant that helps you learn Data Structures and Algorithms through guided problem-solving. The application uses AI to provide step-by-step guidance by probing conversation without giving away direct solutions.

## Features

- 🧑‍🏫 Interactive Problem Solving Coach
- 💡 Step-by-Step Guidance
- 🔄 Real-time Chat Interface
- 📝 LeetCode Problem Integration
- 🎯 Personalized Learning Experience

## Tech Stack

### Frontend
- React.js
- React Router
- Axios for API calls
- CSS Modules for styling

### Backend
- Node.js
- Express.js
- MongoDB
- OpenAI GPT-4 API
- LeetCode GraphQL API Integration

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API Key

### Installation

1. Clone the repository
bash:
git clone <repository-url>
cd dsa-teaching-assistant


2. Install Backend Dependencies
bash:
cd backend
npm install

3. Install Frontend Dependencies
bash:
cd frontend
npm install


4. Set up environment variables

Create a `.env` file in the backend directory:
env:
PORT=3001
MONGODB_URI=mongodb://localhost:27017/dsa-coach
OPENAI_API_KEY=your_openai_api_key

### Running the Application

1. Start the Backend Server
bash:
cd backend
npm run dev

2. Start the Frontend Development Server
bash:
cd frontend
npm start

The application will be available at `http://localhost:3000`

## Usage

1. Visit the landing page
2. Enter a LeetCode problem URL
3. Start interacting with the AI coach
4. Get guided assistance in solving the problem

## Project Structure

### Frontend
- `/src/components` - React components
- `/src/services` - API service functions
- `/src/styles` - Global styles and variables
- `/src/utils` - Utility functions

### Backend
- `/src/controllers` - Request handlers
- `/src/services` - Business logic
- `/src/models` - Database models
- `/src/routes` - API routes
- `/src/middleware` - Custom middleware


## Acknowledgments

- OpenAI gpt-4-preview for powering the intelligent coaching
- LeetCode for problem content integration
