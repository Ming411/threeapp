varying vec3 vPosition;
uniform float uHeight;
void main(){
  // 首先要将透明度转为0~1
  // vPosition.y 为 -1~1   uHeight=2
  // (vPosition.y+uHeight/2.)   0 ~ 1
  float gradMix=(vPosition.y+uHeight/2.)/uHeight;
  gl_FragColor=vec4(1.,0.,0.,1.-gradMix);
}