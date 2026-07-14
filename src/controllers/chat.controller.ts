import { Request, Response } from 'express';
import { sessions, Session } from '../store/memoryStore';
import { handleChat } from '../services/gemini.service';

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { sessionId, message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Default session ID if not provided
    const sid = sessionId || 'default';
    
    // Find or create session
    let session = sessions.find(s => s.id === sid && s.userId === userId);
    if (!session) {
      session = { id: sid, userId, history: [] };
      sessions.push(session);
    }

    const { responseText, updatedHistory, toolCalls } = await handleChat(session.history, message);

    // Save back to our memory store
    session.history = updatedHistory;

    res.status(200).json({
      response: responseText,
      toolCalls,
      sessionId: session.id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).userId;
    const { sessionId } = req.params;

    const session = sessions.find(s => s.id === sessionId && s.userId === userId);
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }

    res.status(200).json({ history: session.history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
