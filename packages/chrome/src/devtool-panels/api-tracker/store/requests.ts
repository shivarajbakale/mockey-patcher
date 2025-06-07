import { create } from "zustand";
import type { RequestMetadata } from "../api-tracker";
import {
  deleteAllMocks,
  getMockedRequests,
  sendMockRequests,
} from "../utils/api";
import { sendToBackground } from "@plasmohq/messaging";
import { toast } from "sonner";

export interface MockedRequest {
  id: string;
  requestId: string;
  duration: number;
  url: string;
  method: string;
  status: number;
  numberOfBytes: number;
}

interface SelectionState {
  allSelected: boolean;
  someSelected: boolean;
}

export interface FilterCriteria {
  urlSubstring: string;
  minDuration: number;
  maxDuration: number;
  selectedOrigins: Set<string>;
}
interface RequestsState {
  loading: boolean;
  requests: RequestMetadata[];
  selectedRequestIds: Set<string>;
  selectionState: SelectionState;
  filterCriteria: FilterCriteria;
  mockedRequests: MockedRequest[];
  mockedIds: Set<string>;
  addRequest: (request: RequestMetadata) => void;
  clearRequests: () => void;
  setSelectedRequests: (requests: RequestMetadata[]) => void;
  getSelectionState: () => SelectionState;
  getMockedRequests: () => Promise<RequestMetadata[]>;
  mockSelectedRequests: (requests: RequestMetadata[]) => void;
  deleteAllMocks: () => Promise<void>;
  isMocked: (requestId: string) => boolean;
  addBulkRequests: (requests: RequestMetadata[]) => void;
  setFilterCriteria: (filterCriteria: FilterCriteria) => void;
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
    currentState: RequestsState,
  ) => ({
    ...currentState,
    requests,
    selectedRequestIds: selectedIds,
    selectionState: calculateSelectionState(requests, selectedIds),
  });

  return {
    loading: false,
    requests: [],
    selectedRequestIds: new Set(),
    selectionState: { allSelected: false, someSelected: false },
    filterCriteria: {
      urlSubstring: "",
      minDuration: 0,
      maxDuration: 300000,
      selectedOrigins: new Set(),
    },
    mockedRequests: [],
    mockedIds: new Set(),

    setFilterCriteria: (filterCriteria) =>
      set({
        filterCriteria: {
          ...get().filterCriteria,
          ...filterCriteria,
        },
      }),
    addRequest: (request) =>
      set((state) => {
        const newRequests = [...state.requests, request];
        return getNewState(newRequests, state.selectedRequestIds, state);
      }),
    addBulkRequests: (requests) =>
      set((state) => {
        const newRequests = [...requests];
        const newSelectedIds = new Set(newRequests.map((r) => r.requestId));
        return getNewState(newRequests, newSelectedIds, state);
      }),
    clearRequests: () => set((state) => getNewState([], new Set(), state)),
    setSelectedRequests: (requests: RequestMetadata[]) =>
      set((state) => {
        const newSelectedIds = new Set(requests.map((r) => r.requestId));
        return {
          ...state,
          selectedRequestIds: newSelectedIds,
          selectionState: calculateSelectionState(
            state.requests,
            newSelectedIds,
          ),
        };
      }),

    getSelectionState: () => get().selectionState,
    getMockedRequests: async () => {
      const data = await getMockedRequests();
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
        toast.success("Successfully mocked selected requests", {
          position: "bottom-center",
        });
      });
    },
    deleteAllMocks: async () => {
      set({ loading: true });
      const data = await deleteAllMocks();

      sendToBackground({
        name: "delete-rules",
      });
      set({
        mockedRequests: [],
        mockedIds: new Set(),
        selectedRequestIds: new Set(),
        selectionState: { allSelected: false, someSelected: false },
      });
      set({ loading: false });
      toast.success("Successfully deleted all mocks", {
        position: "bottom-center",
      });
      return data;
    },

    isMocked: (requestId) => get().mockedIds.has(requestId),
  };
});
