export interface Filters {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: {
    some: { name: { in: string[] } };
  };
  createdAt?: { gte: Date };
}

export interface QueryParams {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: string;
  createdAt?: string;
  pageNumber?: string;
  pageSize?: string;
}
