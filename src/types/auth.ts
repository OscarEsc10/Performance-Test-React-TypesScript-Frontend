import { User } from "./user";

// Auth Interface — In base of login and register
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;   // Token JWT received
  user: User;             // User autenticated
}
