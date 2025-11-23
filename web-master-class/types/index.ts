export interface User {
  id?: string;
  name: string;
  email: string;
  provider: 'email' | 'google' | 'kakao';
  image?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}
