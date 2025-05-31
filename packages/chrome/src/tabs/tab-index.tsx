import React from 'react';
import '../style.css';

function HelloWorld() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-6">Firebase Not Configured</h1>
        <p className="text-gray-600 mb-4">
          Please set up your Firebase environment variables in{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Check the <code className="bg-gray-100 px-1 rounded">checklist.md</code> for setup
          instructions.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            💡 After setting up your environment variables, refresh this page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelloWorld;
