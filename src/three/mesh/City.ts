import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Group, Scene, Vector3 } from 'three';
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
	floor2Tags: CSS3DObject[];
	floor2Group?: Group;
	floor1Group?: Group;
	wallGroup?: Group;
	flightGroup?: Group;
	flightPointsGroup?: Group;
	curve?: CatmullRomCurve3;
	curveProgress?: number;
	redcar?: Object3D;
	constructor() {
		this.floor2Tags = [];
		/*此处 city.glb 是经过压缩的  需要通过DRACOLoader 来进行解压缩加载*/
		const gltfLoader = new GLTFLoader();
		const dracoloader = new DRACOLoader();
		// 需要将解压器从threejs中复制到我们项目中
		dracoloader.setDecoderPath('./draco/'); // 设置解压器路径
		gltfLoader.setDRACOLoader(dracoloader); // 设置loader解压器
		gltfLoader.load('./model/floor2.glb', (gltf) => {
			// console.log(gltf);
			const array = ['小型会议室', '核心科技室', '科技展台', '设计总监办公室'];
			this.floor2Group = gltf.scene;

			gltf.scene.traverse((child: any) => {
				// console.log(child);
				if (child.isMesh) {
					child.material.emissiveIntensity = 5; //  修改每个物体的亮度
				}
				/* 给物体添加盒子标注 */
				if (array.indexOf(child.name) !== -1) {
					// console.log(child);
					const objectCSS3D = this.createTag(child);
					objectCSS3D.visible = false;
					this.floor2Tags.push(objectCSS3D); // 当外壳存在不展示标签
					this.floor2Group!.add(objectCSS3D);
				}
			});
			this.floor2Group.visible = false;
			scene.add(gltf.scene);
			this.initEvent(); // 初始化相关事件
		});
		// 加载第一层模型
		gltfLoader.load('./model/floor1.glb', (gltf) => {
			this.floor1Group = gltf.scene;
			gltf.scene.traverse((child: any) => {
				if (child.isMesh) {
					child.material.emissiveIntensity = 5;
				}
			});
			this.floor1Group.visible = false;
			scene.add(gltf.scene);
		});
		// 添加外壳模型，笼罩一二层
		gltfLoader.load('./model/wall.glb', (gltf) => {
			this.wallGroup = gltf.scene;
			scene.add(gltf.scene);
		});
		// 载入战斗机模型
		gltfLoader.load('./model/Fighter.glb', (gltf) => {
			this.flightGroup = gltf.scene;
			scene.add(gltf.scene);
			this.flightGroup.visible = false;
			this.flightGroup.position.set(3, 42, 68);
			gltf.scene.traverse((child: any) => {
				if (child.isMesh) {
					child.material.emissiveIntensity = 15; // 提升飞机亮度
				}
			});
			const mouse = new THREE.Vector2();
			const raycaster = new THREE.Raycaster();
			// 飞机的点击事件
			window.addEventListener('click', (ev) => {
				mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
				mouse.y = -((ev.clientX / window.innerWidth) * 2 - 1);
				raycaster.setFromCamera(mouse, cameraModule.activeCamera);
				const intersects = raycaster.intersectObject(this.flightGroup!);
				if (intersects.length > 0) {
					if (this.floor2Group!.visible) {
						this.floor2Group!.visible = false;
					} else {
						this.floor2Group!.visible = true;
					}
					this.floor2Tags.forEach((tag) => {
						tag.visible = this.floor2Group!.visible;
					});
				}
			});

			this.createPoints(this.flightGroup);
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
		// scene.add(objectCSS3D);
		return objectCSS3D;
	}
	/* 控制楼层显隐 */
	showFloor1() {
		this.floor1Group!.visible = true;
	}
	showFloor2() {
		this.floor2Group!.visible = true;
		this.flightGroup!.visible = true;
		// 控制二楼的标签
		this.floor2Tags.forEach((item) => {
			item.visible = true;
		});
	}
	showWall() {
		this.wallGroup!.visible = true;
	}
	hiddenFloor1() {
		this.floor1Group!.visible = false;
	}
	hiddenFloor2() {
		this.floor2Group!.visible = false;
		this.flightGroup!.visible = false;
		this.floor2Tags.forEach((item) => {
			item.visible = false;
		});
	}
	hiddenWall() {
		this.wallGroup!.visible = false;
	}
	initEvent() {
		eventHub.on('showFloor1', () => {
			this.showFloor1();
			this.hiddenFloor2();
			this.hiddenWall();
		});
		eventHub.on('showFloor2', () => {
			this.showFloor2();
			this.hiddenFloor1();
			this.hiddenWall();
		});
		eventHub.on('showWall', () => {
			this.showWall();
			this.hiddenFloor1();
			this.hiddenFloor2();
		});
		eventHub.on('showAll', () => {
			this.showWall();
			this.showFloor1();
			this.showFloor2();
			// 通过gsap制作展开动画
			gsap.to(this.wallGroup!.position, {
				y: 200,
				duration: 1,
			});
			gsap.to(this.floor2Group!.position, {
				y: 50,
				duration: 1,
				delay: 1,
			});
		});
		eventHub.on('hideAll', () => {
			gsap.to(this.wallGroup!.position, {
				y: 0,
				duration: 1,
				delay: 1,
				onComplete: () => {
					this.hiddenFloor1();
					this.hiddenFloor2();
				},
			});
			// 二层先收
			gsap.to(this.floor2Group!.position, {
				y: 0,
				duration: 1,
			});
		});
		// 操作飞机,拆解成一个立方体，也就是将他的children重新分配位置
		eventHub.on('flatFlight', () => {
			// console.log(this.flightGroup);
			const positions: Vector3[] = []; // 必须多余飞机拥有的部件数
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 5; j++) {
					positions.push(new THREE.Vector3(i * 2 - 2, 2, j * 2 - 2));
				}
			}
			let n = 0;
			this.flightGroup!.traverse((child: any) => {
				if (child.isMesh) {
					// child.position.copy(positions[n].multiplyScalar(20));
					positions[n].multiplyScalar(10); // 先放大，不然不明显
					child.position2 = child.position.clone(); // 备份变化之前的位置
					gsap.to(child.position, {
						x: positions[n].x,
						y: positions[n].y,
						z: positions[n].z,
						duration: 1,
					});
					n++;
				}
			});
			// console.log(n);
		});
		// 飞机恢复原形
		eventHub.on('recoverFlight', () => {
			this.flightGroup!.traverse((child: any) => {
				if (child.isMesh) {
					gsap.to(child.position, {
						x: child.position2.x,
						y: child.position2.y,
						z: child.position2.z,
						duration: 1,
					});
				}
			});
		});
	}
	// 通过粒子特效建立一个与飞机模型一样的物体
	createPoints(object3d: Group) {
		if (!this.flightPointsGroup) {
			this.flightPointsGroup = this.transformPoints(object3d);
			scene.add(this.flightPointsGroup);
		}
	}
	transformPoints(object3d: Group) {
		// 创建纹理图像
		const texture = new THREE.TextureLoader().load('./assets/particles/1.png');
		const group = new THREE.Group();
		function createPoints(object3d: Group, newObject3d: any) {
			if (object3d.children.length > 0) {
				object3d.children.forEach((child: any) => {
					if (child.isMesh) {
						// 生成随机颜色
						const color = new THREE.Color(Math.random(), Math.random(), Math.random());
						const material = new THREE.PointsMaterial({
							size: 0.1,
							color,
							map: texture,
							blending: THREE.AdditiveBlending,
							transparent: true,
							depthTest: false,
						});
						const points = new THREE.Points(child.geometry, material);
						points.position.copy(child.position);
						points.rotation.copy(child.rotation);
						points.scale.copy(child.scale);
						newObject3d.add(points);
						createPoints(child, points);
					}
				});
			}
		}
		createPoints(object3d, group);
		return group;
	}
}
