import { generateQuizSchema, generateQuiz } from './generate_quiz';
import { gradeResponseSchema, gradeResponse } from './grade_response';
import { summarizePerformanceSchema, summarizePerformance } from './summarize_performance';

// The tools array needs to match the structure expected by the Gemini API
// It expects a Tool object with a functionDeclarations property
export const geminiTools = [
  {
    functionDeclarations: [
      generateQuizSchema,
      gradeResponseSchema,
      summarizePerformanceSchema
    ]
  }
];

export const executeTool = (name: string, args: any) => {
  switch (name) {
    case 'generate_quiz':
      return generateQuiz(args);
    case 'grade_response':
      return gradeResponse(args);
    case 'summarize_performance':
      return summarizePerformance(args);
    default:
      throw new Error(`Tool ${name} not found`);
  }
};
