import { create } from "zustand";
import type { RequestMetadata } from "../api-tracker";
import {
  deleteAllMocks,
  getMockedRequests,
  sendMockRequests,
} from "../utils/api";
import { sendToBackground } from "@plasmohq/messaging";

export interface MockedRequest {
  id: string;
  requestId: string;
  duration: number;
  url: string;
  method: string;
}

interface SelectionState {
  allSelected: boolean;
  someSelected: boolean;
}

interface RequestsState {
  loading: boolean;
  requests: RequestMetadata[];
  selectedRequestIds: Set<string>;
  selectionState: SelectionState;
  mockedRequests: MockedRequest[];
  mockedIds: Set<string>;
  addRequest: (request: RequestMetadata) => void;
  clearRequests: () => void;
  setSelectedRequests: (requests: RequestMetadata[]) => void;
  toggleRequestSelection: (request: RequestMetadata) => void;
  isRequestSelected: (requestId: string) => boolean;
  getSelectedRequests: () => RequestMetadata[];
  getSelectionState: () => SelectionState;
  getMockedRequests: () => Promise<RequestMetadata[]>;
  mockSelectedRequests: (requests: RequestMetadata[]) => void;
  deleteAllMocks: () => Promise<void>;
  isMocked: (requestId: string) => boolean;
}

const calculateSelectionState = (
  requests: RequestMetadata[],
  selectedIds: Set<string>,
): SelectionState => {
  if (requests.length === 0) return { allSelected: false, someSelected: false };
  const allSelected = requests.every((r) => selectedIds.has(r.requestId));
  const someSelected =
    requests.some((r) => selectedIds.has(r.requestId)) && !allSelected;
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
    loading: false,
    mockedRequests: [],
    mockedIds: new Set(),
    addRequest: (request) =>
      set((state) => {
        const newRequests = [...state.requests, request];
        return getNewState(newRequests, state.selectedRequestIds);
      }),

    clearRequests: () => set(() => getNewState([], new Set())),

    setSelectedRequests: (requests) =>
      set((state) => {
        const newSelectedIds = new Set(requests.map((r) => r.requestId));
        return getNewState(state.requests, newSelectedIds);
      }),

    toggleRequestSelection: (request) =>
      set((state) => {
        const newSelectedIds = new Set(state.selectedRequestIds);
        if (newSelectedIds.has(request.requestId)) {
          newSelectedIds.delete(request.requestId);
        } else {
          newSelectedIds.add(request.requestId);
        }
        return getNewState(state.requests, newSelectedIds);
      }),

    isRequestSelected: (requestId) => get().selectedRequestIds.has(requestId),

    getSelectedRequests: () =>
      get().requests.filter((r) => get().selectedRequestIds.has(r.requestId)),

    getSelectionState: () => get().selectionState,
    getMockedRequests: async () => {
      const data = await getMockedRequests();
      console.log("This is the data", data);
      const mockedIds = new Set(data.map((r) => r.requestId) as string[]);
      set({ mockedRequests: data, mockedIds });
      return data;
    },
    mockSelectedRequests: (requests) => {
      set({ loading: true });
      sendMockRequests(requests).then((data) => {
        const mockIds = new Set(data.map((r) => r.requestId) as string[]);
        const selectedRequestIds = new Set() as Set<string>;
        sendToBackground({
          name: "enable-mocking",
          body: { requests: data },
        });
        set({
          loading: false,
          mockedRequests: data,
          mockedIds: mockIds,
          selectedRequestIds: selectedRequestIds,
        });
      });
    },
    deleteAllMocks: async () => {
      set({ loading: true });
      const data = await deleteAllMocks();
      set({
        mockedRequests: [],
        mockedIds: new Set(),
        selectedRequestIds: new Set(),
        selectionState: { allSelected: false, someSelected: false },
      });
      set({ loading: false });
      return data;
    },
    isMocked: (requestId) => get().mockedIds.has(requestId),
  };
});
