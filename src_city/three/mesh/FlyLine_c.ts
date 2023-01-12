import * as THREE from 'three';
import type { TubeGeometry, CatmullRomCurve3, MeshBasicMaterial, Mesh, Texture } from 'three';
import gsap from 'gsap';
export default class FlyLine {
	lineCurve: CatmullRomCurve3;
	geometry: TubeGeometry;
	material: MeshBasicMaterial;
	mesh: Mesh;
	texture: Texture;
	constructor() {
		const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(5, 4, 0), new THREE.Vector3(10, 0, 0)];
		// 创建曲线
		this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
		// 根据曲线生成管道几何体
		this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.4, 2, false);
		// 创建纹理
		const textureLoader = new THREE.TextureLoader();
		this.texture = textureLoader.load('./textures/z_112.png');
		this.texture.repeat.set(1, 2); // 解决显示一半问题，那个轴重复具体看 纹理贴图的样式
		this.texture.wrapS = THREE.RepeatWrapping;
		this.texture.wrapT = THREE.MirroredRepeatWrapping; // 设置镜像重复
		// 设置飞线材质
		// 为什么只显示一半？ 这个一个2D的，正反各一半
		this.material = new THREE.MeshBasicMaterial({
			color: 0xfff000,
			map: this.texture,
			transparent: true,
		});
		// 创建飞线对象
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		// 创建飞线动画, 原理就是通过 偏移纹理来实现动画
		gsap.to(this.texture.offset, {
			x: -1,
			duration: 3,
			repeat: -1,
			ease: 'none',
		});
	}
}
