import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
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
renderer.toneMappingExposure = 0.8;

// 创建CSS3D renderer
const css3drender = new CSS3DRenderer();
css3drender.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.cssrender')?.appendChild(css3drender.domElement);

export default { renderer, css3drender };
