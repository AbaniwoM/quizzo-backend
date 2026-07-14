import { genAI, FALLBACK_MODELS } from '../config/gemini';
import { geminiTools, executeTool } from './tools';
import { Content } from '@google/generative-ai';

const cleanMarkdown = (text: string) => {
  return text.replace(/(\*\*|###|##|#|\*|`)/g, '').trim();
};

export const handleChat = async (history: Content[], newMessage: string): Promise<{ responseText: string, updatedHistory: Content[], toolCalls: any[] }> => {
  let lastError: any;
  
  for (const modelName of FALLBACK_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: "You must provide your responses in plain, readable text. Do not use Markdown formatting symbols like asterisks (*) for bolding/italics, hash symbols (#) for headers, or markdown bullet points, unless symbols are absolutely required by the context."
      });
      const chat = model.startChat({
        history: history,
        tools: geminiTools as any
      });

      const result = await chat.sendMessage(newMessage);
      const response = result.response;
      
      const functionCalls = response.functionCalls();
      const toolCallsMade: any[] = [];
      
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        toolCallsMade.push({ name: call.name, args: call.args });
        const toolResult = executeTool(call.name, call.args);
        
        const result2 = await chat.sendMessage([{
          functionResponse: {
            name: call.name,
            response: toolResult
          }
        }]);
        
        return {
          responseText: cleanMarkdown(result2.response.text()),
          updatedHistory: await chat.getHistory(),
          toolCalls: toolCallsMade
        };
      }
      
      return {
        responseText: cleanMarkdown(response.text()),
        updatedHistory: await chat.getHistory(),
        toolCalls: []
      };
    } catch (err: any) {
      console.warn(`Model ${modelName} failed:`, err.message);
      lastError = err;
      if (err.status !== 503 && err.status !== 404 && err.status !== 429) {
        throw err;
      }
    }
  }
  
  throw new Error(`All fallback models failed. Last error: ${lastError?.message || 'Unknown error'}`);
};
