import { IUser } from "./IUser";

export interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
    login?: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
  }
  