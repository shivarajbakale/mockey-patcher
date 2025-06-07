import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog/dialog";
import { Input } from "@/components/atoms/input/input";
import { Label } from "@/components/atoms/label";
import { Button } from "@/components/atoms/button/button";
import { Badge } from "@/components/atoms/badge/badge";
import { Slider } from "@/components/atoms/slider/slider";
import {
  type FilterCriteria,
  useRequestsStore,
} from "@/devtool-panels/api-tracker/store/requests";
import { MultiSelect } from "@/components/atoms/multi-select/multiselect";
import { Globe } from "lucide-react";

interface MockSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MockSelectionDialog({
  open,
  onOpenChange,
}: MockSelectionDialogProps) {
  const { requests, setFilterCriteria } = useRequestsStore();
  const [matchingCount, setMatchingCount] = useState<number>(requests.length);
  const [currentFilterCriteria, setCurrentFilterCriteria] =
    useState<FilterCriteria>(useRequestsStore.getState().filterCriteria);

  const uniqueOrigins = useMemo(() => {
    const origins = new Set<string>();
    requests.forEach((request) => {
      const url = new URL(request.url);
      origins.add(url.origin);
    });
    return Array.from(origins).sort();
  }, [requests]);

  const originOptions = useMemo(() => {
    return uniqueOrigins.map((origin) => ({
      label: origin,
      value: origin,
      icon: Globe,
    }));
  }, [uniqueOrigins]);

  const maxAvailableDuration = useMemo(() => {
    if (requests.length === 0) return 5000; // Default to 5 seconds if no requests

    const maxRequestDuration = Math.max(
      ...requests.map((request) => request.duration),
    );
    return Math.max(maxRequestDuration, currentFilterCriteria.maxDuration);
  }, [requests, currentFilterCriteria.maxDuration]);

  useEffect(() => {
    // If we're still at the default max duration and there are longer requests,
    // automatically expand the range to include them
    const defaultMaxDuration =
      useRequestsStore.getState().filterCriteria.maxDuration;
    if (
      currentFilterCriteria.maxDuration === defaultMaxDuration &&
      maxAvailableDuration > defaultMaxDuration
    ) {
      setCurrentFilterCriteria((prev) => ({
        ...prev,
        maxDuration: maxAvailableDuration,
      }));
    }
  }, [maxAvailableDuration, currentFilterCriteria.maxDuration]);

  useEffect(() => {
    const matching = requests.filter((request) => {
      const url = new URL(request.url);
      const matchesOrigin =
        currentFilterCriteria.selectedOrigins.size === 0 ||
        currentFilterCriteria.selectedOrigins.has(url.origin);
      const matchesSubstring = request.url
        .toLowerCase()
        .includes(currentFilterCriteria.urlSubstring.toLowerCase());
      const matchesDuration =
        request.duration >= currentFilterCriteria.minDuration &&
        request.duration <= currentFilterCriteria.maxDuration;
      return matchesSubstring && matchesDuration && matchesOrigin;
    });
    setMatchingCount(matching.length);
  }, [currentFilterCriteria, requests]);

  const handleSubmit = () => {
    setFilterCriteria({
      urlSubstring: currentFilterCriteria.urlSubstring,
      minDuration: currentFilterCriteria.minDuration,
      maxDuration: currentFilterCriteria.maxDuration,
      selectedOrigins: currentFilterCriteria.selectedOrigins,
    });
    onOpenChange(false);
  };

  const handleOriginChange = (selectedValues: string[]) => {
    setCurrentFilterCriteria({
      urlSubstring: currentFilterCriteria.urlSubstring,
      minDuration: currentFilterCriteria.minDuration,
      maxDuration: currentFilterCriteria.maxDuration,
      selectedOrigins: new Set(selectedValues),
    });
  };
  const selectedOrigins = useMemo(() => {
    if (currentFilterCriteria.selectedOrigins.size === uniqueOrigins.length) {
      return originOptions;
    }
    if (currentFilterCriteria.selectedOrigins.size === 0) {
      return originOptions;
    }
    return originOptions.filter((origin) =>
      currentFilterCriteria.selectedOrigins.has(origin.label),
    );
  }, [currentFilterCriteria.selectedOrigins, uniqueOrigins]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Filter Requests</DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-between">
              <p>Filter all requests by URL and duration</p>
              <Badge variant="outline" className="text-base">
                {matchingCount} of {requests.length} requests match
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Origins Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Filter by Origins</Label>
              <span className="text-sm text-muted-foreground">
                {currentFilterCriteria.selectedOrigins.size} origins selected
              </span>
            </div>
            <MultiSelect
              options={selectedOrigins}
              onValueChange={handleOriginChange}
              defaultValue={selectedOrigins.map((origin) => origin.value)}
              placeholder="Select origins to filter..."
              maxCount={3}
              variant="secondary"
            />
          </div>

          {/* URL Substring Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>URL Contains</Label>
              <span className="text-sm text-muted-foreground">
                {
                  requests.filter((request) =>
                    request.url
                      .toLowerCase()
                      .includes(
                        currentFilterCriteria.urlSubstring.toLowerCase(),
                      ),
                  ).length
                }{" "}
                matching URLs
              </span>
            </div>
            <Input
              placeholder="Enter URL substring to filter"
              value={currentFilterCriteria.urlSubstring}
              onChange={(e) =>
                setCurrentFilterCriteria({
                  ...currentFilterCriteria,
                  urlSubstring: e.target.value,
                })
              }
            />
          </div>

          {/* Duration Range Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Duration Range (ms)</Label>
              <span className="text-sm text-muted-foreground">
                {
                  requests.filter(
                    (request) =>
                      request.duration >= currentFilterCriteria.minDuration &&
                      request.duration <= currentFilterCriteria.maxDuration,
                  ).length
                }{" "}
                within range
              </span>
            </div>
            <div className="space-y-6">
              <Slider
                min={0}
                max={Math.floor(maxAvailableDuration)}
                step={100}
                value={[
                  currentFilterCriteria.minDuration,
                  currentFilterCriteria.maxDuration,
                ]}
                onValueChange={([min, max]) =>
                  setCurrentFilterCriteria({
                    ...currentFilterCriteria,
                    minDuration: Math.floor(min),
                    maxDuration: Math.floor(max),
                  })
                }
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{currentFilterCriteria.minDuration}ms</span>
                <span>{currentFilterCriteria.maxDuration}ms</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="space-y-2">
              <h4 className="font-medium">Filter Summary</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>• {matchingCount} requests match all criteria</p>
                <p>
                  • Duration range: {currentFilterCriteria.minDuration}ms to{" "}
                  {currentFilterCriteria.maxDuration}ms
                </p>
                {currentFilterCriteria.urlSubstring && (
                  <p>
                    • URL contains: &ldquo;{currentFilterCriteria.urlSubstring}
                    &rdquo;
                  </p>
                )}
                {currentFilterCriteria.selectedOrigins.size > 0 && (
                  <p>
                    • {currentFilterCriteria.selectedOrigins.size} origins
                    selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
