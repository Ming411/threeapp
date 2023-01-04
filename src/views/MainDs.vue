<template>
  <div>
    <Scene :eventList="eventList"></Scene>
    <big-screen :dataInfo="dataInfo" :eventList="eventList" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import gsap from 'gsap';
import Scene from '@/components/Scene.vue';
import BigScreen from '@/components/BigScreen.vue';
import {getSmartCityInfo, getSmartCityList} from '@/api/api';
import type {DataInfo, EventList} from './types';

const dataInfo = reactive<DataInfo>({
  iot: {
    name: '',
    number: 0,
    unit: ''
  },
  event: {
    name: '',
    number: 0,
    unit: ''
  },
  power: {
    name: '',
    number: 0,
    unit: ''
  },
  test: {
    name: '',
    number: 0,
    unit: ''
  }
});

onMounted(() => {
  changeInfo();
  getEventList();
  // 定时请求数据
  setInterval(() => {
    changeInfo();
    getEventList();
  }, 5000);
});

// 获取左侧信息列表
const changeInfo = async () => {
  const ret = await getSmartCityInfo();
  for (let key in dataInfo) {
    dataInfo[key].name = ret.data.data[key].name;
    dataInfo[key].unit = ret.data.data[key].unit;
    gsap.to(dataInfo[key], {
      number: ret.data.data[key].number,
      duration: 1
    });
  }
};
// 获取右侧事件列表
let eventList = ref<EventList>([]);
const getEventList = async () => {
  let ret = await getSmartCityList();
  eventList.value = ret.data.list;
};
</script>

<style scoped></style>
