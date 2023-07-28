<template>
  <el-form :model="user" label-width="120px" :rules="rules" ref="ruleFormRef">
    <el-form-item label="Prenom" prop="Prenom">
      <el-input v-model="user.Prenom" data-test="userFormPrenom" />
    </el-form-item>
    <el-form-item label="nomN" prop="nomN">
      <el-input v-model="user.nomN" data-test="userFormnomN" />
    </el-form-item>
    <el-form-item label="username" prop="username">
      <el-input v-model="user.username" data-test="userFormusername" />
    </el-form-item>
    <el-form-item label="isValid" prop="isValid">
      <el-switch v-model="user.isValid" data-test="userFormisValid" />
    </el-form-item>
    <el-form-item label="roles" prop="roles">
      <el-input v-model="user.roles" data-test="userFormroles" />
    </el-form-item>
    <el-form-item label="email" prop="email">
      <el-input v-model="user.email" data-test="userFormemail" />
    </el-form-item>
    <el-form-item label="sageFemmes_id" prop="sageFemmes">
      <el-select
        v-model="user.sageFemmes.id"
        data-test="userFormsageFemmesId"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="sagesfemme in sagesfemmes"
          :data-test="sagesfemme.id"
          :label="sagesfemme.id"
          :key="sagesfemme.id"
          :value="sagesfemme.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="patient_id" prop="patient">
      <el-select
        v-model="user.patient.id"
        data-test="userFormpatientId"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="patient in patients"
          :data-test="patient.id"
          :label="patient.id"
          :key="patient.id"
          :value="patient.id"
        />
      </el-select>
    </el-form-item>
    <div class="d-flex justify-content-end">
      <el-button
        data-test="userFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="userFormSubmitButton"
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

import { useUserStore } from "@/store/useUserModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});
let sagesfemmes = ref([]);
let patients = ref([]);
const { user, error } = storeToRefs(useUserStore());
const { getUserById, createUser, editUser, resetUser } = useUserStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  Prenom: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  nomN: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  username: [
    {
      required: true,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  isValid: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  roles: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  sageFemmes: [
    {
      required: true,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  patient: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  telephone: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  email: [
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
    return await editUser({ id });
  } else await createUser();
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
        router.push({ name: `${currentUser.value.role}-list-user` });
        resetUser();
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
  resetUser();
};
const getCurrentUser = async (id: string) => {
  if (props.isEdit) {
    await getUserById(id);
  }
};

const getListOfSagesFemme = async () => {
  await supabase
    .from("SagesFemme")
    .select("*")
    .then(({ data }) => {
      sagesfemmes.value = data;
    });
};
const getListOfPatient = async () => {
  await supabase
    .from("Patient")
    .select("*")
    .then(({ data }) => {
      patients.value = data;
    });
};

onMounted(async () => {
  const id = route.params.id as string;
  await getListOfSagesFemme();
  await getListOfPatient();
  await getCurrentUser(id);
});
</script>
