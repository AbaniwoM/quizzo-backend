export const summarizePerformanceSchema = {
  name: 'summarize_performance',
  description: 'Summarizes the overall performance of a class based on a list of grades.',
  parameters: {
    type: 'OBJECT',
    properties: {
      grades: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            studentId: { type: 'STRING' },
            score: { type: 'INTEGER' }
          }
        }
      }
    },
    required: ['grades']
  }
};

export const summarizePerformance = (args: { grades: { studentId: string; score: number }[] }) => {
  if (!args.grades || args.grades.length === 0) {
    return { averageScore: 0, totalStudents: 0 };
  }
  const avg = args.grades.reduce((acc, curr) => acc + curr.score, 0) / args.grades.length;
  return {
    averageScore: avg,
    totalStudents: args.grades.length,
    message: 'Please provide a summary based on these statistics.'
  };
};
