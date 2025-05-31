import React from "react";
import type { RequestMetadata } from "../api-tracker";
import { Typography } from "@/components/atoms/typography/typography";
import { Card } from "@/components/atoms/card/card";
import { Badge } from "@/components/atoms/badge/badge";
import {
  formatBytes,
  formatDuration,
  formatRequestBody,
  getMethodColor,
  getStatusColor,
} from "../utils";

export const RequestItem = ({ request }: { request: RequestMetadata }) => {
  const url = new URL(request.url);

  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className={getMethodColor(request.method)}
              >
                {request.method}
              </Badge>
              <Badge
                variant="outline"
                className={getStatusColor(request.status)}
              >
                {request.status}
              </Badge>
              <Typography variant="small" className="text-muted-foreground">
                {formatDuration(request.duration)}
              </Typography>
            </div>
            <Typography
              variant="small"
              className="text-muted-foreground truncate"
              title={url.pathname}
            >
              {url.toString()}
            </Typography>
          </div>
          <Typography
            variant="small"
            className="text-muted-foreground whitespace-nowrap ml-4"
          >
            {formatBytes(request.numberOfBytes)}
          </Typography>
        </div>

        {/* Request/Response Preview */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Typography variant="small" className="font-medium mb-1">
              Request
            </Typography>
            <div className="bg-muted rounded-md p-2 max-h-20 overflow-auto">
              <pre className="text-xs">
                <code>{formatRequestBody(request.requestBody)}</code>
              </pre>
            </div>
          </div>
          <div>
            <Typography variant="small" className="font-medium mb-1">
              Response
            </Typography>
            <div className="bg-muted rounded-md p-2 max-h-20 overflow-auto">
              <pre className="text-xs">
                <code>{request.responseBody || "No response body"}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
