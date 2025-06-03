import React from "react";
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
  const { selectedRequests, setSelectedRequests } = useRequestsStore();

  const columns: ColumnDef<RequestMetadata>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            const selectedRows = table.getSelectedRowModel().rows;
            setSelectedRequests(selectedRows.map((row) => row.original));
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
              setSelectedRequests([...selectedRequests, row.original]);
            } else {
              setSelectedRequests(
                selectedRequests.filter((r) => r.id !== row.original.id),
              );
            }
          }}
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
  ];

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
