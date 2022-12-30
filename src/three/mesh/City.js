import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import scene from '../scene';
import modifyCityMaterial from '../modify/modifyCityMaterial';
import FlyLine from './FlyLine';
import FlyLineShader from './FlyLineShader';
import MeshLine from './MeshLine';
import LightWall from './LightWall';
import LightRadar from './LightRadar';
import AlarmSprite from './AlarmSprite';

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('./model/city.glb', gltf => {
    // traverse 遍历 GLTF文件中场景节点
    gltf.scene.traverse(item => {
      if (item.type == 'Mesh') {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33) // 给建筑设置基础颜色
        });
        item.material = cityMaterial;
        modifyCityMaterial(item);
        if (item.name == 'Layerbuildings') {
          // 给建筑物添加border
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x;
          meshLine.mesh.scale.set(size, size, size);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene);
  });
}
