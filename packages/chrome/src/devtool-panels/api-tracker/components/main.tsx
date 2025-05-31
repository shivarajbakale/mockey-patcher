import React from "react";
import { Typography } from "@/components/atoms/typography/typography";
import { RequestList } from "./RequestList";

export interface RequestMetadata {
  url: string;
  method: string;
  status: number;
  duration: number;
  responseBody: string;
  id: string;
  numberOfBytes: number;
  requestBody: string | chrome.devtools.network.Request["request"]["postData"];
}

interface MainProps {
  requests: RequestMetadata[];
  error: string | null;
  onClearRequests: () => void;
}

const Main: React.FC<MainProps> = ({ requests }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">JSON D&apos;Rule Oh</Typography>
      </div>
      <div className="scroll-container">
        <RequestList requests={requests} />
      </div>
    </div>
  );
};

export { Main };
