import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import * as THREE from 'three';
import gsap from 'gsap';
import type { Object3D, AnimationMixer, AnimationClip, AnimationAction, CatmullRomCurve3 } from 'three';
import scene from '../scene';
import eventHub from '@/utils/eventHub';
import cameraModule from '../camera';
export default class City {
	mixer?: AnimationMixer;
	clip?: AnimationClip;
	action?: AnimationAction;
	gltf?: GLTF;
	curve?: CatmullRomCurve3;
	curveProgress?: number;
	redcar?: Object3D;
	constructor() {
		/*此处 city.glb 是经过压缩的  需要通过DRACOLoader 来进行解压缩加载*/
		const gltfLoader = new GLTFLoader();
		const dracoloader = new DRACOLoader();
		// 需要将解压器从threejs中复制到我们项目中
		dracoloader.setDecoderPath('./draco/'); // 设置解压器路径
		gltfLoader.setDRACOLoader(dracoloader); // 设置loader解压器
		gltfLoader.load('./model/floor2.glb', (gltf) => {
			console.log(gltf);
			this.gltf = gltf;
			scene.add(gltf.scene);
			gltf.scene.traverse((child: any) => {
				// console.log(child);
				if (child.isMesh) {
					child.material.emissiveIntensity = 5; //  修改每个物体的亮度
				}
				/* 给物体添加盒子标注 */
				if (child.type === 'Object3D' && child.children.length === 0) {
					// console.log(child);
					this.createTag(child);
				}
			});
		});
	}
	/* 创建标注盒子 */
	createTag(child: any) {
		const element = document.createElement('div');
		element.className = 'elementTag';
		element.innerHTML = `
        <div class='elementContent'>
          <h3>${child.name}</h3>
          <p>温度：26</p>
          <p>适度：58%</p>
        </div>
    `;
		const objectCSS3D = new CSS3DObject(element);
		objectCSS3D.scale.set(0.2, 0.2, 0.2);
		objectCSS3D.position.copy(child.position);
		scene.add(objectCSS3D);
	}
}
