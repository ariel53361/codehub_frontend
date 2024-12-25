import { create } from "zustand";
import Topic from "../entities/Topic";

export interface RoomQuery {
  topic?: Topic | null;
  sortOrder?: string;
  searchText?: string;
  page: number;
}

export const defaultRoomQuery: RoomQuery = {
  page: 1,
};

export interface RoomQueryStore {
  roomQuery: RoomQuery;
  setSearchText: (searchText: string) => void;
  setTopic: (topic: Topic | null) => void;
  setSortOrder: (sortOrder: string) => void;
  setPage: (pageNumber: number) => void;
  resetRoomQuery: () => void;
}

const useRoomQueryStore = create<RoomQueryStore>((set) => ({
  roomQuery: { ...defaultRoomQuery },
  setSearchText: (searchText) =>
    set((store) => ({
      roomQuery: {
        ...store.roomQuery,
        ...defaultRoomQuery,
        searchText,
      },
    })),
  setTopic: (topic) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, topic, page: 1 } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, sortOrder } })),
  setPage: (page) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, page } })),
  resetRoomQuery: () => set(() => ({ roomQuery: defaultRoomQuery })),
}));

export default useRoomQueryStore;
