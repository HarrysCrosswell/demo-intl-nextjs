export interface User {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  birth_date: string; // ISO date string
  created_at: string; // ISO datetime string
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  locale: string;
  count?: number;
}

export interface ApiError {
  detail: string;
}
