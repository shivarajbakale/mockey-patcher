import { create } from "zustand";
import type { RequestMetadata } from "../api-tracker";

interface RequestsState {
  requests: RequestMetadata[];
  selectedRequestIds: Set<string>;
  addRequest: (request: RequestMetadata) => void;
  clearRequests: () => void;
  setSelectedRequests: (requests: RequestMetadata[]) => void;
  toggleRequestSelection: (request: RequestMetadata) => void;
  isRequestSelected: (requestId: string) => boolean;
  getSelectedRequests: () => RequestMetadata[];
}

export const useRequestsStore = create<RequestsState>((set, get) => ({
  requests: [],
  selectedRequestIds: new Set<string>(),
  addRequest: (request) =>
    set((state) => ({
      ...state,
      requests: [...state.requests, request],
    })),
  clearRequests: () =>
    set((state) => ({
      ...state,
      requests: [],
      selectedRequestIds: new Set<string>(),
    })),
  setSelectedRequests: (requests) =>
    set((state) => ({
      ...state,
      selectedRequestIds: new Set(requests.map((r) => r.id)),
    })),
  toggleRequestSelection: (request) =>
    set((state) => {
      const newSelectedIds = new Set(state.selectedRequestIds);
      if (newSelectedIds.has(request.id)) {
        newSelectedIds.delete(request.id);
      } else {
        newSelectedIds.add(request.id);
      }
      return {
        ...state,
        selectedRequestIds: newSelectedIds,
      };
    }),
  isRequestSelected: (requestId) => get().selectedRequestIds.has(requestId),
  getSelectedRequests: () => {
    const state = get();
    return state.requests.filter((request) =>
      state.selectedRequestIds.has(request.id),
    );
  },
}));
