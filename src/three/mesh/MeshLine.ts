import * as THREE from 'three';
import {BufferGeometry, LineBasicMaterial, EdgesGeometry, LineSegments} from 'three';
export default class MeshLine {
  material: LineBasicMaterial;
  geometry: EdgesGeometry;
  mesh: LineSegments;
  constructor(geometry: BufferGeometry) {
    const edges = new THREE.EdgesGeometry(geometry); // 边缘几何体
    this.material = new THREE.LineBasicMaterial({color: 0xffffff});
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}
