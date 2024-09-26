import { create } from "zustand";
import Topic from "../entities/Topic";

export interface RoomQuery {
  topic?: Topic | null;
  sortOrder?: string;
  searchText?: string;
  page: number;
  pageSize: number;
}

export interface RoomQueryStore {
  roomQuery: RoomQuery;
  setSearchText: (searchText: string) => void;
  setTopic: (topic: Topic | null) => void;
  setSortOrder: (sortOrder: string) => void;
  RestRoomQuery: () => void;
}

const useRoomQueryStore = create<RoomQueryStore>((set) => ({
  roomQuery: {page:1, pageSize:10},
  setSearchText: (searchText) => set(() => ({ roomQuery: { searchText, page:1, pageSize:10 } })),
  setTopic: (topic) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, topic } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, sortOrder } })),
  RestRoomQuery: () => set(() => ({ roomQuery: {page:1, pageSize:10} })),
}));

export default useRoomQueryStore;
