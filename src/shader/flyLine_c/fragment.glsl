varying float vSize;
uniform vec3 uColor;
void main(){
  // gl_PointCoord 每个点的位置
  float distanceToCenter=distance(gl_PointCoord,vec2(.5,.5));
  float strength=1.-(distanceToCenter*2.);
  if(vSize<=0.){
    gl_FragColor=vec4(1.,0.,0.,0.);// 必须结合材质透明
  }else{
    gl_FragColor=vec4(uColor,strength);
  }
}