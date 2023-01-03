import * as THREE from 'three';
import type {Sprite, SpriteMaterial, Raycaster, Vector2} from 'three';
import camera from '../camera';

interface CMouseEvent extends MouseEvent {
  alarm?: any;
}

export default class AlarmSprite {
  material: SpriteMaterial;
  mesh: Sprite;
  fns: any[];
  raycaster: Raycaster;
  mouse: Vector2;
  constructor() {
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load('./textures/warning.png');
    this.material = new THREE.SpriteMaterial({map: map});
    // 精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
    this.mesh = new THREE.Sprite(this.material);
    this.mesh.position.set(-4.2, 3.5, -1);
    this.fns = [];
    // 创建射线
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('click', (event: CMouseEvent) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
      this.raycaster.setFromCamera(this.mouse, camera);
      // 射线碰撞对象
      const raycaster = this.raycaster.intersectObject(this.mesh);
      event.alarm = this;
      if (raycaster.length > 0) {
        // 表示点击的是 我们创建的警告图标
        this.fns.forEach(fn => {
          fn(event);
        });
      }
    });
  }
  onClick(fn: any) {
    this.fns.push(fn);
  }
}
