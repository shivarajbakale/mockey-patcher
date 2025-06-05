import React, { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import type { MockedRequest } from "../store/requests";
import { formatDuration } from "../utils";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/atoms/button/button";

interface MockedListProps {
  requests?: MockedRequest[];
  onDeleteAllMocks: () => void;
}

const MockedListComponent = ({
  requests = [],
  onDeleteAllMocks,
}: MockedListProps) => {
  const columns = useMemo<ColumnDef<MockedRequest>[]>(
    () => [
      {
        accessorKey: "url",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="URL" />
        ),
        cell: ({ row }) => {
          const url = row.getValue("url") as string;
          return <div className="font-medium text-right">{url}</div>;
        },
        size: 80,
        enableHiding: false,
      },
      {
        accessorKey: "duration",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Duration" />
        ),
        cell: ({ row }) => {
          const duration = row.getValue("duration") as number;
          return <div className="font-medium">{formatDuration(duration)}</div>;
        },
        size: 100,
        enableHiding: false,
        sortDescFirst: true,
      },
      {
        accessorKey: "requestId",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Request ID" />
        ),
        cell: ({ row }) => {
          const requestId = row.getValue("requestId") as string;
          return <div className="font-medium break-all">{requestId}</div>;
        },
        size: 400,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={requests}
      className="bg-muted"
      enableViewOptions={false}
    >
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onDeleteAllMocks}>
          <TrashIcon className="w-4 h-4" />
          Delete all mocks
        </Button>
      </div>
    </DataTable>
  );
};

MockedListComponent.displayName = "MockedList";

export const MockedList = React.memo(MockedListComponent);
