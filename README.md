# Quizzo: The Smart Teaching Assistant

## Deployed Backend Link: 
`https://quizzo-backend-awfq.onrender.com`

I built a full-stack AI application using Next.js (React + Tailwind CSS + TypeScript) and Node.js/Express, powered by Google Gemini API function calling. The assistant helps teachers generate quizzes, grade short-answer responses, and summarize class performance. I used the `gemini-1.5-flash` alongside other models as they support function calling.

### Backend (Node.js + Express)
I used an in-memory data store for users, sessions, and chat history.

**Gemini Function Calling Tools:**
1. `generate_quiz`: Generates a short quiz based on a given topic and difficulty level.
   - *Parameters*: `topic` (string), `difficulty` (string), `numberOfQuestions` (integer).
2. `grade_response`: Grades a student's short-answer response against a specific rubric.
   - *Parameters*: `question` (string), `studentAnswer` (string), `rubric` (string).
3. `summarize_performance`: Summarizes the overall performance of a class based on a list of grades.
   - *Parameters*: `grades` (array of objects containing student IDs and scores).

**Endpoints:**
- `POST /api/auth/register`: Hash password (bcrypt), store user, return JWT.
- `POST /api/auth/login`: Validate password, return JWT.
- `GET /api/tools`: Return JSON schemas of the 3 tools.
- `POST /api/chat`: Accept user message + sessionId, handle Gemini tool calls, return final response.
- `GET /api/chat/:sessionId`: Return in-memory chat history.

## Step-by-Step Build Process

1. **Backend Setup**: Initialize Node.js TypeScript project, install dependencies (Express, bcrypt, jsonwebtoken, @google/generative-ai), and set up the server entry point.
2. **Data & Auth**: Implement the in-memory store and Auth routes.
3. **Gemini Integration**: Set up the Gemini client, define the tool schemas, and write the logic to handle tool execution and returning results to the LLM.
4. **Chat API**: Build the chat endpoints to tie the Gemini service and history together.

## Environment Setup Guidance

You will need to create a `.env` file in the `backend` folder with the following keys:
```
PORT=3001
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```
You can get a Gemini API key from Google AI Studio.


