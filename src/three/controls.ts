import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import cameraModule from './camera';
import renderer from './renderer';

// 初始化控制器
const controls = new OrbitControls(cameraModule.activeCamera, renderer.domElement);
// 设置控制器阻尼
controls.enableDamping = true;
// 设置自动旋转
// controls.autoRotate = true;

export default controls;
