import * as THREE from 'three';
import type {CatmullRomCurve3, BufferGeometry, ShaderMaterial, Points} from 'three';
import gsap from 'gsap';
import vertex from '@/shader/flyLine_c/vertex.glsl';
import fragment from '@/shader/flyLine_c/fragment.glsl';
export default class FlyLineShader {
  lineCurve: CatmullRomCurve3;
  geometry: BufferGeometry;
  shaderMaterial: ShaderMaterial;
  mesh: Points;
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-5, 4, 0),
      new THREE.Vector3(-10, 0, 0)
    ];
    // 创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    const points = this.lineCurve.getPoints(1000);
    // 创建几何体
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    // 给每一个顶点设置大小
    const aSizeArray = new Float32Array(points.length);
    for (let i = 0; i < aSizeArray.length; i++) {
      aSizeArray[i] = i;
    }
    this.geometry.setAttribute('aSize', new THREE.BufferAttribute(aSizeArray, 1));
    // 设置着色器
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: {
          value: 0
        },
        uColor: {
          value: new THREE.Color(0x00ffff)
        },
        uLength: {
          value: points.length
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      // 解决物体有时候显示不全的问题
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.mesh = new THREE.Points(this.geometry, this.shaderMaterial);
    // 改变uTime控制动画
    gsap.to(this.shaderMaterial.uniforms.uTime, {
      value: 1000,
      repeat: -1,
      duration: 2,
      ease: 'none'
    });
  }
}
