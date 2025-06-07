import React from "react";
import { Card, CardContent } from "@/components/atoms/card/card";
import { MockedList } from "./MockList";
import { useRequestsStore } from "@/devtool-panels/api-tracker/store/requests";

export function MockedRequests() {
  const { mockedRequests } = useRequestsStore();

  return (
    <Card className="p-4">
      <CardContent>
        <MockedList requests={mockedRequests} selectedRowsCount={0} />
      </CardContent>
    </Card>
  );
}
