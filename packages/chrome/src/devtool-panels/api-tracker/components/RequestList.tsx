import React from "react";
import { RequestItem } from "./RequestItem";
import type { RequestMetadata } from "./main";
import { Typography } from "@/components/atoms/typography/typography";

interface RequestListProps {
  requests: RequestMetadata[];
}

export const RequestList = ({ requests = [] }: RequestListProps) => {
  const isEmpty = requests.length === 0;
  return (
    <div>
      {isEmpty ? (
        <div className="flex items-center justify-center h-full">
          <Typography variant="small" className="text-muted-foreground">
            No requests found
          </Typography>
        </div>
      ) : (
        requests.map((request) => (
          <RequestItem key={request.id} request={request} />
        ))
      )}
    </div>
  );
};
