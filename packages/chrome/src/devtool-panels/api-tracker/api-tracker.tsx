import React, { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/button/button';

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

  useEffect(() => {
    chrome.devtools.network.onRequestFinished.addListener(request => {
      if (request._resourceType === 'xhr' || request._resourceType === 'fetch') {
        request.getContent(content => {
          const url = request._url;
          const method = request._method;
          const status = request._status as string;
          const duration = request._time as number;
          const body = content;
          const id = request._method + request._url + request._requestId;
          const numberOfBytes = request?.response?.content?.size;
          const requestMetadata: RequestMetadata = {
            url,
            method,
            status,
            duration,
            body,
            id,
            numberOfBytes,
          };

          setAllRequests(prev => [...prev, requestMetadata]);
        });
      }
    });
    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(() => {
        console.log('Request tracking finished');
      });
    };
  }, []);

  return (
    <div className="p-4 bg-background">
      <Button
        onClick={() => {
          console.log(JSON.stringify(allRequests, null, 2));
        }}
      >
        Print Request data
      </Button>
    </div>
  );
};

export { APITracker };
