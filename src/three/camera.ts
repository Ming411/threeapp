import * as THREE from 'three';
// import type { PerspectiveCamera } from 'three';
import eventHub from '@/utils/eventHub';
// 创建透视相机
const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 1, 10000);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(1000, 1000, 15);

// 动态相机
class CameraModule {
	activeCamera: any;
	collection: any;
	constructor() {
		this.activeCamera = camera;
		this.collection = {
			default: camera,
		};
		eventHub.on('toggleCamera', (name) => {
			this.setActive(name);
		});
	}
	add(name: string, camera: any) {
		this.collection[name] = camera;
	}
	setActive(name: string) {
		this.activeCamera = this.collection[name];
	}
}

// export default camera;
export default new CameraModule();
