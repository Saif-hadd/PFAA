<template>
  <div class="col-12 col-md-8 mx-auto mt-4 border border-secondary p-5 card">
    <h3 class="text-center text-primary my-4">
      Create PatientSageFemmeMapping
    </h3>
    <PatientSageFemmeMappingForm :isEdit="false" />
  </div>
</template>

<script lang="ts" setup>
import PatientSageFemmeMappingForm from "@/components/forms/PatientSageFemmeMappingForm.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { onMounted } from "vue";
onMounted(() => {
  setCurrentPageBreadcrumbs("create patientsagefemmemapping", [
    "patientsagefemmemappings",
  ]);
});
</script>
