'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function DebugAuthPage() {
  const [localStorageUser, setLocalStorageUser] = useState<any>(null);
  const { data: session, status } = useSession();
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const checkStorage = () => {
      const user = localStorage.getItem('user');
      const timestamp = new Date().toLocaleTimeString();

      if (user) {
        try {
          const parsed = JSON.parse(user);
          setLocalStorageUser(parsed);
          addLog(`${timestamp} - localStorage user found: ${parsed.email}`);
        } catch (e) {
          addLog(`${timestamp} - Error parsing localStorage user`);
        }
      } else {
        setLocalStorageUser(null);
        addLog(`${timestamp} - No user in localStorage`);
      }
    };

    const addLog = (message: string) => {
      setLogs(prev => [...prev, message].slice(-20)); // Keep last 20 logs
    };

    // Initial check
    checkStorage();

    // Listen for changes
    const handleStorage = () => {
      addLog('Storage event fired');
      checkStorage();
    };

    const handleUserLogin = () => {
      addLog('UserLogin event fired');
      checkStorage();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('userLogin', handleUserLogin);

    // Poll every 2 seconds
    const interval = setInterval(() => {
      checkStorage();
    }, 2000);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userLogin', handleUserLogin);
      clearInterval(interval);
    };
  }, []);

  const handleClearStorage = () => {
    localStorage.removeItem('user');
    setLocalStorageUser(null);
    setLogs(prev => [...prev, 'Cleared localStorage']);
  };

  const handleTestEvent = () => {
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('userLogin', { detail: localStorageUser }));
    setLogs(prev => [...prev, 'Manually triggered events']);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">🔍 Authentication Debug Page</h1>

        {/* localStorage Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">📦 localStorage Status</h2>
          {localStorageUser ? (
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">✅ User found in localStorage</p>
              <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(localStorageUser, null, 2)}
              </pre>
            </div>
          ) : (
            <p className="text-red-600 font-semibold">❌ No user in localStorage</p>
          )}
        </div>

        {/* NextAuth Session Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">🔐 NextAuth Session Status</h2>
          <p className="mb-2"><strong>Status:</strong> {status}</p>
          {session ? (
            <pre className="bg-gray-50 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(session, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-600">No session found</p>
          )}
        </div>

        {/* Event Logs */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">📝 Event Logs</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">⚡ Actions</h2>
          <div className="flex gap-4">
            <button
              onClick={handleClearStorage}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Clear localStorage
            </button>
            <button
              onClick={handleTestEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Test Events
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">🔗 Navigation</h2>
          <div className="flex gap-4">
            <a href="/" className="text-blue-600 hover:underline">Home</a>
            <a href="/login" className="text-blue-600 hover:underline">Login</a>
            <a href="/signup" className="text-blue-600 hover:underline">Signup</a>
            <a href="/mypage" className="text-blue-600 hover:underline">MyPage</a>
          </div>
        </div>
      </div>
    </div>
  );
}
