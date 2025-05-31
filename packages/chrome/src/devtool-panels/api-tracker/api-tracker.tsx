import React, { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/button/button';
import { Card } from '@/components/atoms/card/card';
import { Typography } from '@/components/atoms/typography/typography';
import { createRoot } from 'react-dom/client';

interface RequestMetadata {
  url: string;
  method: string;
  status: string;
  duration: number;
  body: string;
  id: string;
  numberOfBytes: number;
}

const APITracker = () => {
  const [allRequests, setAllRequests] = useState<RequestMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const handleRequestFinished = (request: chrome.devtools.network.Request) => {
        if (request._resourceType === 'xhr' || request._resourceType === 'fetch') {
          try {
            request.getContent(content => {
              const requestMetadata: RequestMetadata = {
                url: request.request.url,
                method: request.request.method,
                status: request.response.status.toString(),
                duration: request.time,
                body: content,
                id: `${request.request.method}-${request.request.url}-${Date.now()}`,
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

  const clearRequests = () => {
    setAllRequests([]);
    setError(null);
  };

  return (
    <div className="p-4 bg-background">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h4">API Request Tracker</Typography>
          <div className="space-x-2">
            <Button
              onClick={() => {
                console.log(JSON.stringify(allRequests, null, 2));
              }}
              variant="outline"
              size="sm"
            >
              Print Requests
            </Button>
            <Button onClick={clearRequests} variant="outline" size="sm">
              Clear
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-2">
          {allRequests.map(request => (
            <Card key={request.id} className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <Typography className="font-medium">
                    {request.method} {request.url}
                  </Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    Status: {request.status} • Duration: {request.duration.toFixed(2)}ms
                  </Typography>
                </div>
                <Typography variant="small" className="text-muted-foreground">
                  {(request.numberOfBytes / 1024).toFixed(2)} KB
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

createRoot(document.getElementById('root') as HTMLElement).render(<APITracker />);

export { APITracker };
