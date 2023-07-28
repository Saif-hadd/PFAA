<template>
  <el-form
    :model="sagesfemme"
    label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="geolocalisation" prop="geolocalisation">
      <el-input
        v-model="sagesfemme.geolocalisation"
        data-test="sagesfemmeFormgeolocalisation"
      />
    </el-form-item>
    <el-form-item label="diplome" prop="diplome">
      <el-input
        v-model="sagesfemme.diplome"
        data-test="sagesfemmeFormdiplome"
      />
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input
        v-model="sagesfemme.description"
        data-test="sagesfemmeFormdescription"
      />
    </el-form-item>
    <el-form-item label="room_id" prop="room">
      <el-select
        v-model="sagesfemme.room.id"
        data-test="sagesfemmeFormroomId"
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
        v-model="sagesfemme.user.id"
        data-test="sagesfemmeFormuserId"
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
        data-test="sagesfemmeFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="sagesfemmeFormSubmitButton"
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

import { useSagesFemmeStore } from "@/store/useSagesFemmeModule";
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
const { sagesfemme, error } = storeToRefs(useSagesFemmeStore());
const {
  getSagesFemmeById,
  createSagesFemme,
  editSagesFemme,
  resetSagesFemme,
} = useSagesFemmeStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  geolocalisation: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  diplome: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  description: [
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
    return await editSagesFemme({ id });
  } else await createSagesFemme();
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
        router.push({ name: `${currentUser.value.role}-list-sagesfemme` });
        resetSagesFemme();
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
  resetSagesFemme();
};
const getCurrentSagesFemme = async (id: string) => {
  if (props.isEdit) {
    await getSagesFemmeById(id);
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
  await getCurrentSagesFemme(id);
});
</script>
