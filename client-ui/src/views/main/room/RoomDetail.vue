<template>
  <el-row>
    <el-col :xs="24" :md="12" class="mx-auto mb-4">
      <el-card :body-style="{ padding: '0px' }">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <img
              src="https://www.cieau.com/wp-content/uploads/2019/11/eau_nature.jpg"
              class="image"
            />
          </el-carousel-item>
        </el-carousel>

        <div style="padding: 14px" v-if="room">
          <el-row
            :gutter="10"
            v-for="(item, index) in Object.entries(room)"
            :key="index"
          >
            <el-col class="item__key mb-2" :xs="24" :sm="4">
              {{ item[0] }}:</el-col
            >
            <el-col class="mb-2" :xs="24" :sm="16">{{ item[1] }}</el-col>
          </el-row>

          <div class="bottom">
            <el-button
              :data-test="roomDetailBackBtn"
              type="primary"
              @click="() => $router.go(-1)"
              icon="ArrowLeft"
              >{{ $t("detail.back") }}</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/config";
import { storeToRefs } from "pinia";
import { useRoomStore } from "@/store/useRoomModule";
import { useRoute } from "vue-router";
const route = useRoute();
const { room } = storeToRefs(useRoomStore());
const { getRoomById } = useRoomStore();
onMounted(async () => {
  const id = route?.params?.id as string;
  await getRoomById(id);
  setCurrentPageBreadcrumbs("rooms", ["detail"]);
});
</script>
<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
.item__key {
  font-weight: bold;
}
</style>
