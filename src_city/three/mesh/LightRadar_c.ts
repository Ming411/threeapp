import * as THREE from 'three';
import type { PlaneGeometry, ShaderMaterial, Mesh, Material } from 'three';
import vertex from '@/shader/lightRadar_c/vertex.glsl';
import fragment from '@/shader/lightRadar_c/fragment.glsl';
import gsap from 'gsap';
export default class LightWall {
	geometry: PlaneGeometry;
	material: ShaderMaterial;
	mesh: Mesh;
	eventListIndex?: number;
	constructor(radius = 2, position: { x: number; z: number } = { x: 0, z: 0 }, color: string | number = 0xffffff) {
		this.geometry = new THREE.PlaneGeometry(radius, radius);
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {
					value: new THREE.Color(color),
				},
				uTime: {
					value: 0,
				},
			},
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true,
			side: THREE.DoubleSide,
		});
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.position.set(position.x, 0.8, position.z);
		this.mesh.rotation.x = -Math.PI / 2;

		gsap.to(this.material.uniforms.uTime, {
			value: 1,
			duration: 1,
			repeat: -1,
			ease: 'none',
		});
	}
	remove() {
		this.mesh.remove();
		this.mesh.removeFromParent();
		this.mesh.geometry.dispose();
		(this.mesh.material as Material).dispose();
	}
}
