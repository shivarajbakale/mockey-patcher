import React, { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/atoms/data-table/data-table";
import { DataTableColumnHeader } from "@/components/atoms/data-table/data-table-column-header";
import { type MockedRequest } from "@/devtool-panels/api-tracker/store/requests";
import { formatDuration } from "@/devtool-panels/api-tracker/utils";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { BulkActionsMenu } from "@/components/molecules/bulk-actions-menu/bulk-actions-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu/dropdown-menu";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/atoms/alert-dialog/alert-dialog";
import { Button } from "@/components/atoms/button/button";
import { MoreHorizontal } from "lucide-react";
import { useMocksStore } from "@/devtool-panels/api-tracker/store/mocks";

interface MockedListProps {
  requests?: MockedRequest[];
  selectedRowsCount?: number;
}

const MockedListComponent = ({
  requests = [],
  selectedRowsCount,
}: MockedListProps) => {
  const [selectedRows, setSelectedRows] = useState<MockedRequest[]>([]);
  const { deleteMock } = useMocksStore();
  const navigate = useNavigate();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(requests);
    } else {
      setSelectedRows([]);
    }
  };

  const handleBulkDelete = async (items: MockedRequest[]) => {
    for (const item of items) {
      await deleteMock(item.id);
    }
    setSelectedRows([]);
  };

  const columns = useMemo<ColumnDef<MockedRequest>[]>(
    () => [
      {
        id: "select",
        header: () => {
          const isAllSelected =
            requests.length > 0 && selectedRows.length === requests.length;
          const isIndeterminate =
            selectedRows.length > 0 && selectedRows.length < requests.length;

          return (
            <Checkbox
              checked={isIndeterminate ? "indeterminate" : isAllSelected}
              onCheckedChange={handleSelectAll}
              aria-label="Select all"
              className="translate-y-[2px]"
            />
          );
        },
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={selectedRows.some((r) => r.id === row.original.id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedRows([...selectedRows, row.original]);
                } else {
                  setSelectedRows(
                    selectedRows.filter((r) => r.id !== row.original.id),
                  );
                }
              }}
              aria-label="Select row"
              className="translate-y-[2px]"
            />
          );
        },
        enableSorting: false,
        enableHiding: false,
        size: 40,
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
        id: "actions",
        cell: ({ row }) => {
          const request = row.original;
          const [showDeleteDialog, setShowDeleteDialog] = useState(false);

          const handleEdit = () => {
            navigate(`/edit/${request.id}`);
          };

          const handleDelete = () => {
            deleteMock(request?.id);
            setShowDeleteDialog(false);
          };

          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleEdit}>
                    Edit Mock
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
                    Delete Mock
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(request.id)}
                  >
                    Copy Mock ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Mock</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the mock response for{" "}
                      {request.url}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          );
        },
      },
    ],
    [selectedRows, requests, handleSelectAll, navigate],
  );

  return (
    <div className="relative">
      <DataTable
        columns={columns}
        data={requests}
        selectedRowsCount={selectedRowsCount || 0}
      />
      <BulkActionsMenu
        selectedItems={selectedRows}
        onAction={handleBulkDelete}
        getItemIdentifier={(item) => item.url}
      />
    </div>
  );
};

MockedListComponent.displayName = "MockedList";

export const MockedList = React.memo(MockedListComponent);
