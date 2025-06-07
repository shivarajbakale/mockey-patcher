import React from "react";
import { Typography } from "@/components/atoms/typography/typography";
import type { RequestMetadata } from "../api-tracker";
import { ChartBarIcon, ClockIcon, TimerIcon } from "lucide-react";
import { Card } from "@/components/atoms/card/card";
import { formatBytes, formatDuration } from "../utils";

const calculateBlockingTime = (requests: RequestMetadata[]): number => {
  if (requests.length === 0) return 0;

  // Sort all time points (both start and end) and track whether we're entering or leaving a request
  const timePoints = requests
    .flatMap((req) => [
      { time: req.startTime, isStart: true },
      { time: req.endTime, isStart: false },
    ])
    .sort((a, b) => a.time - b.time);

  let blockingTime = 0;
  let activeRequests = 0;
  let lastTime = timePoints[0].time;

  // Go through each time point
  timePoints.forEach((point) => {
    // If we had any active requests, add the time since the last point to blocking time
    if (activeRequests > 0) {
      blockingTime += point.time - lastTime;
    }

    // Update active request count and last time point
    activeRequests += point.isStart ? 1 : -1;
    lastTime = point.time;
  });

  return blockingTime;
};

const Analytics = ({ requests }: { requests: RequestMetadata[] }) => {
  const totalRequests = requests.length;
  const totalDuration = requests.reduce(
    (acc, request) => acc + request.duration,
    0,
  );
  const totalBytesTransferred = requests.reduce(
    (acc, request) => acc + request.numberOfBytes,
    0,
  );
  const actualBlockingTime = calculateBlockingTime(requests);

  return (
    <Card className="p-4 my-4 w-full">
      <Typography variant="h4">Analytics</Typography>
      <div className="flex justify-between items-center mt-2 flex-wrap gap-4">
        <div className="flex items-center">
          <span className="text-muted-foreground flex items-center">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Total Requests
          </span>
          <span className="text-primary ml-2 font-bold">{totalRequests}</span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            Total Duration
          </span>
          <span className="text-primary ml-2 font-bold">
            {formatDuration(totalDuration)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground flex items-center">
            <TimerIcon className="w-4 h-4 mr-2" />
            Actual Blocking Time
          </span>
          <span className="text-primary ml-2 font-bold">
            {formatDuration(actualBlockingTime)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground flex items-center">
            <ChartBarIcon className="w-4 h-4 mr-2" />
            Total Data Transferred
          </span>
          <span className="text-primary ml-2 font-bold">
            {formatBytes(totalBytesTransferred)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export { Analytics };
