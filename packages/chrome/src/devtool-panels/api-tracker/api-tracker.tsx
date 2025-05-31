import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import "../../style.css";

interface NetworkRequest {
  url: string;
  method: string;
  status: number;
  responseBody: string;
  timestamp: Date;
  mimeType: string;
}

function APITracker() {
  const [requests, setRequests] = useState<chrome.devtools.network.Request[]>(
    [],
  );

  useEffect(() => {
    const handleRequestFinished = (
      request: chrome.devtools.network.Request,
    ) => {
      if (
        request._resourceType === "fetch" ||
        request._resourceType === "xhr"
      ) {
        request.getContent((content) => {
          const newRequest: NetworkRequest = {
            url: request.request.url,
            method: request.request.method,
            status: request.response.status,
            responseBody: content || "No content available",
            timestamp: new Date(),
            mimeType: request.response.content.mimeType,
          };

          setRequests((prev) => [newRequest, ...prev]);
        });
      }
    };

    // Clear existing requests
    setRequests([]);

    // Add listener
    chrome.devtools.network.onRequestFinished.addListener(
      handleRequestFinished,
    );

    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(
        handleRequestFinished,
      );
    };
  }, []);

  const clearRequests = () => {
    setRequests([]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">API Tracker</h1>
        <button
          onClick={clearRequests}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Clear
        </button>
      </div>

      <div className="space-y-2">
        {requests.map((req, index) => (
          <div key={index} className="border p-3 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-sm">{req.method}</span>
              <span
                className={`px-2 py-1 rounded text-xs ${
                  req.status >= 200 && req.status < 300
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {req.status}
              </span>
            </div>

            <div className="text-sm mb-2 break-all">{req.url}</div>

            <details>
              <summary className="cursor-pointer text-sm text-blue-600">
                View Response ({req.responseBody.length} chars)
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 text-xs overflow-auto max-h-40 whitespace-pre-wrap">
                {req.responseBody}
              </pre>
            </details>

            <div className="text-xs text-gray-500 mt-1">
              {req.timestamp.toLocaleTimeString()} • {req.mimeType}
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No API calls detected.</p>
          <p className="text-sm">
            Make some network requests to see them here.
          </p>
        </div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<APITracker />);
