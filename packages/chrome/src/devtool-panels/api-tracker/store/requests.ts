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
  getSelectedRequests: () => RequestMetadata[];
  getSelectionState: () => SelectionState;
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

export const useRequestsStore = create<RequestsState>((set, get) => {
  const getNewState = (
    requests: RequestMetadata[],
    selectedIds: Set<string>,
  ) => ({
    requests,
    selectedRequestIds: selectedIds,
    selectionState: calculateSelectionState(requests, selectedIds),
  });

  return {
    ...getNewState([], new Set()),

    addRequest: (request) =>
      set((state) => {
        const newRequests = [...state.requests, request];
        return getNewState(newRequests, state.selectedRequestIds);
      }),

    clearRequests: () => set(() => getNewState([], new Set())),

    setSelectedRequests: (requests) =>
      set((state) => {
        const newSelectedIds = new Set(requests.map((r) => r.id));
        return getNewState(state.requests, newSelectedIds);
      }),

    toggleRequestSelection: (request) =>
      set((state) => {
        const newSelectedIds = new Set(state.selectedRequestIds);
        if (newSelectedIds.has(request.id)) {
          newSelectedIds.delete(request.id);
        } else {
          newSelectedIds.add(request.id);
        }
        return getNewState(state.requests, newSelectedIds);
      }),

    isRequestSelected: (requestId) => get().selectedRequestIds.has(requestId),

    getSelectedRequests: () =>
      get().requests.filter((r) => get().selectedRequestIds.has(r.id)),

    getSelectionState: () => get().selectionState,
  };
});
