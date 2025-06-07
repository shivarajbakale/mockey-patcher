import * as React from "react";

import { cn } from "@/lib/utils";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>((props, ref) => (
  <div className="relative w-full h-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", props.className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "sticky top-0 z-10 bg-background backdrop-blur-sm",
      "[&_tr]:border-b",
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "sticky bottom-0 z-10 bg-white/90 backdrop-blur-sm", // ✨
      "border-t font-medium",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors  hover:bg-muted/50 data-[state=selected]:bg-muted",
      props.className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (props, ref) => (
    <th
      ref={ref}
      className={cn(
        "px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ",
        props.className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (props, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0",
        props.className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>((props, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", props.className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
