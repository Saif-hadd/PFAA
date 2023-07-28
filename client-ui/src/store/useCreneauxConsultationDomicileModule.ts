import {
  CreneauxConsultationDomicileUpdateInput,
  CreneauxConsultationDomicileCreateInput,
  CreneauxConsultationDomicile,
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
  | CreneauxConsultationDomicile
  | CreneauxConsultationDomicileCreateInput
  | CreneauxConsultationDomicileUpdateInput = {
  jour: "",
  heureDebut: "2023-07-28T08:23:39.376Z",
  heureFin: "2023-07-28T08:23:39.376Z",
  sagesFemmes: { id: "" },
};
export const useCreneauxConsultationDomicileStore = defineStore(
  "creneauxconsultationdomicile-store",
  {
    state: () => {
      return {
        creneauxconsultationdomicileList: [] as Array<
          CreneauxConsultationDomicile
        >,
        error: null as Object | any,
        isLoading: useBodyStore().isLoading,
        creneauxconsultationdomicile: _.cloneDeep(initialState),
        creneauxconsultationdomicileExcelFile: "" as string,
        creneauxconsultationdomicilePagination: {
          skip: 0,
          take: Number(localStorage.getItem("take")) || 5,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchCreneauxConsultationDomiciles(payload?: IPagination) {
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerFindMany({
            skip: payload?.skip ?? undefined,
            take: payload?.take ?? undefined,
          });
          this.creneauxconsultationdomicileList = data.paginatedResult;

          this.creneauxconsultationdomicileList.forEach((element) => {
            for (const [key, value] of Object.entries(element)) {
              if (typeof value == "object" && value) {
                element[key] = Object.values(value);
              }
            }
          });
          this.creneauxconsultationdomicilePagination = {
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
          this.creneauxconsultationdomicileList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
        }
      },
      async fetchDataExcelCreneauxConsultationDomiciles() {
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerFindDataForExcel();
          this.creneauxconsultationdomicileExcelFile = data.file;

          this.error = null;
        } catch (err: any) {
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async softDeleteCreneauxConsultationDomicile(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerUpdate(
            payload,
            { deletedAt: new Date() }
          );
          this.error = null;
          this.fetchCreneauxConsultationDomiciles({
            take: this.creneauxconsultationdomicilePagination.take,
            skip: this.creneauxconsultationdomicilePagination.skip,
          });
        } catch (err: any) {
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
          this.isLoading = false;
        } finally {
          this.isLoading = false;
        }
      },
      async deleteCreneauxConsultationDomicile(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerDelete(
            payload
          );
          this.creneauxconsultationdomicileList = this.creneauxconsultationdomicileList.filter(
            (creneauxconsultationdomicile) =>
              creneauxconsultationdomicile.id !== data.id
          );
          this.creneauxconsultationdomicilePagination.total--;
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
      async editCreneauxConsultationDomicile(payload: {
        id: string;
        data?: CreneauxConsultationDomicileUpdateInput;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerUpdate(
            payload.id,
            payload.data ?? this.creneauxconsultationdomicile
          );
          this.creneauxconsultationdomicileList = this.creneauxconsultationdomicileList.map(
            (item) => (item.id === payload.id ? { ...item, ...data } : item)
          );
          this.error = null;
        } catch (err: any) {
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      } /*
      async editManyCreneauxConsultationDomicile(payload: { data: CreneauxConsultationDomicileUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.creneauxConsultationDomicileControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.creneauxconsultationdomicileList = this.creneauxconsultationdomicileList.map((item) =>
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

      async getCreneauxConsultationDomicileById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerFindOne(
            payload
          );
          this.creneauxconsultationdomicile = data;
          this.error = null;
        } catch (err: any) {
          this.resetCreneauxConsultationDomicile();
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createCreneauxConsultationDomicile(payload?: {
        data: CreneauxConsultationDomicileCreateInput;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerCreate(
            payload?.data ??
              (this
                .creneauxconsultationdomicile as CreneauxConsultationDomicileCreateInput)
          );
          this.creneauxconsultationdomicileList = [
            ...this.creneauxconsultationdomicileList,
            data,
          ];
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createManyCreneauxConsultationDomicile(payload: any) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.creneauxConsultationDomicileControllerCreateMany(
            payload
          );
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },

      resetCreneauxConsultationDomicile() {
        this.creneauxconsultationdomicile = _.cloneDeep(initialState);
      },
    },
  }
);
