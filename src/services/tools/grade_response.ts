export const gradeResponseSchema = {
  name: 'grade_response',
  description: 'Grades a student\'s short-answer response against a specific rubric.',
  parameters: {
    type: 'OBJECT',
    properties: {
      question: { type: 'STRING' },
      studentAnswer: { type: 'STRING' },
      rubric: { type: 'STRING' }
    },
    required: ['question', 'studentAnswer', 'rubric']
  }
};

export const gradeResponse = (args: { question: string; studentAnswer: string; rubric: string }) => {
  return {
    status: 'success',
    message: 'Please analyze the student answer against the rubric and provide a grade and feedback.'
  };
};
