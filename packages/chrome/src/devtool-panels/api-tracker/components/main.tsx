import React from "react";
import { Typography } from "@/components/atoms/typography/typography";
import { RequestList } from "./RequestList";
import { Analytics } from "./Analytics";
import { Button } from "@/components/atoms/button/button";
import { RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useRequestsStore } from "../store/requests";

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

interface MainProps {
  requests: RequestMetadata[];
  error: string | null;
  onClearRequests: () => void;
  onRefreshRequests: () => void;
}

const Main: React.FC<MainProps> = ({
  requests,
  onClearRequests,
  onRefreshRequests,
}) => {
  const selectedRequests = useRequestsStore((state) =>
    state.getSelectedRequests(),
  );
  const clearRequests = useRequestsStore((state) => state.clearRequests);

  const onRefreshPlugin = () => {
    window.location.reload();
  };

  const handleClearRequests = () => {
    clearRequests();
    onClearRequests();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Mocky Balboa</Typography>
        {selectedRequests.length > 0 && (
          <Typography variant="small" className="text-muted-foreground">
            {selectedRequests.length} requests selected
          </Typography>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRefreshPlugin}>
          <RefreshCcwIcon className="w-4 h-4" />
          Refresh
        </Button>
        <Button variant="outline" size="sm" onClick={onRefreshRequests}>
          <RefreshCcwIcon className="w-4 h-4" />
          Recalculate
        </Button>
        <Button variant="outline" size="sm" onClick={handleClearRequests}>
          <TrashIcon className="w-4 h-4" />
          Clear
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Analytics requests={requests} />
      </div>
      <div className="scroll-container">
        <RequestList requests={requests} />
      </div>
    </div>
  );
};

export { Main };
