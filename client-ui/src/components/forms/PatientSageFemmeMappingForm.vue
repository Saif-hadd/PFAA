<template>
  <el-form
    :model="patientsagefemmemapping"
    label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="estSagefemmeReference" prop="estSagefemmeReference">
      <el-switch
        v-model="patientsagefemmemapping.estSagefemmeReference"
        data-test="patientsagefemmemappingFormestSagefemmeReference"
      />
    </el-form-item>
    <el-form-item label="patient_id" prop="patient">
      <el-select
        v-model="patientsagefemmemapping.patient.id"
        data-test="patientsagefemmemappingFormpatientId"
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
    <el-form-item label="sagesFemmes_id" prop="sagesFemmes">
      <el-select
        v-model="patientsagefemmemapping.sagesFemmes.id"
        data-test="patientsagefemmemappingFormsagesFemmesId"
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
    <div class="d-flex justify-content-end">
      <el-button
        data-test="patientsagefemmemappingFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="patientsagefemmemappingFormSubmitButton"
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

import { usePatientSageFemmeMappingStore } from "@/store/usePatientSageFemmeMappingModule";
import { useRoute, useRouter } from "vue-router";
import type { ElForm } from "element-plus";
import { Components } from "@tekab-dev-team/storybook-devfactory";
import { t } from "@/core/i18n/translate";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = storeToRefs(useAuthStore());

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});
let patients = ref([]);
let sagesfemmes = ref([]);
const { patientsagefemmemapping, error } = storeToRefs(
  usePatientSageFemmeMappingStore()
);
const {
  getPatientSageFemmeMappingById,
  createPatientSageFemmeMapping,
  editPatientSageFemmeMapping,
  resetPatientSageFemmeMapping,
} = usePatientSageFemmeMappingStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  estSagefemmeReference: [
    {
      required: false,
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
  sagesFemmes: [
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
    return await editPatientSageFemmeMapping({ id });
  } else await createPatientSageFemmeMapping();
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
        router.push({
          name: `${currentUser.value.role}-list-patientsagefemmemapping`,
        });
        resetPatientSageFemmeMapping();
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
  resetPatientSageFemmeMapping();
};
const getCurrentPatientSageFemmeMapping = async (id: string) => {
  if (props.isEdit) {
    await getPatientSageFemmeMappingById(id);
  }
};

const getListOfPatient = async () => {
  await supabase
    .from("Patient")
    .select("*")
    .then(({ data }) => {
      patients.value = data;
    });
};
const getListOfSagesFemme = async () => {
  await supabase
    .from("SagesFemme")
    .select("*")
    .then(({ data }) => {
      sagesfemmes.value = data;
    });
};

onMounted(async () => {
  const id = route.params.id as string;
  await getListOfPatient();
  await getListOfSagesFemme();
  await getCurrentPatientSageFemmeMapping(id);
});
</script>
