<template>
  <el-form :model="room" label-width="120px" :rules="rules" ref="ruleFormRef">
    <div class="d-flex justify-content-end">
      <el-button
        data-test="roomFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="roomFormSubmitButton"
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

import { useRoomStore } from "@/store/useRoomModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

const { room, error } = storeToRefs(useRoomStore());
const { getRoomById, createRoom, editRoom, resetRoom } = useRoomStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({});

const handleSubmitForm = async () => {
  isLoading.value = true;
  if (props.isEdit) {
    const id = route?.params?.id as string;
    return await editRoom({ id });
  } else await createRoom();
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
        router.push({ name: `${currentUser.value.role}-list-room` });
        resetRoom();
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
  resetRoom();
};
const getCurrentRoom = async (id: string) => {
  if (props.isEdit) {
    await getRoomById(id);
  }
};

onMounted(async () => {
  const id = route.params.id as string;

  await getCurrentRoom(id);
});
</script>
