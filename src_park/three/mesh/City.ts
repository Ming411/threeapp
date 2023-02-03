import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
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
		gltfLoader.load('./model/city4.glb', (gltf) => {
			// console.log(gltf);
			this.gltf = gltf;
			scene.add(gltf.scene);

			gltf.scene.traverse((child) => {
				if (child.name === '热气球') {
					this.mixer = new THREE.AnimationMixer(child);
					this.clip = gltf.animations[1];
					this.action = this.mixer.clipAction(this.clip);
					this.action.play();
				}
				if (child.name === '汽车园区轨迹') {
					// console.log(child);
					const line: any = child;
					const points = [];
					for (let i = line.geometry.attributes.position.count - 1; i > 0; i--) {
						points.push(
							// 三个为一个点，也可以通过遍历array手动分组
							new THREE.Vector3(
								line.geometry.attributes.position.getX(i),
								line.geometry.attributes.position.getY(i),
								line.geometry.attributes.position.getZ(i)
							)
						);
					}
					// 通过模型给的数据点 绘制小车轨迹曲线
					this.curve = new THREE.CatmullRomCurve3(points);
					this.curveProgress = 0; // 路线行驶进度
					this.carAnimation();
				}
				if (child.name === 'redcar') {
					this.redcar = child;
				}
			});

			gltf.cameras.forEach((camera: any) => {
				cameraModule.add(camera.name, camera);
			});
		});

		eventHub.on('actionClick', (i) => {
			this.action!.reset();
			this.clip = this.gltf!.animations[i];
			this.action = this.mixer!.clipAction(this.clip);
			this.action.play();
		});
	}
	update(time: number) {
		if (this.mixer) {
			this.mixer.update(time);
		}
	}
	carAnimation() {
		gsap.to(this, {
			curveProgress: 0.999,
			duration: 100,
			repeat: -1,
			// 每次值更新都会执行update
			onUpdate: () => {
				// getPoint 曲线上的位置。必须在[0,1]范围内
				const point = this.curve!.getPoint(this.curveProgress!);
				this.redcar!.position.set(point.x, point.y, point.z);

				// 调整车头方向
				if (this.curveProgress! + 0.001 < 1) {
					const point = this.curve!.getPoint(this.curveProgress! + 0.001);
					this.redcar!.lookAt(point); // 小车指向下一个坐标点的位置即可调整车头
				}
			},
		});
	}
}
