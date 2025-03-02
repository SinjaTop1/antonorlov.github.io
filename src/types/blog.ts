// src/types/blog.ts
export interface BlogData {
    title: string;
    description: string;
    pubDate: Date;
    draft?: boolean;
    featured?: boolean;
    tags?: string[];
    author?: string;
    image?: string;
    // Add any other properties you're using
  }