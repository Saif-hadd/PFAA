<template>
  <div class="mx-auto py-5 ms-4 me-4 h-100">
    <el-card
      shadow="never"
      class="card h-100"
      :body-style="{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }"
    >
      <el-button
        color="#606266"
        class="button__excel"
        :disabled="patientsagefemmemappingList.length === 0"
        @click="dataToExcel"
        >Export to EXCEL</el-button
      >
      <el-table
        :data="patientsagefemmemappingList"
        :row-style="{ background: '$primary-500' }"
        v-loading="isLoading"
      >
        <el-table-column :prop="'id'" :label="'id'" width="80">
          <template #default="scope">
            <el-tooltip placement="right-start">
              <template #content>
                <span>{{ scope.row.id }}</span>
              </template>
              <router-link
                :data-test="`patientsagefemmemappingList_${
                  patientsagefemmemappingList[scope.$index].id
                }`"
                :to="`/${currentUser.role}/${entityPluralName}/${
                  patientsagefemmemappingList[scope.$index].id
                }`"
                >{{ scope.row.id.substring(0, 4) }}...</router-link
              >
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-for="fieldName in fieldsName"
          :key="fieldName"
          :prop="fieldName"
          :label="fieldName.charAt(0).toUpperCase() + fieldName.slice(1)"
        />
        <el-table-column prop="actions" align="right" width="150">
          <template #default="scope">
            <router-link
              :data-test="`patientsagefemmemappingList${fieldName}EditLink_${
                patientsagefemmemappingList[scope.$index].id
              }`"
              :to="`/${currentUser.role}/${entityPluralName}/edit/${
                patientsagefemmemappingList[scope.$index].id
              }`"
              :underline="false"
              type="primary"
              class="me-3"
            >
              <el-button icon="Edit" circle plain link type="success" />
            </router-link>

            <el-button
              :data-test="`patientsagefemmemappingList${fieldName}DeleteBtn_${
                patientsagefemmemappingList[scope.$index].id
              }`"
              @click="
                () =>
                  handleOpenConfirmModal(
                    patientsagefemmemappingList[scope.$index]?.id
                  )
              "
              icon="Delete"
              circle
              plain
              type="danger"
            />
            <ConfirmModal
              :title="$t('confirmModal.deleteTitle')"
              :isLoading="deleteLoading"
              :isOpenModal="
                isOpenModal &&
                modalId === patientsagefemmemappingList[scope.$index].id
              "
              @close-confirm-modal="
                isOpenModal = false;
                modalId = null;
              "
              @approve-confirm-modal="
                () =>
                  handleRemoveEntity(
                    patientsagefemmemappingList[scope.$index]?.id
                  )
              "
            >
              <span>{{ $t("confirmModal.deleteContent") }} </span>
            </ConfirmModal>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer__wrapper">
        <Pagination
          :itemsPerPage="patientsagefemmemappingPagination.take"
          :set-items-per-page="setItemsPerPage"
          :page="
            Math.floor(
              patientsagefemmemappingPagination.skip /
                patientsagefemmemappingPagination.take
            ) + 1
          "
          :current-page-change="currentPageChange"
          :total="patientsagefemmemappingPagination.total._count?._all"
          :pages-array="[5, 20, 50, 100]"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineAsyncComponent } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { usePatientSageFemmeMappingStore } from "@/store/usePatientSageFemmeMappingModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import { useBodyStore } from "@/store/useBodyModule";
import * as XLSX from "xlsx";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
const entityPluralName = "patientsagefemmemappings";
const fieldsName = ref(["estSagefemmeReference", "patient", "sagesFemmes"]);
const isOpenModal = ref(false);
const modalId = ref<string | null>(null);
const { isLoading } = storeToRefs(useBodyStore());
const {
  patientsagefemmemappingList,
  patientsagefemmemappingPagination,
  patientsagefemmemappingExcelFile,
} = storeToRefs(usePatientSageFemmeMappingStore());
const {
  fetchPatientSageFemmeMappings,
  deletePatientSageFemmeMapping,
  fetchDataExcelPatientSageFemmeMappings,
  softDeletePatientSageFemmeMapping,
} = usePatientSageFemmeMappingStore();

async function dataToExcel() {
  await fetchDataExcelPatientSageFemmeMappings();
  const workbook = XLSX.read(patientsagefemmemappingExcelFile.value.toString());
  XLSX.writeFile(workbook, "patientsagefemmemappingData.xlsx");
}
const deleteLoading = ref<boolean>(false);
const handleRemoveEntity = async (id: string) => {
  deleteLoading.value = true;
  await softDeletePatientSageFemmeMapping(id);
  deleteLoading.value = false;
};
const handleOpenConfirmModal = (id: string) => {
  isOpenModal.value = true;
  modalId.value = id;
};
const setItemsPerPage = async (event: any) => {
  await fetchPatientSageFemmeMappings({
    skip: 0,
    take: parseInt(event.target.value),
  });
};
const currentPageChange = async (val: number) => {
  await fetchPatientSageFemmeMappings({
    skip: (val - 1) * patientsagefemmemappingPagination.value.take,
    take: patientsagefemmemappingPagination.value.take,
  });
};
onMounted(async () => {
  setCurrentPageBreadcrumbs(entityPluralName, []);
  await fetchPatientSageFemmeMappings({
    skip: 0,
    take: Number(localStorage.getItem("take")) || 5,
  });
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
.footer__wrapper {
  border-top: solid 1px $bd-card-color;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-inline: 20px;
  height: 76px;
  margin-bottom: 0;
}

.button__excel {
  display: max-content;
  align-self: end;
}

:deep(.el-card__body) {
  justify-content: flex-start !important;
}
:deep(.el-table) {
  margin-top: 17px;
}
:deep(.el-table .cell) {
  line-height: 39px;
}
</style>
