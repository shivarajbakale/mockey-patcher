import React, { useCallback, useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import type { RequestMetadata } from "../api-tracker";
import { formatBytes, formatDuration, getMethodColor } from "../utils";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { useRequestsStore } from "../store/requests";
import { Button } from "@/components/atoms/button/button";
import { TargetIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestListProps {
  requests?: RequestMetadata[];
}

const RequestListComponent = ({ requests = [] }: RequestListProps) => {
  const selectedRequestIds = useRequestsStore(
    (state) => state.selectedRequestIds,
  );
  const mockSelectedRequests = useRequestsStore(
    (state) => state.mockSelectedRequests,
  );
  const setSelectedRequests = useRequestsStore(
    (state) => state.setSelectedRequests,
  );
  const selectionState = useRequestsStore((state) => state.selectionState);
  const isMocked = useRequestsStore((state) => state.isMocked);

  const handleRowSelection = useCallback(
    (request: RequestMetadata, checked: boolean) => {
      if (isMocked(request.requestId)) return; // Don't allow selection of mocked requests

      if (checked) {
        const newSelectedRequests = [
          ...requests.filter((r) => selectedRequestIds.has(r.requestId)),
          request,
        ];
        setSelectedRequests(newSelectedRequests);
      } else {
        const newSelectedRequests = requests.filter(
          (r) =>
            selectedRequestIds.has(r.requestId) &&
            r.requestId !== request.requestId,
        );
        setSelectedRequests(newSelectedRequests);
      }
    },
    [requests, setSelectedRequests, selectedRequestIds, isMocked],
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      // Filter out already mocked requests when selecting all
      const selectableRequests = requests.filter((r) => !isMocked(r.requestId));
      setSelectedRequests(checked ? selectableRequests : []);
    },
    [requests, setSelectedRequests, isMocked],
  );

  const handleMockSelectedRequests = useCallback(() => {
    const selectedRequests = requests.filter((request) =>
      selectedRequestIds.has(request.requestId),
    );
    mockSelectedRequests(selectedRequests);
    setSelectedRequests([]);
  }, [requests, selectedRequestIds, mockSelectedRequests]);

  const columns = useMemo<ColumnDef<RequestMetadata>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <Checkbox
            checked={
              selectionState.allSelected ||
              (selectionState.someSelected ? "indeterminate" : false)
            }
            onCheckedChange={handleSelectAll}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => {
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <Checkbox
              checked={
                selectedRequestIds.has(row.original.requestId) ||
                isRequestMocked
              }
              onCheckedChange={(checked) =>
                handleRowSelection(row.original, !!checked)
              }
              disabled={isRequestMocked}
              aria-label="Select row"
              className={cn(
                "translate-y-[2px]",
                isRequestMocked && "opacity-50 cursor-not-allowed",
              )}
            />
          );
        },
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
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <div
              className={cn(
                "font-medium text-right",
                isRequestMocked && "opacity-50",
              )}
            >
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
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <div className={cn("font-medium", isRequestMocked && "opacity-50")}>
              {formatDuration(duration)}
            </div>
          );
        },
        size: 100,
        enableHiding: false,
        sortDescFirst: true,
      },
      {
        accessorKey: "url",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="URL" />
        ),
        cell: ({ row }) => {
          const url = new URL(row.getValue("url"));
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <div
              className={cn(
                "font-medium break-all",
                isRequestMocked && "opacity-50",
              )}
            >
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
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <div
              className={cn(
                `font-medium ${getStatusColor(status)}`,
                isRequestMocked && "opacity-50",
              )}
            >
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
        cell: ({ row }) => {
          const isRequestMocked = isMocked(row.original.requestId);
          return (
            <div
              className={cn(
                `font-medium rounded-lg px-2 py-1 text-center ${getMethodColor(
                  row.getValue("method"),
                )}`,
                isRequestMocked && "opacity-50",
              )}
            >
              {row.getValue("method")}
            </div>
          );
        },
        enableSorting: true,
        enableResizing: false,
        size: 80,
      },
    ],
    [
      selectedRequestIds,
      handleSelectAll,
      handleRowSelection,
      selectionState,
      isMocked,
      requests,
    ],
  );

  const tableContent = useMemo(() => {
    const actionButton = (selectionState.someSelected ||
      selectionState.allSelected) && (
      <Button
        variant="secondary"
        size="sm"
        onClick={handleMockSelectedRequests}
      >
        <TargetIcon className="w-4 h-4" />
        Mock Selected Requests
      </Button>
    );

    return (
      <DataTable columns={columns} data={requests}>
        {actionButton}
      </DataTable>
    );
  }, [columns, requests, selectionState, handleMockSelectedRequests]);

  return tableContent;
};

RequestListComponent.displayName = "RequestList";

export const RequestList = React.memo(RequestListComponent);

// Helper function to determine status color
const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) return "text-green-600";
  if (status >= 300 && status < 400) return "text-blue-600";
  if (status >= 400 && status < 500) return "text-yellow-600";
  if (status >= 500) return "text-red-600";
  return "text-gray-600";
};
