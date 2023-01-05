import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import type { Mesh } from 'three';
import scene from '../scene';
import modifyCityMaterial from '../modify/modifyCityMaterial';
// import FlyLine from './FlyLine';
import FlyLine from './FlyLine_c';
// import FlyLineShader from './FlyLineShader';
import FlyLineShader from './FlyLineShader_c';
import MeshLine from './MeshLine';
// import LightWall from './LightWall';
import LightWall from './LightWall_c';
// import LightRadar from './LightRadar';
import LightRadar from './LightRadar_c';
// import AlarmSprite from './AlarmSprite';
import AlarmSprite from './AlarmSprite_c';

export default function createCity() {
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('./model/city.glb', (gltf) => {
		// traverse 遍历 GLTF文件中场景节点
		// console.log(gltf);
		gltf.scene.traverse((item) => {
			if (item.type == 'Mesh') {
				const cityMaterial = new THREE.MeshBasicMaterial({
					color: new THREE.Color(0x0c0e33), // 给建筑设置基础颜色
				});
				(item as Mesh).material = cityMaterial;
				modifyCityMaterial(item as Mesh);
				if (item.name == 'Layerbuildings') {
					// 给建筑物添加border
					const meshLine = new MeshLine((item as Mesh).geometry);
					const size = item.scale.x;
					meshLine.mesh.scale.set(size, size, size);
					scene.add(meshLine.mesh);
				}
			}
		});
		scene.add(gltf.scene);

		// geometry添加飞线
		// const flyLine = new FlyLine();
		// scene.add(flyLine.mesh);

		// 添加着色器飞线
		// const flyLineShader = new FlyLineShader();
		// scene.add(flyLineShader.mesh);

		// 添加光墙
		// const lightWall = new LightWall();
		// scene.add(lightWall.mesh);

		// 添加雷达
		// const lightRadar = new LightRadar();
		// scene.add(lightRadar.mesh);

		// 添加警告标识
		// const alarmSprite = new AlarmSprite();
		// scene.add(alarmSprite.mesh);
		// alarmSprite.onClick(function (ev: any) {
		//   console.log('warning!!!', ev);
		// });
	});
}
