import { MessageUpdateInput, MessageCreateInput, Message } from "./../../index";
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
const initialState: Message | MessageCreateInput | MessageUpdateInput = {
  contenu: "",
  dateReception: "2023-07-28T08:23:39.376Z",
  room: { id: "" },
  user: { id: "" },
};
export const useMessageStore = defineStore("message-store", {
  state: () => {
    return {
      messageList: [] as Array<Message>,
      error: null as Object | any,
      isLoading: useBodyStore().isLoading,
      message: _.cloneDeep(initialState),
      messageExcelFile: "" as string,
      messagePagination: {
        skip: 0,
        take: Number(localStorage.getItem("take")) || 5,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchMessages(payload?: IPagination) {
      try {
        const { data } = await service.api.messageControllerFindMany({
          skip: payload?.skip ?? undefined,
          take: payload?.take ?? undefined,
        });
        this.messageList = data.paginatedResult;

        this.messageList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.messagePagination = {
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
        this.messageList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
      }
    },
    async fetchDataExcelMessages() {
      try {
        const { data } = await service.api.messageControllerFindDataForExcel();
        this.messageExcelFile = data.file;

        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async softDeleteMessage(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerUpdate(payload, {
          deletedAt: new Date(),
        });
        this.error = null;
        this.fetchMessages({
          take: this.messagePagination.take,
          skip: this.messagePagination.skip,
        });
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteMessage(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerDelete(payload);
        this.messageList = this.messageList.filter(
          (message) => message.id !== data.id
        );
        this.messagePagination.total--;
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
    async editMessage(payload: { id: string; data?: MessageUpdateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerUpdate(
          payload.id,
          payload.data ?? this.message
        );
        this.messageList = this.messageList.map((item) =>
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
      async editManyMessage(payload: { data: MessageUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.messageControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.messageList = this.messageList.map((item) =>
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

    async getMessageById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerFindOne(payload);
        this.message = data;
        this.error = null;
      } catch (err: any) {
        this.resetMessage();
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createMessage(payload?: { data: MessageCreateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerCreate(
          payload?.data ?? (this.message as MessageCreateInput)
        );
        this.messageList = [...this.messageList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createManyMessage(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.messageControllerCreateMany(payload);
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    resetMessage() {
      this.message = _.cloneDeep(initialState);
    },
  },
});
