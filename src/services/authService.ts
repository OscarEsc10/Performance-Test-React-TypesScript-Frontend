import api from "./axiosClient";

export interface RegisterData {
    username: string;
    password: string;
    email: string;
}

export interface LoginData {
    username: string;
    password: string;
}

// Auth Service
export const postRegister = async (data: RegisterData) => api.post("/auth/register", data);
export const postLogin = async (data: LoginData) => api.post("/auth/login", data);