import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./components/main";

export interface RequestMetadata {
  url: string;
  method: string;
  status: number;
  duration: number;
  responseBody: string;
  id: string;
  numberOfBytes: number;
  requestBody: string | chrome.devtools.network.Request["request"]["postData"];
  startTime: number;
  endTime: number;
}

const APITracker = () => {
  const [requests, setRequests] = useState<RequestMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const handleRequestFinished = (
        request: chrome.devtools.network.Request,
      ) => {
        if (
          request._resourceType === "xhr" ||
          request._resourceType === "fetch"
        ) {
          try {
            const url = new URL(request.request.url);
            const pathname = url.origin + url.pathname;
            const postData = request?.request?.postData;
            request.getContent((content) => {
              // Calculate timing information
              const startTime = new Date(request.startedDateTime).getTime();
              const endTime = startTime + request.time;

              const requestMetadata: RequestMetadata = {
                url: pathname,
                method: request.request.method,
                status: request.response.status,
                duration: request.time,
                responseBody: content,
                requestBody: postData || null,
                id: `${request.request.method}-${pathname}`,
                numberOfBytes: request.response.content.size || 0,
                startTime,
                endTime,
              };

              setRequests((prev) => [...prev, requestMetadata]);
            });
          } catch (err) {
            console.error("Error processing request:", err);
            setError("Error processing network request");
          }
        }
      };

      chrome.devtools.network.onRequestFinished.addListener(
        handleRequestFinished,
      );

      return () => {
        chrome.devtools.network.onRequestFinished.removeListener(
          handleRequestFinished,
        );
      };
    } catch (err) {
      console.error("Error setting up network listener:", err);
      setError("Error setting up network tracking");
    }
  }, []);

  const onRefreshRequests = () => {
    // Clear existing requests
    setRequests([]);
    // Reload the inspected page
    chrome.devtools.inspectedWindow.reload({});
  };

  const onClearRequests = () => {
    setRequests([]);
  };

  return (
    <div className="p-4 bg-background h-[100vh]">
      <Main
        requests={requests}
        error={error}
        onClearRequests={onClearRequests}
        onRefreshRequests={onRefreshRequests}
      />
    </div>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <APITracker />,
);

export { APITracker };
