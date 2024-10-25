import React, { useEffect, useRef } from 'react';
import { X, Minimize, Maximize } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';

interface BrowserWindowProps {
  id: string;
  url: string;
  title: string;
  position: { x: number; y: number };
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  id,
  url,
  title,
  position,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const { 
    updateMousePosition, 
    updateKeyboardInput, 
    setActiveWindow, 
    removeWindow,
    updateWindowUrl 
  } = useBrowserStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (windowRef.current && e.target instanceof Node && windowRef.current.contains(e.target)) {
        updateMousePosition(e.clientX, e.clientY, id);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (windowRef.current && e.target instanceof Node && windowRef.current.contains(e.target)) {
        updateKeyboardInput(e.key, id);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [id]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateWindowUrl(id, e.target.value);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could add logic to handle URL navigation
  };

  return (
    <div
      ref={windowRef}
      className="fixed bg-white rounded-lg shadow-xl border border-gray-200 w-[800px]"
      style={{ left: position.x, top: position.y }}
      onClick={() => setActiveWindow(id)}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-t-lg border-b">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <button
              onClick={() => removeWindow(id)}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
            />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
          </div>
          <span className="text-sm text-gray-600 ml-4">{title}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Minimize className="w-4 h-4 text-gray-600 cursor-pointer" />
          <Maximize className="w-4 h-4 text-gray-600 cursor-pointer" />
          <X
            className="w-4 h-4 text-gray-600 cursor-pointer"
            onClick={() => removeWindow(id)}
          />
        </div>
      </div>
      <div className="p-4">
        <form onSubmit={handleUrlSubmit} className="flex items-center space-x-2 bg-gray-50 rounded-md p-2 mb-4">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="flex-1 bg-transparent outline-none"
            placeholder="Enter URL"
          />
        </form>
        <div className="h-[400px] bg-gray-50 rounded-md p-4">
          <p className="text-gray-500 text-center">Browser content will be displayed here</p>
        </div>
      </div>
    </div>
  );
};