import { create } from 'zustand';

interface AuthUser {
  email: string;
  name: string;
}

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Mock credentials (replace with real API calls later)
const MOCK_EMAIL = 'admin@eventlens.ai';
const MOCK_PASSWORD = 'password123';
const SESSION_KEY = 'eventlens-auth';

function loadSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

function saveSession(user: AuthUser) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch { /* noop */ }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch { /* noop */ }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: typeof window !== 'undefined' ? loadSession() : null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 900));

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const user: AuthUser = { email, name: 'Studio Admin' };
      saveSession(user);
      set({ user, isLoading: false, error: null });
      return true;
    }

    set({
      isLoading: false,
      error: 'Invalid email or password. Try admin@eventlens.ai / password123',
    });
    return false;
  },

  logout: () => {
    clearSession();
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
