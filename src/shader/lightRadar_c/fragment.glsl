uniform vec3 uColor;
uniform float uTime;
varying vec2 vUv;

// 旋转矩阵  shaderbook
mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),
  sin(_angle),cos(_angle));
}

void main(){
  // 旋转 -0.5是为了绕中心旋转
  vec2 newUv=rotate2d(uTime*6.28)*(vUv-.5);
  newUv+=.5;// 重置为 0,1
  
  // vec2(.5)) 即uv中心点
  // 通过每个点到 中心点的距离就能够画出一个圆
  // float alpha=1.-step(.5,distance(vUv,vec2(.5)));
  float alpha=1.-step(.5,distance(newUv,vec2(.5)));
  
  // atan将XY坐标转换为角度
  // 都减去 0.5 表示 计算与(0.5,0.5)之间的夹角
  // float angle=atan(vUv.x-.5,vUv.y-.5);// 0 ~ PI
  float angle=atan(newUv.x-.5,newUv.y-.5);// 0 ~ PI
  float strength=(angle+3.14)/6.28;// 0 ~ 1
  gl_FragColor=vec4(uColor,alpha*strength);
}