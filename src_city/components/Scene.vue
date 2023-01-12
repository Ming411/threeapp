<template>
	<div ref="sceneDiv" class="scene"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';
// 导入gui对象
// import gui from '@/three/gui';
// 导入场景
import scene from '@/three/scene';
// 导入相机
import camera from '@/three/camera';
// 导入控制器
// import controls from '@/three/controls';
// 导入辅助坐标轴
import axesHelper from '@/three/axesHelper';
// 导入渲染器
import renderer from '@/three/renderer';
// 初始化调整屏幕
import '@/three/init';
// 导入添加物体函数
import createMesh from '@/three/createMesh';
// 导入每一帧的执行函数
import animate from '@/three/animate';
import AlarmSprite from '@/three/mesh/AlarmSprite_c';
import type { EventList } from '@/views/types';
import LightWall from '@/three/mesh/LightWall_c';
import FlyLineShader from '@/three/mesh/FlyLineShader_c';
import LightRadar from '@/three/mesh/LightRadar_c';
import eventHub from '@/utils/eventHub';
import controls from '@/three/controls';
const props = defineProps<{
	eventList: EventList;
}>();

//动态添加
type MapType = Record<string, any>;
let mapFn: MapType = {
	火警: (position: { x: number; z: number }, i: number) => {
		// 光墙扩散;
		const lightWall = new LightWall(1, 2, position);
		lightWall.eventListIndex = i;
		scene.add(lightWall.mesh);
		evetListMesh.push(lightWall);
	},
	治安: (position: { x: number; z: number }, i: number) => {
		// 飞线
		// 生成随机颜色
		const color = new THREE.Color(Math.random(), Math.random(), Math.random()).getHex();
		const flyLineShader = new FlyLineShader(position, color);
		flyLineShader.eventListIndex = i;
		scene.add(flyLineShader.mesh);
		evetListMesh.push(flyLineShader);
	},
	电力: (position: { x: number; z: number }, i: number) => {
		// 雷达
		const color = new THREE.Color(Math.random(), Math.random(), Math.random()).getHex();
		const lightRadar = new LightRadar(2, position, color);
		lightRadar.eventListIndex = i;
		scene.add(lightRadar.mesh);
		evetListMesh.push(lightRadar);
	},
};

// 监听 eventlist 改变
const evetListMesh: any[] = []; // 记录上一次创建的，方便删除
watch(
	() => props.eventList,
	(val) => {
		evetListMesh.forEach((item) => {
			item.remove();
		});
		val.forEach((item, i) => {
			// 将坐标转为对应scene中的大小 -10 ~ 10
			const position = {
				x: item.position.x / 5 - 10,
				z: item.position.y / 5 - 10,
			};
			const alarmSprite = new AlarmSprite(item.name, position);
			// 调用封装好的点击事件
			alarmSprite.onClick(() => {
				// console.log(item.name);
				eventHub.emit('spriteClick', { event: item, i });
			});
			alarmSprite.eventListIndex = i; // 给图标标记是第几个
			evetListMesh.push(alarmSprite);
			scene.add(alarmSprite.mesh); // 动态创建事件的 图标
			if (mapFn[item.name]) {
				mapFn[item.name](position, i);
			}
		});
	}
);

// 接收 DOM传递过来的事件
eventHub.on('eventToggle', (i) => {
	evetListMesh.forEach((item) => {
		if (item.eventListIndex === i) {
			item.mesh.visible = true;
		} else {
			item.mesh.visible = false;
		}
	});
	/* 由于这里我们使用了controls所以不能直接通过相机设置视角 */
	// camera.lookAt(item.mesh.position);
	const position = { x: props.eventList[i].position.x / 5 - 10, y: 0, z: props.eventList[i].position.y / 5 - 10 };
	// controls.target.set(position.x, position.y, position.z);
	gsap.to(controls.target, {
		duration: 1,
		x: position.x,
		y: position.y,
		z: position.z,
	});
});

// 场景元素div
let sceneDiv = ref<HTMLElement>();
// 添加相机
scene.add(camera);
// 添加辅助坐标轴
scene.add(axesHelper);
// 创建物体 city.js
createMesh();

onMounted(() => {
	(sceneDiv.value as HTMLElement).appendChild(renderer.domElement);
	animate();
});
</script>

<style>
.scene {
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
}
</style>
