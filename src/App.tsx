import React from 'react';
import { Plus } from 'lucide-react';
import { useBrowserStore } from './store/browserStore';
import { BrowserWindow } from './components/BrowserWindow';

function App() {
  const { windows, addWindow } = useBrowserStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={addWindow}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Window</span>
        </button>
      </div>
      
      {windows.map((window) => (
        <BrowserWindow
          key={window.id}
          id={window.id}
          url={window.url}
          title={window.title}
          position={window.position}
        />
      ))}
    </div>
  );
}

export default App;