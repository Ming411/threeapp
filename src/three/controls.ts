import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import cameraModule from './camera';
import rendererModule from './renderer';
import eventHub from '@/utils/eventHub';

type controlsType = 'setOrbitControls' | 'setFlyControls' | 'setFirstPersonControls';
class ControlsModule {
	controls?: OrbitControls | FlyControls | FirstPersonControls;
	constructor() {
		this.setOrbitControls(); // 设置轨迹球控制器
		eventHub.on('toggleControls', (name) => {
			this[`set${name}Controls` as controlsType]();
		});
	}
	setOrbitControls() {
		// 初始化控制器
		this.controls = new OrbitControls(cameraModule.activeCamera, rendererModule.renderer.domElement);
		// 设置控制器阻尼
		this.controls.enableDamping = true;
		// 设置自动旋转
		// controls.autoRotate = true;

		// 0 ~ 90
		this.controls.maxPolarAngle = Math.PI / 2;
		this.controls.minPolarAngle = 0;
	}
	setFlyControls() {
		// 飞行控制器，需要在更新时传递 间隔时间
		this.controls = new FlyControls(cameraModule.activeCamera, rendererModule.renderer.domElement);
		this.controls.movementSpeed = 100; // 移动速度
		this.controls.rollSpeed = Math.PI / 60; // 旋转速度
	}
	setFirstPersonControls() {
		// 第一人称视角控制器
		// 与飞行控制器之间的区别就是 不会造成倾斜角
		this.controls = new FirstPersonControls(cameraModule.activeCamera, rendererModule.renderer.domElement);
	}
}

export default new ControlsModule();
