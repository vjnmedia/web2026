export class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface APIErrorResponse {
  message: string;
  code?: string;
  statusCode: number;
  validationErrors?: ValidationError[];
} 