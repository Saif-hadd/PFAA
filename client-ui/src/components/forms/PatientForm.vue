<template>
  <el-form
    :model="patient"
    label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="dateNaissance" prop="dateNaissance">
      <el-date-picker
        v-model="patient.dateNaissance"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
        data-test="patientFormdateNaissance"
      />
    </el-form-item>
    <el-form-item label="adresse" prop="adresse">
      <el-input v-model="patient.adresse" data-test="patientFormadresse" />
    </el-form-item>
    <el-form-item label="medecinTraitant" prop="medecinTraitant">
      <el-input
        v-model="patient.medecinTraitant"
        data-test="patientFormmedecinTraitant"
      />
    </el-form-item>
    <el-form-item label="room_id" prop="room">
      <el-select
        v-model="patient.room.id"
        data-test="patientFormroomId"
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
    <el-form-item label="sagesFemmes_id" prop="sagesFemmes">
      <el-select
        v-model="patient.sagesFemmes.id"
        data-test="patientFormsagesFemmesId"
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
        data-test="patientFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="patientFormSubmitButton"
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

import { usePatientStore } from "@/store/usePatientModule";
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
let sagesfemmes = ref([]);
const { patient, error } = storeToRefs(usePatientStore());
const {
  getPatientById,
  createPatient,
  editPatient,
  resetPatient,
} = usePatientStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  dateNaissance: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  adresse: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  medecinTraitant: [
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
    return await editPatient({ id });
  } else await createPatient();
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
        router.push({ name: `${currentUser.value.role}-list-patient` });
        resetPatient();
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
  resetPatient();
};
const getCurrentPatient = async (id: string) => {
  if (props.isEdit) {
    await getPatientById(id);
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
  await getListOfRoom();
  await getListOfSagesFemme();
  await getCurrentPatient(id);
});
</script>
