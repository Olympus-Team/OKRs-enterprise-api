export interface JwtPayload {
  id: number;
}

export interface UserResponse {
  email: string;
  fullName: string;
  gravatarUrl?: string;
  avatarUrl?: string;
}
export interface AuthResponse extends UserResponse {
  token: string;
}
