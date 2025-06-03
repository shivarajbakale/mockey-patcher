import React, { useCallback, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import type { RequestMetadata } from "./main";
import { formatBytes, formatDuration, getMethodColor } from "../utils";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { useRequestsStore } from "../store/requests";

interface RequestListProps {
  requests: RequestMetadata[];
}

export const RequestList = ({ requests = [] }: RequestListProps) => {
  const selectedRequestIds = useRequestsStore(
    (state) => state.selectedRequestIds,
  );
  const setSelectedRequests = useRequestsStore(
    (state) => state.setSelectedRequests,
  );
  const isRequestSelected = useRequestsStore(
    (state) => state.isRequestSelected,
  );

  const handleRowSelection = useCallback(
    (request: RequestMetadata, checked: boolean) => {
      if (checked) {
        const newSelectedRequests = [
          ...requests.filter((r) => isRequestSelected(r.id)),
          request,
        ];
        setSelectedRequests(newSelectedRequests);
      } else {
        const newSelectedRequests = requests.filter(
          (r) => isRequestSelected(r.id) && r.id !== request.id,
        );
        setSelectedRequests(newSelectedRequests);
      }
    },
    [requests, setSelectedRequests, isRequestSelected],
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectedRequests(checked ? requests : []);
    },
    [requests, setSelectedRequests],
  );

  const columns = useMemo<ColumnDef<RequestMetadata>[]>(
    () => [
      {
        id: "select",
        header: () => {
          const allSelected =
            requests.length > 0 &&
            requests.every((r) => selectedRequestIds.has(r.id));
          const someSelected =
            requests.some((r) => selectedRequestIds.has(r.id)) && !allSelected;

          console.log("someSelected", selectedRequestIds);

          return (
            <Checkbox
              checked={allSelected || (someSelected ? "indeterminate" : false)}
              onCheckedChange={handleSelectAll}
              aria-label="Select all"
              className="translate-y-[2px]"
            />
          );
        },
        cell: ({ row }) => (
          <Checkbox
            checked={selectedRequestIds.has(row.original.id)}
            onCheckedChange={(checked) =>
              handleRowSelection(row.original, !!checked)
            }
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "numberOfBytes",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Bytes" />
        ),
        cell: ({ row }) => {
          const numberOfBytes = row.getValue("numberOfBytes") as number;
          return (
            <div className="font-medium text-right">
              {formatBytes(numberOfBytes)}
            </div>
          );
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
      },
      {
        accessorKey: "url",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="URL" />
        ),
        cell: ({ row }) => {
          const url = new URL(row.getValue("url"));
          return (
            <div className="font-medium break-all">
              {url.origin + url.pathname}
            </div>
          );
        },
        size: 400,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as number;
          return (
            <div className={`font-medium ${getStatusColor(status)}`}>
              {status}
            </div>
          );
        },
        size: 80,
      },
      {
        accessorKey: "method",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Method" />
        ),
        cell: ({ row }) => (
          <div
            className={`font-medium rounded-lg px-2 py-1 text-center ${getMethodColor(
              row.getValue("method"),
            )}`}
          >
            {row.getValue("method")}
          </div>
        ),
        enableSorting: false,
        enableResizing: false,
        size: 80,
      },
    ],
    [selectedRequestIds, handleSelectAll, handleRowSelection],
  );

  return <DataTable columns={columns} data={requests} />;
};

// Helper function to determine status color
const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) return "text-green-600";
  if (status >= 300 && status < 400) return "text-blue-600";
  if (status >= 400 && status < 500) return "text-yellow-600";
  if (status >= 500) return "text-red-600";
  return "text-gray-600";
};
