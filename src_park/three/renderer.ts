import * as THREE from 'three';
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
	// 抗锯齿
	antialias: true,
	logarithmicDepthBuffer: true, // 解决模型渲染闪烁问题
	// physicallyCorrectLights: true, //是否使用物理上正确的光照模式
});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 设置渲染曝光程度
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

export default renderer;
