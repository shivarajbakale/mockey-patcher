import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const handleToast = () => {
    toast.success("Hello", {
      description: "Hello World this is the description",
    });
  };
  return (
    <header className={cn("w-full border-b bg-background", className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        <div>
          <span className="text-xl font-bold">Mockey Patcher</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleToast}>
            Settings
          </Button>
        </div>
      </div>
    </header>
  );
}
