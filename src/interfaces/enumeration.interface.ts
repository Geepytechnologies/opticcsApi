export interface Filters {
  state?: string;
  lga?: string;
  ward?: string;
  settlement?: string;
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
