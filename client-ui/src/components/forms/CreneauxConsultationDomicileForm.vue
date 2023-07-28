<template>
  <el-form
    :model="creneauxconsultationdomicile"
    label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
  >
    <el-form-item label="jour" prop="jour">
      <el-input
        v-model="creneauxconsultationdomicile.jour"
        data-test="creneauxconsultationdomicileFormjour"
      />
    </el-form-item>
    <el-form-item label="heureDebut" prop="heureDebut">
      <el-date-picker
        v-model="creneauxconsultationdomicile.heureDebut"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
        data-test="creneauxconsultationdomicileFormheureDebut"
      />
    </el-form-item>
    <el-form-item label="heureFin" prop="heureFin">
      <el-date-picker
        v-model="creneauxconsultationdomicile.heureFin"
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
        data-test="creneauxconsultationdomicileFormheureFin"
      />
    </el-form-item>
    <el-form-item label="sagesFemmes_id" prop="sagesFemmes">
      <el-select
        v-model="creneauxconsultationdomicile.sagesFemmes.id"
        data-test="creneauxconsultationdomicileFormsagesFemmesId"
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
        data-test="creneauxconsultationdomicileFormCancelButton"
        @click="resetForm(ruleFormRef)"
        >Cancel</el-button
      >
      <el-button
        data-test="creneauxconsultationdomicileFormSubmitButton"
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

import { useCreneauxConsultationDomicileStore } from "@/store/useCreneauxConsultationDomicileModule";
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
const { creneauxconsultationdomicile, error } = storeToRefs(
  useCreneauxConsultationDomicileStore()
);
const {
  getCreneauxConsultationDomicileById,
  createCreneauxConsultationDomicile,
  editCreneauxConsultationDomicile,
  resetCreneauxConsultationDomicile,
} = useCreneauxConsultationDomicileStore();

const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<InstanceType<typeof ElForm>>();
const isLoading = ref<boolean>(false);
const rules = reactive({
  jour: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  heureDebut: [
    {
      required: false,
      message: `${t("entityForm.validation.required")}`,
      trigger: "blur",
    },
  ],
  heureFin: [
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
    return await editCreneauxConsultationDomicile({ id });
  } else await createCreneauxConsultationDomicile();
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
          name: `${currentUser.value.role}-list-creneauxconsultationdomicile`,
        });
        resetCreneauxConsultationDomicile();
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
  resetCreneauxConsultationDomicile();
};
const getCurrentCreneauxConsultationDomicile = async (id: string) => {
  if (props.isEdit) {
    await getCreneauxConsultationDomicileById(id);
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

onMounted(async () => {
  const id = route.params.id as string;
  await getListOfSagesFemme();
  await getCurrentCreneauxConsultationDomicile(id);
});
</script>
