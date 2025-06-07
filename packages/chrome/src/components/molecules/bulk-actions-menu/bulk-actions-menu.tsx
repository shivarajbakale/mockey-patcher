import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog/dialog";
import { Button } from "@/components/atoms/button/button";
import { TargetIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

interface BulkActionsMenuProps<T> {
  selectedItems: T[];
  onAction: (items: T[]) => Promise<void>;
  getItemIdentifier: (item: T) => string;
  className?: string;
  actions?: "delete" | "mock";
}

export function BulkActionsMenu<T>({
  selectedItems,
  onAction,
  getItemIdentifier,
  className,
  actions = "delete",
}: BulkActionsMenuProps<T>) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showMockDialog, setShowMockDialog] = React.useState(false);

  const handleDelete = async () => {
    try {
      await onAction(selectedItems);
      toast.success(`Successfully deleted ${selectedItems.length} items`);
    } catch {
      toast.error("Failed to delete selected items");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleMock = async () => {
    try {
      await onAction(selectedItems);
    } catch {
      toast.error("Failed to mock selected requests");
    } finally {
      setShowMockDialog(false);
    }
  };

  const bulkActionButtons = {
    delete: (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2Icon className="h-4 w-4" />
        Delete Selected
      </Button>
    ),
    mock: (
      <Button
        variant="default"
        size="sm"
        onClick={() => setShowMockDialog(true)}
      >
        <TargetIcon className="h-4 w-4" />
        Mock Selected
      </Button>
    ),
  };

  if (selectedItems.length === 0) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg border bg-background p-4 shadow-lg ${className}`}
    >
      <span className="text-sm font-medium">
        {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""}{" "}
        selected
      </span>
      {bulkActionButtons[actions]}

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Selected Items</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedItems.length} selected{" "}
              {selectedItems.length === 1 ? "item" : "items"}?
              <ul className="mt-2 max-h-32 overflow-auto text-sm">
                {selectedItems.map((item) => (
                  <li
                    key={getItemIdentifier(item)}
                    className="text-muted-foreground"
                  >
                    • {getItemIdentifier(item)}
                  </li>
                ))}
              </ul>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mock Dialog */}
      <Dialog open={showMockDialog} onOpenChange={setShowMockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mock Selected Requests</DialogTitle>
            <DialogDescription>
              Are you sure you want to create mocks for {selectedItems.length}{" "}
              selected {selectedItems.length === 1 ? "request" : "requests"}?
              <ul className="mt-2 max-h-32 overflow-auto text-sm">
                Selected {selectedItems.length} requests will be mocked.
              </ul>
              This will create mock responses for these requests.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMockDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMock}>Mock Requests</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
