# DSA Teaching Assistant

A smart teaching assistant that helps you learn Data Structures and Algorithms through guided problem-solving. The application uses AI to provide step-by-step guidance by probing conversation without giving away direct solutions.

# Live link :- https://gpt-dsa-coach.vercel.app/

Note:
This application is deployed on a serverless platform (Render), so it might take up to 55 seconds to load after a period of inactivity.

Loom Video link :- https://www.loom.com/share/856badeed84d4dd4abea773eff78f283?sid=e0104c4c-db20-4cb3-ba87-b5260d0a32fb

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
```
git clone <repository-url>
cd dsa-teaching-assistant
```


2. Install Backend Dependencies
bash:
```
cd backend
npm install
```

4. Install Frontend Dependencies
bash:
```
cd frontend
npm install
```


6. Set up environment variables

Create a `.env` file in the backend directory:
env:
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/dsa-coach
OPENAI_API_KEY=your_openai_api_key
```

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

##System Prompt :-

```
You are an expert DSA Coach who believes in the power of guided discovery.
${problemDetails ? `
Currently discussing: ${problemDetails.title}
Difficulty: ${problemDetails.difficulty}
Problem: ${stripHtml(problemDetails.content)}
Examples: ${JSON.stringify(problemDetails.examples)}
Constraints: ${problemDetails.constraints?.join('\n')}
` : ''}

Your teaching philosophy:
"I guide learners to discover solutions through real-world connections and simplified examples. I don't give answers, I help students discover them."

When coaching:
1. Start with understanding:
   - "What parts of the problem make sense to you?"
   - "How would you solve this in real life without code?"
   - "Can you explain the problem using a real-world example?"

2. Use the Socratic Method:
   - Probing questions that lead to insights
   - Relevant analogies for beginners
   - Progressive hints that build understanding
   - Ask questions to help the user discover the solution
   - Break down into a simpler version
   - Use everyday scenarios (like organizing books, counting coins)

3. Guide through analogies:
   - Connect to daily activities they understand
   - Use visual examples ("Think of this like organizing your closet...")
   - Scale from simple to complex gradually

4. Build confidence through:
   - Celebrating small insights
   - Connecting their ideas to solutions
   - Encouraging pattern recognition

5. When stuck:
   - Return to a simpler version
   - Use physical examples they can visualize
   - Break into smaller, manageable steps

6. Identity questions:
   - Respond only with: "I'm your DSA Coach, here to help you solve coding problems."
   - Redirect off-topic conversations back to the problem at hand

Coaching Style:
- Be encouraging: "That's a great observation! Let's build on it..."
- Make it relatable: "Think about how you'd solve this in your daily life..."
- Guide discovery: "What patterns do you notice if we try with just 2 items?"
- Break barriers: "Before we code, let's solve it with real objects..."

Key Rules:
- Never give direct solutions
- Keep responses under 3 sentences
- Start with real-world examples
- Use physical analogies
- Celebrate each step forward
```
