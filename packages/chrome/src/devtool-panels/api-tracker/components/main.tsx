import React, { useState } from "react";
import { Button } from "@/components/atoms/button/button";
import { Card } from "@/components/atoms/card/card";
import { Typography } from "@/components/atoms/typography/typography";
import { Controls } from "./Controls";
import { Filters, type FilterCriteria } from "./Filters";
import { Stats } from "./Stats";
import { RequestList } from "./RequestList";

interface RequestMetadata {
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

const Main: React.FC<MainProps> = ({ requests, error, onClearRequests }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>("all");

  const filteredRequests = [].filter((request) => {
    const matchesSearch = request.url
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterCriteria === "all"
        ? true
        : filterCriteria === "success"
          ? request.status >= 200 && request.status < 300
          : filterCriteria === "error"
            ? request.status >= 400
            : request.status >= 100 && request.status < 200;

    return matchesSearch && matchesFilter;
  });

  const totalDataTransferred = filteredRequests.reduce(
    (acc, curr) => acc + curr.dataSize,
    0,
  );

  const handleAddTrackedApis = () => {
    // Implementation for adding tracked APIs
  };

  const handleClearAll = () => {
    // Implementation for clearing all tracked APIs
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">API Request Tracker</Typography>
        <div className="space-x-2">
          <Button
            onClick={() => {
              console.log(JSON.stringify(requests, null, 2));
            }}
            variant="outline"
            size="sm"
          >
            Print Requests
          </Button>
          <Button onClick={onClearRequests} variant="outline" size="sm">
            Clear
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Controls
        onAddTrackedApis={handleAddTrackedApis}
        onClearAll={handleClearAll}
      />

      <Filters
        searchQuery={searchQuery}
        filterCriteria={filterCriteria}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterCriteria}
      />
      <Stats
        totalRequests={filteredRequests.length}
        totalDataTransferred={totalDataTransferred}
      />

      <RequestList requests={filteredRequests} />
    </Card>
  );
};

export { Main };
