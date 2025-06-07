import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./components/main";
import { useRequestsStore } from "./store/requests";
import { ThemeProvider } from "../../components/utils/theme-provider";
import { Toaster } from "@/components/atoms/sonner/sonner";

export interface RequestMetadata {
  url: string;
  method: string;
  status: number;
  duration: number;
  responseBody: string;
  requestId: string;
  numberOfBytes: number;
  requestBody: string | chrome.devtools.network.Request["request"]["postData"];
  startTime: number;
  endTime: number;
}

const APITracker = () => {
  const [error, setError] = useState<string | null>(null);
  const { requests, addRequest, clearRequests, getMockedRequests } =
    useRequestsStore();

  useEffect(() => {
    try {
      getMockedRequests();
      const handleRequestFinished = (
        request: chrome.devtools.network.Request,
      ) => {
        if (
          request._resourceType === "xhr" ||
          request._resourceType === "fetch"
        ) {
          try {
            const url = new URL(request.request.url);

            if (url.port === "3000") {
              // do not track requests from the dev server
              return;
            }
            const bodySize = request?.request?.bodySize;
            const pathname = url.origin + url.pathname;
            const postData = request?.request?.postData;
            const stableId = `${request.request.method}::${pathname}:${bodySize}`;

            request.getContent((content) => {
              const startTime = new Date(request.startedDateTime).getTime();
              const endTime = startTime + request.time;

              const requestMetadata: RequestMetadata = {
                url: pathname,
                method: request.request.method,
                status: request.response.status,
                duration: request.time,
                responseBody: content,
                requestBody: postData || null,
                requestId: stableId,
                numberOfBytes: request.response.content.size || 0,
                startTime,
                endTime,
              };

              addRequest(requestMetadata);
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
  }, [addRequest]);

  const onRefreshRequests = () => {
    // Clear existing requests
    clearRequests();
    // Reload the inspected page
    chrome.devtools.inspectedWindow.reload({});
  };

  return (
    <ThemeProvider>
      <Toaster />
      <div className="p-4 overflow-hidden h-[calc(100vh)] bg-background text-foreground">
        <Main
          requests={requests}
          error={error}
          onClearRequests={clearRequests}
          onRefreshRequests={onRefreshRequests}
        />
      </div>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(
  <APITracker />,
);

export { APITracker };
