/**
 * TypeScript interfaces for portfolio data (Facebook/Meta-style dashboard).
 */

export interface Reactions {
  likes: number;
  loves: number;
  wows: number;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar?: string | null;
  content: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  image: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  category: string;
  reactions: Reactions;
  comments: Comment[];
  createdAt: Date;
}

export interface Skill {
  name: string;
  level: number; // e.g. 1–5 or 0–100
  category: string;
}
