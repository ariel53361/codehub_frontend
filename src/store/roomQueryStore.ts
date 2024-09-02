import { create } from "zustand";
import Topic from "../entities/Topic";

export interface RoomQuery {
  topic?: Topic | null;
  sortOrder?: string;
  searchText?: string;
}

export interface RoomQueryStore {
  roomQuery: RoomQuery;
  setSearchText: (searchText: string) => void;
  setTopic: (topic: Topic | null) => void;
  setSortOrder: (sortOrder: string) => void;
  RestRoomQuery: () => void;
}

const useRoomQueryStore = create<RoomQueryStore>((set) => ({
  roomQuery: {},
  setSearchText: (searchText) => set(() => ({ roomQuery: { searchText } })),
  setTopic: (topic) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, topic } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ roomQuery: { ...store.roomQuery, sortOrder } })),
  RestRoomQuery: () => set(() => ({roomQuery:{}})),
}));

export default useRoomQueryStore;
