/**
 * API client for making HTTP requests
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return handleResponse(response);
  },

  async post<T>(endpoint: string, body: object): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return handleResponse(response);
  }
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
}