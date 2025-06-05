import React from "react";
import { Typography } from "@/components/atoms/typography/typography";
import { RequestList } from "./RequestList";
import { MockedList } from "./MockedList";
import { Analytics } from "./Analytics";
import { Button } from "@/components/atoms/button/button";
import { RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useRequestsStore } from "../store/requests";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs/tabs";
import type { RequestMetadata } from "../api-tracker";

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
  const selectedRequestIds = useRequestsStore(
    (state) => state.selectedRequestIds,
  );
  const clearRequests = useRequestsStore((state) => state.clearRequests);
  const mockedRequests = useRequestsStore((state) => state.mockedRequests);
  const deleteAllMocks = useRequestsStore((state) => state.deleteAllMocks);

  const selectedRequestsCount = React.useMemo(
    () => selectedRequestIds.size,
    [selectedRequestIds],
  );

  const onRefreshPlugin = () => {
    window.location.reload();
  };

  const handleClearRequests = () => {
    clearRequests();
    onClearRequests();
  };

  const clearAllRules = () => {
    chrome.declarativeNetRequest.getDynamicRules((rules) => {
      chrome.declarativeNetRequest.updateDynamicRules(
        {
          removeRuleIds: rules.map((rule) => rule.id),
        },
        () => {
          console.log("Rules removed");
        },
      );
    });
  };

  const handleDeleteAllMocks = () => {
    deleteAllMocks();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Mocky Balboa</Typography>
        {selectedRequestsCount > 0 && (
          <Typography variant="small" className="text-muted-foreground">
            {selectedRequestsCount} requests selected
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
        <Button variant="outline" size="sm" onClick={clearAllRules}>
          <TrashIcon className="w-4 h-4" />
          Clear all rules
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Analytics requests={requests} />
      </div>
      <Tabs defaultValue="all-requests" className="w-full h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all-requests">All Requests</TabsTrigger>
          <TabsTrigger value="mock-requests">Mock Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="all-requests" className="flex-grow">
          <div className="h-[calc(100vh-220px)] overflow-hidden">
            <RequestList requests={requests} />
          </div>
        </TabsContent>
        <TabsContent value="mock-requests" className="flex-grow">
          <div className="h-[calc(100vh-220px)] overflow-hidden">
            <MockedList
              requests={mockedRequests}
              onDeleteAllMocks={handleDeleteAllMocks}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { Main };
