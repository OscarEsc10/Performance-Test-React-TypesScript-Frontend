// User Interface — Include autentication, roles and status
export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;     // No always return in response
  role: "admin" | "user"; // Rol define by decorator
  isActive: boolean;      // status active/inactive
  createdAt: string;      // date created
}
