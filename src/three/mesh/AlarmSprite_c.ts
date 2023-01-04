import * as THREE from 'three';
import type {Sprite, SpriteMaterial, Raycaster, Vector2} from 'three';
import camera from '../camera';

interface CMouseEvent extends MouseEvent {
  alarm?: any;
}

type TextureType = Record<string, string>;

export default class AlarmSprite {
  material: SpriteMaterial;
  mesh: Sprite;
  fns: any[];
  raycaster: Raycaster;
  mouse: Vector2;
  constructor(
    type: string = '火警',
    position: {x: number; z: number} = {x: -1.8, z: 3},
    color: number | string = 0xffffff
  ) {
    const textureLoader = new THREE.TextureLoader();
    const typeObj: TextureType = {
      火警: './textures/tag/fire.png',
      治安: './textures/tag/jingcha.png',
      电力: './textures/tag/e.png'
    };
    const map = textureLoader.load(typeObj[type]);
    this.material = new THREE.SpriteMaterial({
      map: map,
      color: color,
      // blending: THREE.AdditiveBlending, // 混合场景其他建筑颜色
      transparent: true,
      depthTest: false // 关闭深度检测
    });
    // 精灵是一个总是面朝着摄像机的平面，通常含有使用一个半透明的纹理。
    this.mesh = new THREE.Sprite(this.material);
    this.mesh.position.set(position.x, 3.5, position.z);
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
  // 移除的方法
  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
