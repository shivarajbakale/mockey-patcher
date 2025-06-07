import { create } from "zustand";
import { fetchMock, deleteMock, updateMock } from "../utils/api";
import { useRequestsStore } from "./requests";
import { sendToBackground } from "@plasmohq/messaging";
import { toast } from "sonner";

interface MocksState {
  currentMock: object;
  loading: boolean;
  setCurrentMock: (mock: object) => void;
  getCurrentMock: () => object;
  fetchCurrentMock: (id: string) => Promise<object>;
  deleteMock: (id: string) => Promise<object>;
  updateMock: (id: string, responseBody: object) => Promise<object>;
}

const useMocksStore = create<MocksState>((set, get) => {
  return {
    currentMock: {},
    loading: false,
    setCurrentMock: (mock) => set({ currentMock: mock }),
    fetchCurrentMock: async (id) => {
      set({ currentMock: {}, loading: true });
      try {
        const mock = await fetchMock(id);
        set({ currentMock: mock });
        return mock;
      } catch (error) {
        toast.error("Failed to fetch mock response");
        throw error;
      } finally {
        set({ loading: false });
      }
    },
    getCurrentMock: () => get().currentMock,
    deleteMock: async (id) => {
      set({ loading: true });
      try {
        const mock = await deleteMock(id);
        set({ currentMock: {} });
        const { getMockedRequests } = useRequestsStore.getState();
        getMockedRequests();
        sendToBackground({
          name: "delete-rule",
          body: { id },
        });
        toast.success("Deleted Mock", {
          description: "Mock response deleted successfully",
        });
        return mock;
      } catch (error) {
        toast.error("Failed to delete mock response");
        throw error;
      } finally {
        set({ loading: false });
      }
    },
    updateMock: async (id, responseBody) => {
      set({ loading: true });
      try {
        const updatedMock = await updateMock(id, responseBody);
        set({ currentMock: updatedMock });
        const { getMockedRequests } = useRequestsStore.getState();
        getMockedRequests();
        toast.success("Updated Mock", {
          description: "Mock response updated successfully",
        });
        return updatedMock;
      } catch (error) {
        toast.error("Failed to update mock response");
        throw error;
      } finally {
        set({ loading: false });
      }
    },
  };
});

export { useMocksStore };
