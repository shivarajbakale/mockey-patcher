import { create } from "zustand";
import type { RequestMetadata } from "../api-tracker";

interface SelectionState {
  allSelected: boolean;
  someSelected: boolean;
}

interface RequestsState {
  requests: RequestMetadata[];
  selectedRequestIds: Set<string>;
  selectionState: SelectionState;
  addRequest: (request: RequestMetadata) => void;
  clearRequests: () => void;
  setSelectedRequests: (requests: RequestMetadata[]) => void;
  toggleRequestSelection: (request: RequestMetadata) => void;
  isRequestSelected: (requestId: string) => boolean;
}

const calculateSelectionState = (
  requests: RequestMetadata[],
  selectedIds: Set<string>,
): SelectionState => {
  if (requests.length === 0) return { allSelected: false, someSelected: false };
  const allSelected = requests.every((r) => selectedIds.has(r.id));
  const someSelected =
    requests.some((r) => selectedIds.has(r.id)) && !allSelected;
  return { allSelected, someSelected };
};

export const useRequestsStore = create<RequestsState>((set, get) => ({
  requests: [],
  selectedRequestIds: new Set<string>(),
  selectionState: { allSelected: false, someSelected: false },

  addRequest: (request) =>
    set((state) => ({
      ...state,
      requests: [...state.requests, request],
      selectionState: calculateSelectionState(
        [...state.requests, request],
        state.selectedRequestIds,
      ),
    })),

  clearRequests: () =>
    set({
      requests: [],
      selectedRequestIds: new Set<string>(),
      selectionState: { allSelected: false, someSelected: false },
    }),

  setSelectedRequests: (requests) =>
    set((state) => {
      const newSelectedIds = new Set(requests.map((r) => r.id));
      return {
        ...state,
        selectedRequestIds: newSelectedIds,
        selectionState: calculateSelectionState(state.requests, newSelectedIds),
      };
    }),

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
        selectionState: calculateSelectionState(state.requests, newSelectedIds),
      };
    }),

  isRequestSelected: (requestId) => get().selectedRequestIds.has(requestId),
}));
