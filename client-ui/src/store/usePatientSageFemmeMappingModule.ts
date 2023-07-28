import {
  PatientSageFemmeMappingUpdateInput,
  PatientSageFemmeMappingCreateInput,
  PatientSageFemmeMapping,
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
  | PatientSageFemmeMapping
  | PatientSageFemmeMappingCreateInput
  | PatientSageFemmeMappingUpdateInput = {
  estSagefemmeReference: false,
  patient: { id: "" },
  sagesFemmes: { id: "" },
};
export const usePatientSageFemmeMappingStore = defineStore(
  "patientsagefemmemapping-store",
  {
    state: () => {
      return {
        patientsagefemmemappingList: [] as Array<PatientSageFemmeMapping>,
        error: null as Object | any,
        isLoading: useBodyStore().isLoading,
        patientsagefemmemapping: _.cloneDeep(initialState),
        patientsagefemmemappingExcelFile: "" as string,
        patientsagefemmemappingPagination: {
          skip: 0,
          take: Number(localStorage.getItem("take")) || 5,
          total: 0,
        },
      };
    },

    getters: {},

    actions: {
      async fetchPatientSageFemmeMappings(payload?: IPagination) {
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerFindMany({
            skip: payload?.skip ?? undefined,
            take: payload?.take ?? undefined,
          });
          this.patientsagefemmemappingList = data.paginatedResult;

          this.patientsagefemmemappingList.forEach((element) => {
            for (const [key, value] of Object.entries(element)) {
              if (typeof value == "object" && value) {
                element[key] = Object.values(value);
              }
            }
          });
          this.patientsagefemmemappingPagination = {
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
          this.patientsagefemmemappingList = [];
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
        }
      },
      async fetchDataExcelPatientSageFemmeMappings() {
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerFindDataForExcel();
          this.patientsagefemmemappingExcelFile = data.file;

          this.error = null;
        } catch (err: any) {
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async softDeletePatientSageFemmeMapping(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerUpdate(
            payload,
            { deletedAt: new Date() }
          );
          this.error = null;
          this.fetchPatientSageFemmeMappings({
            take: this.patientsagefemmemappingPagination.take,
            skip: this.patientsagefemmemappingPagination.skip,
          });
        } catch (err: any) {
          console.error("Error loading  ITEMS", err);
          this.error = err.error;
          this.isLoading = false;
        } finally {
          this.isLoading = false;
        }
      },
      async deletePatientSageFemmeMapping(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerDelete(
            payload
          );
          this.patientsagefemmemappingList = this.patientsagefemmemappingList.filter(
            (patientsagefemmemapping) => patientsagefemmemapping.id !== data.id
          );
          this.patientsagefemmemappingPagination.total--;
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
      async editPatientSageFemmeMapping(payload: {
        id: string;
        data?: PatientSageFemmeMappingUpdateInput;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerUpdate(
            payload.id,
            payload.data ?? this.patientsagefemmemapping
          );
          this.patientsagefemmemappingList = this.patientsagefemmemappingList.map(
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
      async editManyPatientSageFemmeMapping(payload: { data: PatientSageFemmeMappingUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.patientSageFemmeMappingControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.patientsagefemmemappingList = this.patientsagefemmemappingList.map((item) =>
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

      async getPatientSageFemmeMappingById(payload: string) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerFindOne(
            payload
          );
          this.patientsagefemmemapping = data;
          this.error = null;
        } catch (err: any) {
          this.resetPatientSageFemmeMapping();
          console.error("Error Update  ITEMS", err.error);
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createPatientSageFemmeMapping(payload?: {
        data: PatientSageFemmeMappingCreateInput;
      }) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerCreate(
            payload?.data ??
              (this
                .patientsagefemmemapping as PatientSageFemmeMappingCreateInput)
          );
          this.patientsagefemmemappingList = [
            ...this.patientsagefemmemappingList,
            data,
          ];
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },
      async createManyPatientSageFemmeMapping(payload: any) {
        this.isLoading = true;
        try {
          const {
            data,
          } = await service.api.patientSageFemmeMappingControllerCreateMany(
            payload
          );
          this.error = null;
        } catch (err: any) {
          this.error = err.error;
        } finally {
          this.isLoading = false;
        }
      },

      resetPatientSageFemmeMapping() {
        this.patientsagefemmemapping = _.cloneDeep(initialState);
      },
    },
  }
);
