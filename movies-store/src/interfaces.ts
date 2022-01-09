export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  phone?: string;
  token?: number;
}

export interface Token {
  token: number;
  userId: number;
}
