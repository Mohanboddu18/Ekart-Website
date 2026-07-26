export interface User {
    id?: number;
    email: string;
    name: string;
    phone?: string;
    role?: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    name: string;
    role: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}
