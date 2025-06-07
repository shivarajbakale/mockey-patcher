import React, { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import type { MockedRequest } from "../store/requests";
import { formatDuration } from "../utils";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/atoms/button/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/atoms/tooltip/tooltip";
import { cn } from "@/lib/utils";

interface MockedListProps {
  requests?: MockedRequest[];
  onDeleteAllMocks: () => void;
  selectedRowsCount?: number;
}

const MockedListComponent = ({
  requests = [],
  onDeleteAllMocks,
  selectedRowsCount,
}: MockedListProps) => {
  const columns = useMemo<ColumnDef<MockedRequest>[]>(
    () => [
      {
        accessorKey: "url",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="URL" />
        ),
        cell: ({ row }) => {
          const url = new URL(row.getValue("url"));
          const fullUrl = url.origin + url.pathname;

          const shouldShowTooltip = fullUrl.length > 20;

          const urlDisplay = (
            <div className={cn("font-medium break-all")}>
              {shouldShowTooltip ? `${fullUrl.slice(0, 60)}...` : fullUrl}
            </div>
          );

          return shouldShowTooltip ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>{urlDisplay}</TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-[500px] break-all">{fullUrl}</p>
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
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Request ID" />
        ),
        cell: ({ row }) => {
          const requestId = row.getValue("id") as string;

          const handleEdit = () => {
            chrome.tabs.create({
              url: `../../../tabs/tab-index.html#/edit/${requestId}`,
            });
          };
          return (
            <div className="font-medium break-all flex items-center gap-2">
              {requestId}
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="hover:bg-transparent"
              >
                Edit
              </Button>
            </div>
          );
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
      selectedRowsCount={selectedRowsCount || 0}
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
