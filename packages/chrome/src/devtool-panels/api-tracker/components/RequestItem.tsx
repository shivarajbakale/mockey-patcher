import React from "react";
import type { RequestMetadata } from "../api-tracker";
import { Typography } from "@/components/atoms/typography/typography";
import { Card } from "@/components/atoms/card/card";
import { Badge } from "@/components/atoms/badge/badge";
import { Info } from "lucide-react";

import {
  formatBytes,
  formatDuration,
  formatRequestBody,
  getMethodColor,
  getStatusColor,
} from "../utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../~/components/ui/hover-card";
import { Button } from "@/components/atoms/button/button";

export const RequestItem = ({ request }: { request: RequestMetadata }) => {
  const url = new URL(request.url);

  return (
    <Card className="p-4 hover:bg-muted/50 transition-colors my-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="outline"
                className={getMethodColor(request.method)}
              >
                {request.method}
              </Badge>
              <Badge className={getStatusColor(request.status)}>
                {request.status}
              </Badge>
              <div className="flex items-center gap-2 ml-4">
                <Typography variant="small" className="text-muted-foreground">
                  <Badge variant="outline">
                    Duration: {formatDuration(request.duration)}
                  </Badge>
                </Typography>
                <Typography
                  variant="small"
                  className="text-muted-foreground whitespace-nowrap"
                >
                  <Badge variant="outline">
                    Size: {formatBytes(request.numberOfBytes)}
                  </Badge>
                </Typography>
              </div>
            </div>
            <Typography
              variant="small"
              className="text-muted-foreground truncate w-[200px]"
              title={url.pathname}
            >
              {url.origin + url.pathname}
            </Typography>
          </div>
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" size="sm">
                  <Info className="w-4 h-4" />
                  Request
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[400px]">
                <Card className="w-[300px] h-[300px]">
                  <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[400px] p-2">
                    <code>{formatRequestBody(request.requestBody)}</code>
                  </pre>
                </Card>
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link" size="sm">
                  <Info className="w-4 h-4" />
                  Response
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[400px]">
                <Card className="w-[300px] h-[300px]">
                  <pre className="text-xs whitespace-pre-wrap overflow-auto max-h-[400px] p-2">
                    <code>{request.responseBody || "No response body"}</code>
                  </pre>
                </Card>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </div>
    </Card>
  );
};
