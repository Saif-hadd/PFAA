import {
  SagesFemmeUpdateInput,
  SagesFemmeCreateInput,
  SagesFemme,
} from "./../../index";
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
const initialState:
  | SagesFemme
  | SagesFemmeCreateInput
  | SagesFemmeUpdateInput = {
  geolocalisation: "",
  diplome: "",
  description: "",
  room: { id: "" },
  user: { id: "" },
};
export const useSagesFemmeStore = defineStore("sagesfemme-store", {
  state: () => {
    return {
      sagesfemmeList: [] as Array<SagesFemme>,
      error: null as Object | any,
      isLoading: useBodyStore().isLoading,
      sagesfemme: _.cloneDeep(initialState),
      sagesfemmeExcelFile: "" as string,
      sagesfemmePagination: {
        skip: 0,
        take: Number(localStorage.getItem("take")) || 5,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchSagesFemmes(payload?: IPagination) {
      try {
        const { data } = await service.api.sagesFemmeControllerFindMany({
          skip: payload?.skip ?? undefined,
          take: payload?.take ?? undefined,
        });
        this.sagesfemmeList = data.paginatedResult;

        this.sagesfemmeList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.sagesfemmePagination = {
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
        this.sagesfemmeList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
      }
    },
    async fetchDataExcelSagesFemmes() {
      try {
        const {
          data,
        } = await service.api.sagesFemmeControllerFindDataForExcel();
        this.sagesfemmeExcelFile = data.file;

        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async softDeleteSagesFemme(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerUpdate(payload, {
          deletedAt: new Date(),
        });
        this.error = null;
        this.fetchSagesFemmes({
          take: this.sagesfemmePagination.take,
          skip: this.sagesfemmePagination.skip,
        });
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteSagesFemme(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerDelete(payload);
        this.sagesfemmeList = this.sagesfemmeList.filter(
          (sagesfemme) => sagesfemme.id !== data.id
        );
        this.sagesfemmePagination.total--;
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
    async editSagesFemme(payload: {
      id: string;
      data?: SagesFemmeUpdateInput;
    }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerUpdate(
          payload.id,
          payload.data ?? this.sagesfemme
        );
        this.sagesfemmeList = this.sagesfemmeList.map((item) =>
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
      async editManySagesFemme(payload: { data: SagesFemmeUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.sagesFemmeControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.sagesfemmeList = this.sagesfemmeList.map((item) =>
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

    async getSagesFemmeById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerFindOne(payload);
        this.sagesfemme = data;
        this.error = null;
      } catch (err: any) {
        this.resetSagesFemme();
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createSagesFemme(payload?: { data: SagesFemmeCreateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerCreate(
          payload?.data ?? (this.sagesfemme as SagesFemmeCreateInput)
        );
        this.sagesfemmeList = [...this.sagesfemmeList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createManySagesFemme(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.sagesFemmeControllerCreateMany(
          payload
        );
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    resetSagesFemme() {
      this.sagesfemme = _.cloneDeep(initialState);
    },
  },
});
