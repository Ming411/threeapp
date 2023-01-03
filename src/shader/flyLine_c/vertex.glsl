attribute float aSize;
uniform float uTime;
uniform float uLength;
varying float vSize;
void main(){
  vec4 viewPosition=viewMatrix*modelMatrix*vec4(position,1);
  gl_Position=projectionMatrix*viewPosition;
  // gl_PointSize=10.;
  
  // vSize=(aSize-500.-uTime)*.1;// 当为负数时并不会不显示，需要结合透明色来控制
  // gl_PointSize=aSize*.01;
  // gl_PointSize=vSize;
  
  vSize=(aSize-uTime);
  if(vSize<.0){
    vSize=vSize+uLength;
  }
  vSize=(vSize-500.)*.1;
  
  // 近大远小的效果
  gl_PointSize=-vSize/viewPosition.z;//viewPosition.z（负数） 相机距离场景的距离
}