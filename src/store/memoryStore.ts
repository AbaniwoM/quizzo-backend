import { Content } from '@google/generative-ai';

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}

export interface Session {
  id: string;
  userId: string;
  history: Content[];
}

export const users: User[] = [];
export const sessions: Session[] = [];
