import { gradeResponse } from '../services/tools/grade_response';

describe('grade_response tool', () => {
  it('should return the correct status and message', () => {
    const result = gradeResponse({
      question: 'What is photosynthesis?',
      studentAnswer: 'Plants making food.',
      rubric: 'Must mention plants and food.'
    });

    expect(result).toBeDefined();
    expect(result.status).toBe('success');
    expect(result.message).toBe('Please analyze the student answer against the rubric and provide a grade and feedback.');
  });
});
