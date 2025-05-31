import React, { useState } from "react";
import { Typography } from "@/components/atoms/typography/typography";

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">API Request Tracker</Typography>
      </div>
    </div>
  );
};

export { Main };
