import { RoomUpdateInput, RoomCreateInput, Room } from "./../../index";
import { defineStore } from "pinia";
import service from "@/service";
import { storeToRefs } from "pinia";
import { useBodyStore } from "@/store/useBodyModule";
import _ from "lodash";

interface IPagination {
  take?: number;
  skip?: number;
}
const { isLoading } = storeToRefs(useBodyStore());
const initialState: Room | RoomCreateInput | RoomUpdateInput = {};
export const useRoomStore = defineStore("room-store", {
  state: () => {
    return {
      roomList: [] as Array<Room>,
      error: null as Object | any,
      isLoading: useBodyStore().isLoading,
      room: _.cloneDeep(initialState),
      roomExcelFile: "" as string,
      roomPagination: {
        skip: 0,
        take: Number(localStorage.getItem("take")) || 5,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchRooms(payload?: IPagination) {
      try {
        const { data } = await service.api.roomControllerFindMany({
          skip: payload?.skip ?? undefined,
          take: payload?.take ?? undefined,
        });
        this.roomList = data.paginatedResult;

        this.roomList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.roomPagination = {
          total: data.totalCount,
          skip: payload?.skip ?? 0,
          take: payload?.take ?? data.totalCount,
        };
        localStorage.setItem(
          "take",
          payload?.take?.toString() ?? data.totalCount.toString()
        );
        this.error = null;
      } catch (err: any) {
        this.roomList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
      }
    },
    async fetchDataExcelRooms() {
      try {
        const { data } = await service.api.roomControllerFindDataForExcel();
        this.roomExcelFile = data.file;

        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async softDeleteRoom(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerUpdate(payload, {
          deletedAt: new Date(),
        });
        this.error = null;
        this.fetchRooms({
          take: this.roomPagination.take,
          skip: this.roomPagination.skip,
        });
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteRoom(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerDelete(payload);
        this.roomList = this.roomList.filter((room) => room.id !== data.id);
        this.roomPagination.total--;
        this.isLoading = false;
        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async editRoom(payload: { id: string; data?: RoomUpdateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerUpdate(
          payload.id,
          payload.data ?? this.room
        );
        this.roomList = this.roomList.map((item) =>
          item.id === payload.id ? { ...item, ...data } : item
        );
        this.error = null;
      } catch (err: any) {
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    } /*
      async editManyRoom(payload: { data: RoomUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.roomControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.roomList = this.roomList.map((item) =>
            item.id === payload.id ? { ...item, ...payload.data } : item
          );
          this.error = null;
        } catch (err:any) {
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },*/,

    async getRoomById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerFindOne(payload);
        this.room = data;
        this.error = null;
      } catch (err: any) {
        this.resetRoom();
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createRoom(payload?: { data: RoomCreateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerCreate(
          payload?.data ?? (this.room as RoomCreateInput)
        );
        this.roomList = [...this.roomList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createManyRoom(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.roomControllerCreateMany(payload);
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    resetRoom() {
      this.room = _.cloneDeep(initialState);
    },
  },
});
