<template>
	<div id="bigScreen">
		<div class="header">{{ props.title }}</div>
		<div class="main">
			<div class="left">
				<div class="cityEvent">
					<h3>开启热气球动画</h3>
					<h1 @click="toggleAction(0)">
						<img src="../assets/bg/bar.svg" class="icon" />
						<span>横穿园区动画</span>
					</h1>
					<h1 @click="toggleAction(1)">
						<img src="../assets/bg/bar.svg" class="icon" />
						<span>环绕园区动画</span>
					</h1>
					<div class="footerBorder"></div>
				</div>
				<div class="cityEvent">
					<h3>相机切换</h3>
					<h1 @click="toggleCamera('carcamera_Orientation')">
						<img src="../assets/bg/bar.svg" class="icon" />
						<span>相机追随汽车</span>
					</h1>
					<h1 @click="toggleCamera('rightcamera_Orientation')">
						<img src="../assets/bg/bar.svg" class="icon" />
						<span>查看汽车司机视角</span>
					</h1>
					<div class="footerBorder"></div>
				</div>
			</div>
			<div class="right">
				<div class="cityEvent list">
					<h3>
						<span>切换园区观览模式</span>
					</h3>
					<ul>
						<li @click="toggleControls('Orbit')">
							<h1>
								<div>
									<img src="../assets/bg/dianli.svg" class="icon" />
								</div>
								<span class="time">使用轨道控制器查看园区</span>
							</h1>
						</li>
						<li @click="toggleControls('Fly')">
							<h1>
								<div>
									<img src="../assets/bg/dianli.svg" class="icon" />
								</div>
								<span class="time">使用飞行控制器查看园区</span>
							</h1>
						</li>
						<li @click="toggleControls('FirstPerson')">
							<h1>
								<div>
									<img src="../assets/bg/dianli.svg" class="icon" />
								</div>
								<span class="time">使用第一人称控制器查看园区</span>
							</h1>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { DataInfo, EventList } from '@/views/types';
import eventHub from '@/utils/eventHub';
import { ref } from 'vue';
const props = withDefaults(
	defineProps<{
		title?: string;
	}>(),
	{
		title: '智慧管理系统',
	}
);

const toggleAction = (i: number) => {
	eventHub.emit('actionClick', i);
};
const toggleCamera = (name: string) => {
	eventHub.emit('toggleCamera', name);
};

const toggleControls = (type: string) => {
	eventHub.emit('toggleControls', type);
};
</script>

<style scoped>
#bigScreen {
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 100;

	left: 0;
	top: 0;
	pointer-events: none;
	display: flex;
	flex-direction: column;
}

.header {
	/* width: 1920px;
        height: 100px; */

	width: 19.2rem;
	height: 1rem;
	line-height: 1rem;
	background-image: url(@/assets/bg/title.png);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	text-align: center;
	color: rgb(226, 226, 255);
	font-size: 0.4rem;
}

.main {
	flex: 1;
	width: 19.2rem;
	display: flex;
	justify-content: space-between;
}

.left {
	width: 4rem;
	/* background-color: rgb(255,255,255,0.5); */
	background-image: url(@/assets/bg/line_img.png);
	background-repeat: no-repeat;
	background-size: contain;
	background-position: right center;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.4rem 0;
}

.right {
	width: 4rem;
	/* background-color: rgb(255,255,255,0.5); */
	background-image: url(@/assets/bg/line_img.png);
	background-repeat: no-repeat;
	background-size: contain;
	background-position: left center;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.4rem 0;
}

.cityEvent {
	position: relative;
	width: 3.5rem;
	/* height: 3rem; */
	margin-bottom: 0.5rem;
	background-image: url(@/assets/bg/bg_img03.png);
	background-repeat: repeat;
	pointer-events: auto;
	cursor: pointer;
}

.cityEvent::before {
	width: 0.4rem;
	height: 0.4rem;
	position: absolute;
	left: 0;
	top: 0;
	border-top: 4px solid rgb(34, 133, 247);
	border-left: 4px solid rgb(34, 133, 247);
	content: '';
	display: block;
}

.cityEvent::after {
	width: 0.4rem;
	height: 0.4rem;
	position: absolute;
	right: 0;
	top: 0;
	border-top: 4px solid rgb(34, 133, 247);
	border-right: 4px solid rgb(34, 133, 247);
	content: '';
	display: block;
}
.footerBorder {
	position: absolute;
	bottom: 0;
	bottom: 0;
	width: 3.5rem;
	height: 0.4rem;
}
.footerBorder::before {
	width: 0.4rem;
	height: 0.4rem;
	position: absolute;
	left: 0;
	top: 0;
	border-bottom: 4px solid rgb(34, 133, 247);
	border-left: 4px solid rgb(34, 133, 247);
	content: '';
	display: block;
}

.footerBorder::after {
	width: 0.4rem;
	height: 0.4rem;
	position: absolute;
	right: 0;
	top: 0;
	border-bottom: 4px solid rgb(34, 133, 247);
	border-right: 4px solid rgb(34, 133, 247);
	content: '';
	display: block;
}

.icon {
	width: 40px;
	height: 40px;
}

h1 {
	color: #fff;
	display: flex;
	align-items: center;
	padding: 0 0.3rem 0.3rem;
	justify-content: space-between;
	font-size: 0.3rem;
}
h3 {
	color: #fff;
	display: flex;
	align-items: center;
	padding: 0.3rem 0.3rem;
}

h1 > div {
	display: flex;
	align-items: center;
}
h1 span.time {
	font-size: 0.2rem;
	font-weight: normal;
}

.cityEvent li > p {
	color: #eee;
	padding: 0rem 0.3rem 0.3rem;
}
.list h1 {
	padding: 0.1rem 0.3rem;
}
.cityEvent.list ul {
	pointer-events: auto;
	cursor: pointer;
}

.cityEvent li.active h1 {
	color: red;
}
.cityEvent li.active p {
	color: red;
}

ul,
li {
	padding: 0;
	list-style: none;
}
</style>
