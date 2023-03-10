import * as THREE from 'three';
import cameraModule from './camera';
import rendererModule from './renderer';
import controlsModule from './controls';
import scene from './scene';
import { updateMesh } from '@/three/createMesh';

const clock = new THREE.Clock();
function animate() {
	// const time = clock.getElapsedTime();
	const time = clock.getDelta();
	controlsModule.controls!.update(time);

	updateMesh(time);
	requestAnimationFrame(animate);
	// 使用渲染器渲染相机看这个场景的内容渲染出来
	rendererModule.renderer.render(scene, cameraModule.activeCamera);

	/* ======更新CSS3D渲染器===== */
	rendererModule.css3drender.render(scene, cameraModule.activeCamera);
}

export default animate;
