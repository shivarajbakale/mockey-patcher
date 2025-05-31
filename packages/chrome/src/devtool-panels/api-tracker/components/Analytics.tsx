import React from "react";
import { Typography } from "@/components/atoms/typography/typography";
import type { RequestMetadata } from "./main";
import { ChartBarIcon, ClockIcon } from "lucide-react";
import { Card } from "@/components/atoms/card/card";
import { formatBytes, formatDuration } from "../utils";

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
  return (
    <Card className="p-4 my-4 w-full">
      <Typography variant="h4">Analytics</Typography>
      <div
        className="flex justify-between items-center mt-2
      "
      >
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
