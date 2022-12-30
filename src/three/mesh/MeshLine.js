import * as THREE from 'three';
export default class MeshLine {
  constructor(geometry) {
    const edges = new THREE.EdgesGeometry(geometry); // 边缘几何体
    this.material = new THREE.LineBasicMaterial({color: 0xffffff});
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}
