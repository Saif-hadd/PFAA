import { PatientUpdateInput, PatientCreateInput, Patient } from "./../../index";
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
const initialState: Patient | PatientCreateInput | PatientUpdateInput = {
  dateNaissance: "2023-07-28T08:23:39.375Z",
  adresse: "",
  medecinTraitant: "",
  room: { id: "" },
  sagesFemmes: { id: "" },
};
export const usePatientStore = defineStore("patient-store", {
  state: () => {
    return {
      patientList: [] as Array<Patient>,
      error: null as Object | any,
      isLoading: useBodyStore().isLoading,
      patient: _.cloneDeep(initialState),
      patientExcelFile: "" as string,
      patientPagination: {
        skip: 0,
        take: Number(localStorage.getItem("take")) || 5,
        total: 0,
      },
    };
  },

  getters: {},

  actions: {
    async fetchPatients(payload?: IPagination) {
      try {
        const { data } = await service.api.patientControllerFindMany({
          skip: payload?.skip ?? undefined,
          take: payload?.take ?? undefined,
        });
        this.patientList = data.paginatedResult;

        this.patientList.forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value == "object" && value) {
              element[key] = Object.values(value);
            }
          }
        });
        this.patientPagination = {
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
        this.patientList = [];
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
      }
    },
    async fetchDataExcelPatients() {
      try {
        const { data } = await service.api.patientControllerFindDataForExcel();
        this.patientExcelFile = data.file;

        this.error = null;
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async softDeletePatient(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerUpdate(payload, {
          deletedAt: new Date(),
        });
        this.error = null;
        this.fetchPatients({
          take: this.patientPagination.take,
          skip: this.patientPagination.skip,
        });
      } catch (err: any) {
        console.error("Error loading  ITEMS", err);
        this.error = err.error;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
      }
    },
    async deletePatient(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerDelete(payload);
        this.patientList = this.patientList.filter(
          (patient) => patient.id !== data.id
        );
        this.patientPagination.total--;
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
    async editPatient(payload: { id: string; data?: PatientUpdateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerUpdate(
          payload.id,
          payload.data ?? this.patient
        );
        this.patientList = this.patientList.map((item) =>
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
      async editManyPatient(payload: { data: PatientUpdateInput; where: any }) {
        this.isLoading  = true;
        try {
          const { data } = await service.api.patientControllerUpdateMany(
            payload.data,
            payload.where
           
          );
          this.patientList = this.patientList.map((item) =>
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

    async getPatientById(payload: string) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerFindOne(payload);
        this.patient = data;
        this.error = null;
      } catch (err: any) {
        this.resetPatient();
        console.error("Error Update  ITEMS", err.error);
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createPatient(payload?: { data: PatientCreateInput }) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerCreate(
          payload?.data ?? (this.patient as PatientCreateInput)
        );
        this.patientList = [...this.patientList, data];
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },
    async createManyPatient(payload: any) {
      this.isLoading = true;
      try {
        const { data } = await service.api.patientControllerCreateMany(payload);
        this.error = null;
      } catch (err: any) {
        this.error = err.error;
      } finally {
        this.isLoading = false;
      }
    },

    resetPatient() {
      this.patient = _.cloneDeep(initialState);
    },
  },
});
