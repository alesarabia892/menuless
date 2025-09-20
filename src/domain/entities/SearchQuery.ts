export type SearchQuery = {
  text: string;
  createdAt: number;
};

export function createSearchQuery(text: string): SearchQuery {
  return { text, createdAt: Date.now() };
}


