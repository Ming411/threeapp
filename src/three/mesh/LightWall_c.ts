import * as THREE from 'three';
import type { CylinderGeometry, ShaderMaterial, Mesh, Box3, Material } from 'three';
import vertex from '@/shader/lightWall_c/vertex.glsl';
import fragment from '@/shader/lightWall_c/fragment.glsl';
import gsap from 'gsap';
export default class LightWall {
	geometry: CylinderGeometry;
	material: ShaderMaterial;
	mesh: Mesh;
	eventListIndex?: number;
	constructor(radius = 5, length = 2, position: { x: number; z: number } = { x: 0, z: 0 }, color: string | number = 0xff0000) {
		// 上半径 下半径 高度 宽份数 高份数 是否开放
		this.geometry = new THREE.CylinderGeometry(radius, radius, 2, 32, 1, true);
		this.material = new THREE.ShaderMaterial({
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(position.x, 1, position.z);
		// 计算当前几何体的的边界矩形，该操作会更新已有 [param:.boundingBox]。
		this.mesh.geometry.computeBoundingBox();
		const { min, max } = this.geometry.boundingBox as Box3;
		// 获取物体高度差
		const uHeight = max.y - min.y;
		this.material.uniforms.uHeight = {
			value: uHeight,
		};
		// console.log(this.mesh);
		// 光墙动画
		gsap.to(this.mesh.scale, {
			x: length,
			z: length,
			duration: 1,
			repeat: -1,
			yoyo: true, // 来回动画
		});
	}
	remove() {
		this.mesh.remove();
		this.mesh.removeFromParent();
		this.mesh.geometry.dispose();
		(this.mesh.material as Material).dispose();
	}
}
