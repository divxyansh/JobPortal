import * as React from "react";
import PropTypes from 'prop-types';
import { cn } from "@/lib/utils";

// Define the Table component
const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} />
  </div>
));
Table.displayName = "Table";

// Define the TableHeader component
const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// Define the TableBody component
const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} />
));
TableBody.displayName = "TableBody";

// Define the TableFooter component
const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props} />
));
TableFooter.displayName = "TableFooter";

// Define the TableRow component
const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} />
));
TableRow.displayName = "TableRow";

// Define the TableHead component
const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props} />
));
TableHead.displayName = "TableHead";

// Define the TableCell component
const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props} />
));
TableCell.displayName = "TableCell";

// Define the TableCaption component
const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} />
));
TableCaption.displayName = "TableCaption";

// Define PropTypes for each component
Table.propTypes = {
  className: PropTypes.string,
};

TableHeader.propTypes = {
  className: PropTypes.string,
};

TableBody.propTypes = {
  className: PropTypes.string,
};

TableFooter.propTypes = {
  className: PropTypes.string,
};

TableRow.propTypes = {
  className: PropTypes.string,
};

TableHead.propTypes = {
  className: PropTypes.string,
};

TableCell.propTypes = {
  className: PropTypes.string,
};

TableCaption.propTypes = {
  className: PropTypes.string,
};

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
