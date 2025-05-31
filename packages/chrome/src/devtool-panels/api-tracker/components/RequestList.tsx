import React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import { Typography } from "@/components/atoms/typography/typography";
import type { RequestMetadata } from "./main";
import { formatBytes, formatDuration, getMethodColor } from "../utils";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";

interface RequestListProps {
  requests: RequestMetadata[];
}

export const RequestList = ({ requests = [] }: RequestListProps) => {
  const columns: ColumnDef<RequestMetadata>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
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
      size: 20,
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
      accessorKey: "method",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Method" />
      ),
      cell: ({ row }) => (
        <div
          className={`font-medium rounded-lg w-1 ${getMethodColor(
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
    {
      accessorKey: "url",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL" />
      ),
      cell: ({ row }) => (
        <div className="max-w-[500px] truncate">{row.getValue("url")}</div>
      ),
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
  ];

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Typography variant="small" className="text-muted-foreground">
          No requests found
        </Typography>
      </div>
    );
  }

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
