import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/atoms/button/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-between plasmo-px-2">
      <div className="plasmo-flex-1 plasmo-text-sm plasmo-text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="plasmo-flex plasmo-items-center plasmo-space-x-6 lg:plasmo-space-x-8">
        <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
          <p className="plasmo-text-sm plasmo-font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="plasmo-h-8 plasmo-w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="plasmo-flex plasmo-w-[100px] plasmo-items-center plasmo-justify-center plasmo-text-sm plasmo-font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="plasmo-flex plasmo-items-center plasmo-space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="plasmo-hidden plasmo-h-8 plasmo-w-8 lg:plasmo-flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="plasmo-sr-only">Go to first page</span>
            <ChevronsLeft className="plasmo-h-4 plasmo-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="plasmo-h-8 plasmo-w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="plasmo-sr-only">Go to previous page</span>
            <ChevronLeft className="plasmo-h-4 plasmo-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="plasmo-h-8 plasmo-w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="plasmo-sr-only">Go to next page</span>
            <ChevronRight className="plasmo-h-4 plasmo-w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="plasmo-hidden plasmo-h-8 plasmo-w-8 lg:plasmo-flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="plasmo-sr-only">Go to last page</span>
            <ChevronsRight className="plasmo-h-4 plasmo-w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
