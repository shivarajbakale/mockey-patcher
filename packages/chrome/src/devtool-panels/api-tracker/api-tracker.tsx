import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './components/main';

interface RequestMetadata {
  url: string;
  method: string;
  status: number;
  duration: number;
  responseBody: string;
  id: string;
  numberOfBytes: number;
  requestBody: string | chrome.devtools.network.Request['request']['postData'];
}

const APITracker = () => {
  const [allRequests, setAllRequests] = useState<RequestMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const handleRequestFinished = (request: chrome.devtools.network.Request) => {
        if (request._resourceType === 'xhr' || request._resourceType === 'fetch') {
          try {
            const url = new URL(request.request.url);
            const pathname = url.pathname;
            const postData = request?.request?.postData;
            console.log('This is the request data ', request);
            request.getContent(content => {
              const requestMetadata: RequestMetadata = {
                url: request.request.url,
                method: request.request.method,
                status: request.response.status,
                duration: request.time,
                responseBody: content,
                requestBody: postData || 'No request body',
                id: `${request.request.method}-${pathname}`,
                numberOfBytes: request.response.content.size || 0,
              };

              setAllRequests(prev => [...prev, requestMetadata]);
            });
          } catch (err) {
            console.error('Error processing request:', err);
            setError('Error processing network request');
          }
        }
      };

      chrome.devtools.network.onRequestFinished.addListener(handleRequestFinished);

      return () => {
        chrome.devtools.network.onRequestFinished.removeListener(handleRequestFinished);
      };
    } catch (err) {
      console.error('Error setting up network listener:', err);
      setError('Error setting up network tracking');
    }
  }, []);

  return (
    <div className="p-4 bg-background">
      <Main />
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<APITracker />);

export { APITracker };
