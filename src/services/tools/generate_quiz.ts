export const generateQuizSchema = {
  name: 'generate_quiz',
  description: 'Generates a short quiz based on a given topic and difficulty level.',
  parameters: {
    type: 'OBJECT',
    properties: {
      topic: { type: 'STRING', description: 'The topic of the quiz (e.g., Photosynthesis).' },
      difficulty: { type: 'STRING', description: 'Difficulty level (easy, medium, hard).' },
      numberOfQuestions: { type: 'INTEGER', description: 'Number of questions to generate.' }
    },
    required: ['topic', 'difficulty', 'numberOfQuestions']
  }
};

export const generateQuiz = (args: { topic: string; difficulty: string; numberOfQuestions: number }) => {
  return {
    status: 'success',
    quizDetails: {
      topic: args.topic,
      difficulty: args.difficulty,
      numberOfQuestions: args.numberOfQuestions,
      instructions: 'Please provide the questions based on these parameters.'
    }
  };
};
