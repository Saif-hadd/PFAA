<template>
  <el-form
    :model="message"
    label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="contenu" prop="contenu">
      <el-input v-model="message.contenu" data-test="messageFormcontenu" />
    </el-form-item>
    <el-form-item label="dateReception" prop="dateReception">
      <el-date-picker
        v-model="message.dateReception"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
        data-test="messageFormdateReception"
      />
    </el-form-item>
    <el-form-item label="room_id" prop="room">
      <el-select
        v-model="message.room.id"
        data-test="messageFormroomId"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="room in rooms"
          :data-test="room.id"
          :label="room.id"
          :key="room.id"
          :value="room.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="user_id" prop="user">
      <el-select
        v-model="message.user.id"
        data-test="messageFormuserId"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="user in users"
          :data-test="user.id"
          :label="user.id"
          :key="user.id"
          :value="user.id"
        />
      </el-select>
    </el-form-item>
    <div class="d-flex justify-content-end">
      <el-button
        data-test="messageFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="messageFormSubmitButton"
        type="primary"
        @click="onSubmit(ruleFormRef)"
        >{{ isEdit ? "Save" : "Create" }}</el-button
      >
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { supabase } from "@/core/services/SupabaseClientService";

import { useMessageStore } from "@/store/useMessageModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});
let rooms = ref([]);
let users = ref([]);
const { message, error } = storeToRefs(useMessageStore());
const {
  getMessageById,
  createMessage,
  editMessage,
  resetMessage,
} = useMessageStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  contenu: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  dateReception: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  room: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  user: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
});

const handleSubmitForm = async () => {
  isLoading.value = true;
  if (props.isEdit) {
    const id = route?.params?.id as string;
    return await editMessage({ id });
  } else await createMessage();
};

const onSubmit = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      await handleSubmitForm();
      if (!!error.value) {
        Components.ElMessage.error(error.value?.message);
        console.log(error, "error");
      } else {
        router.push({ name: `${currentUser.value.role}-list-message` });
        resetMessage();
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  resetMessage();
};
const getCurrentMessage = async (id: string) => {
  if (props.isEdit) {
    await getMessageById(id);
  }
};

const getListOfRoom = async () => {
  await supabase
    .from("Room")
    .select("*")
    .then(({ data }) => {
      rooms.value = data;
    });
};
const getListOfUser = async () => {
  await supabase
    .from("User")
    .select("*")
    .then(({ data }) => {
      users.value = data;
    });
};

onMounted(async () => {
  const id = route.params.id as string;
  await getListOfRoom();
  await getListOfUser();
  await getCurrentMessage(id);
});
</script>
