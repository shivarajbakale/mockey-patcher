import React, { useCallback, useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import type { RequestMetadata } from "../api-tracker";
import { formatBytes, formatDuration, getMethodColor } from "../utils";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { useRequestsStore } from "../store/requests";
import { Button } from "@/components/atoms/button/button";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip/tooltip";
import { MockSelectionDialog } from "@/components/molecules/mock-selection-dialog/mock-selection-dialog";
import { getFilteredRequests } from "./utils";
import { BulkActionsMenu } from "@/components/molecules/bulk-actions-menu/bulk-actions-menu";
import { Badge } from "@/components/atoms/badge/badge";

interface RequestListProps {
  selectedRowsCount?: number;
}

const RequestListComponent = ({ selectedRowsCount }: RequestListProps) => {
  const {
    selectedRequestIds,
    setSelectedRequests,
    requests,
    isMocked,
    filterCriteria,
    mockSelectedRequests,
  } = useRequestsStore();
  const [showMockSelectionDialog, setShowMockSelectionDialog] = useState(false);

  const filteredRequests = useMemo(() => {
    return getFilteredRequests(requests, filterCriteria);
  }, [requests, filterCriteria]);

  const handleRowSelection = useCallback(
    (request: RequestMetadata, checked: boolean) => {
      if (isMocked(request.requestId)) return;
      const currentlySelected = requests.filter((r) =>
        selectedRequestIds.has(r.requestId),
      );
      if (checked) {
        setSelectedRequests([...currentlySelected, request]);
      } else {
        setSelectedRequests(
          currentlySelected.filter((r) => r.requestId !== request.requestId),
        );
      }
    },
    [requests, selectedRequestIds, setSelectedRequests, isMocked],
  );

  // Calculate selection state for UI
  const selectionState = useMemo(() => {
    const selectableRequests = filteredRequests.filter(
      (r) => !isMocked(r.requestId),
    );
    const allSelected =
      selectableRequests.length > 0 &&
      selectableRequests.every((r) => selectedRequestIds.has(r.requestId));
    const someSelected =
      selectableRequests.some((r) => selectedRequestIds.has(r.requestId)) &&
      !allSelected;
    return { allSelected, someSelected };
  }, [filteredRequests, selectedRequestIds, isMocked]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      // Get currently selected requests that are not in the filtered view
      const selectedNotInFilter = requests.filter(
        (r) =>
          selectedRequestIds.has(r.requestId) &&
          !filteredRequests.find((fr) => fr.requestId === r.requestId),
      );

      if (checked) {
        // Add all non-mocked requests from filtered list to existing selections
        const selectableRequests = filteredRequests.filter(
          (r) => !isMocked(r.requestId),
        );
        setSelectedRequests([...selectedNotInFilter, ...selectableRequests]);
      } else {
        // Keep only the selections that are not in the current filtered view
        setSelectedRequests(selectedNotInFilter);
      }
    },
    [
      filteredRequests,
      requests,
      selectedRequestIds,
      setSelectedRequests,
      isMocked,
    ],
  );

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
          const fullUrl = url.origin + url.pathname;
          const isRequestMocked = isMocked(row.original.requestId);
          const maxUrlLength = 40;
          const shouldShowTooltip = fullUrl.length > maxUrlLength;
          const showRedirectionBadge = row.original.status === 307;

          const urlDisplay = (
            <div
              className={cn(
                "font-medium break-all",
                isRequestMocked && "opacity-50",
              )}
            >
              {shouldShowTooltip
                ? `${fullUrl.slice(0, maxUrlLength)}...`
                : fullUrl}
            </div>
          );

          return shouldShowTooltip ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>{urlDisplay}</TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[500px] break-all">
                    {showRedirectionBadge && (
                      <Badge variant="destructive">Redirected</Badge>
                    )}
                    {fullUrl}{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            urlDisplay
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
      filteredRequests,
      mockSelectedRequests,
    ],
  );

  const handleBulkMock = async (requests: RequestMetadata[]) => {
    mockSelectedRequests(requests);
  };

  const tableContent = useMemo(() => {
    const actionButton = (
      <div className="flex items-center gap-4 justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowMockSelectionDialog(true)}
        >
          <FilterIcon className="w-4 h-4" />
          Apply Filters
        </Button>
      </div>
    );

    const selectedRequests = filteredRequests.filter((request) =>
      selectedRequestIds.has(request.requestId),
    );

    return (
      <div className="relative">
        <DataTable
          columns={columns}
          data={filteredRequests}
          selectedRowsCount={selectedRowsCount || 0}
        >
          {actionButton}
        </DataTable>
        <MockSelectionDialog
          open={showMockSelectionDialog}
          onOpenChange={setShowMockSelectionDialog}
        />
        <BulkActionsMenu
          selectedItems={selectedRequests}
          onAction={handleBulkMock}
          getItemIdentifier={(item) => item.url}
          actions="mock"
        />
      </div>
    );
  }, [
    columns,
    filteredRequests,
    selectionState,
    selectedRowsCount,
    showMockSelectionDialog,
    setShowMockSelectionDialog,
    selectedRequestIds,
  ]);

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
