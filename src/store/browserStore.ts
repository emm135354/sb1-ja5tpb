import { create } from 'zustand';

interface BrowserWindow {
  id: string;
  url: string;
  title: string;
  position: { x: number; y: number };
}

interface InputState {
  mousePosition: { x: number; y: number };
  keyboardInput: string;
  activeWindowId: string | null;
}

interface BrowserStore {
  windows: BrowserWindow[];
  inputState: InputState;
  addWindow: () => void;
  removeWindow: (id: string) => void;
  updateMousePosition: (x: number, y: number, windowId: string) => void;
  updateKeyboardInput: (input: string, windowId: string) => void;
  setActiveWindow: (id: string) => void;
  updateWindowUrl: (id: string, url: string) => void;
}

export const useBrowserStore = create<BrowserStore>((set) => ({
  windows: [],
  inputState: {
    mousePosition: { x: 0, y: 0 },
    keyboardInput: '',
    activeWindowId: null,
  },
  addWindow: () => {
    set((state) => ({
      windows: [
        ...state.windows,
        {
          id: crypto.randomUUID(),
          url: 'about:blank',
          title: 'New Window',
          position: { x: state.windows.length * 20, y: state.windows.length * 20 },
        },
      ],
    }));
  },
  removeWindow: (id) => {
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    }));
  },
  updateMousePosition: (x, y, windowId) => {
    set((state) => ({
      inputState: {
        ...state.inputState,
        mousePosition: { x, y },
      },
      windows: state.windows.map((window) => {
        if (window.id === windowId) {
          return {
            ...window,
            position: { x, y },
          };
        }
        return window;
      }),
    }));
  },
  updateKeyboardInput: (input, windowId) => {
    set((state) => ({
      inputState: {
        ...state.inputState,
        keyboardInput: input,
      },
    }));
  },
  setActiveWindow: (id) => {
    set((state) => ({
      inputState: {
        ...state.inputState,
        activeWindowId: id,
      },
    }));
  },
  updateWindowUrl: (id, url) => {
    set((state) => ({
      windows: state.windows.map((window) => 
        window.id === id ? { ...window, url } : window
      ),
    }));
  },
}));