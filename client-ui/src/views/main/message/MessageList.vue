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
        :disabled="messageList.length === 0"
        @click="dataToExcel"
        >Export to EXCEL</el-button
      >
      <el-table
        :data="messageList"
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
                :data-test="`messageList_${messageList[scope.$index].id}`"
                :to="`/${currentUser.role}/${entityPluralName}/${
                  messageList[scope.$index].id
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
              :data-test="`messageList${fieldName}EditLink_${
                messageList[scope.$index].id
              }`"
              :to="`/${currentUser.role}/${entityPluralName}/edit/${
                messageList[scope.$index].id
              }`"
              :underline="false"
              type="primary"
              class="me-3"
            >
              <el-button icon="Edit" circle plain link type="success" />
            </router-link>

            <el-button
              :data-test="`messageList${fieldName}DeleteBtn_${
                messageList[scope.$index].id
              }`"
              @click="
                () => handleOpenConfirmModal(messageList[scope.$index]?.id)
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
                isOpenModal && modalId === messageList[scope.$index].id
              "
              @close-confirm-modal="
                isOpenModal = false;
                modalId = null;
              "
              @approve-confirm-modal="
                () => handleRemoveEntity(messageList[scope.$index]?.id)
              "
            >
              <span>{{ $t("confirmModal.deleteContent") }} </span>
            </ConfirmModal>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer__wrapper">
        <Pagination
          :itemsPerPage="messagePagination.take"
          :set-items-per-page="setItemsPerPage"
          :page="
            Math.floor(messagePagination.skip / messagePagination.take) + 1
          "
          :current-page-change="currentPageChange"
          :total="messagePagination.total._count?._all"
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
import { useMessageStore } from "@/store/useMessageModule";
import Pagination from "@/components/shared/pagination/Pagination.vue";
import { useBodyStore } from "@/store/useBodyModule";
import * as XLSX from "xlsx";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const ConfirmModal = defineAsyncComponent(
  () => import("@/components/modals/ConfirmModal.vue")
);
const entityPluralName = "messages";
const fieldsName = ref(["contenu", "dateReception", "room", "user"]);
const isOpenModal = ref(false);
const modalId = ref<string | null>(null);
const { isLoading } = storeToRefs(useBodyStore());
const { messageList, messagePagination, messageExcelFile } = storeToRefs(
  useMessageStore()
);
const {
  fetchMessages,
  deleteMessage,
  fetchDataExcelMessages,
  softDeleteMessage,
} = useMessageStore();

async function dataToExcel() {
  await fetchDataExcelMessages();
  const workbook = XLSX.read(messageExcelFile.value.toString());
  XLSX.writeFile(workbook, "messageData.xlsx");
}
const deleteLoading = ref<boolean>(false);
const handleRemoveEntity = async (id: string) => {
  deleteLoading.value = true;
  await softDeleteMessage(id);
  deleteLoading.value = false;
};
const handleOpenConfirmModal = (id: string) => {
  isOpenModal.value = true;
  modalId.value = id;
};
const setItemsPerPage = async (event: any) => {
  await fetchMessages({
    skip: 0,
    take: parseInt(event.target.value),
  });
};
const currentPageChange = async (val: number) => {
  await fetchMessages({
    skip: (val - 1) * messagePagination.value.take,
    take: messagePagination.value.take,
  });
};
onMounted(async () => {
  setCurrentPageBreadcrumbs(entityPluralName, []);
  await fetchMessages({
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
