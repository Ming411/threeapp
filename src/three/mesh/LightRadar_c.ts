import * as THREE from 'three';
import type { PlaneGeometry, ShaderMaterial, Mesh } from 'three';
import vertex from '@/shader/lightRadar_c/vertex.glsl';
import fragment from '@/shader/lightRadar_c/fragment.glsl';
import gsap from 'gsap';
export default class LightWall {
	geometry: PlaneGeometry;
	material: ShaderMaterial;
	mesh: Mesh;
	constructor() {
		this.geometry = new THREE.PlaneGeometry(4, 4);
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uColor: {
					value: new THREE.Color('#422256'),
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
		this.mesh.position.set(-8, 0.5, 8);
		this.mesh.rotation.x = -Math.PI / 2;

		gsap.to(this.material.uniforms.uTime, {
			value: 1,
			duration: 1,
			repeat: -1,
			ease: 'none',
		});
	}
}
