import { create } from "zustand";
import type { RequestMetadata } from "../api-tracker";

interface RequestsState {
  requests: RequestMetadata[];
  selectedRequests: RequestMetadata[];
  addRequest: (request: RequestMetadata) => void;
  clearRequests: () => void;
  setSelectedRequests: (requests: RequestMetadata[]) => void;
  toggleRequestSelection: (request: RequestMetadata) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  selectedRequests: [],
  addRequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
    })),
  clearRequests: () =>
    set({
      requests: [],
      selectedRequests: [],
    }),
  setSelectedRequests: (requests) =>
    set({
      selectedRequests: requests,
    }),
  toggleRequestSelection: (request) =>
    set((state) => {
      const isSelected = state.selectedRequests.some(
        (r) => r.id === request.id,
      );
      return {
        selectedRequests: isSelected
          ? state.selectedRequests.filter((r) => r.id !== request.id)
          : [...state.selectedRequests, request],
      };
    }),
}));
