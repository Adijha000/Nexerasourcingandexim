/* Lightweight 3D wireframe globe with an India→China trade arc (Three.js) */
(function(){
  var canvas=document.getElementById('globe');
  if(!canvas||typeof THREE==='undefined')return;
  var w=canvas.clientWidth,h=canvas.clientHeight;
  var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(w,h,false);
  var scene=new THREE.Scene();
  var cam=new THREE.PerspectiveCamera(45,w/h,0.1,100);cam.position.z=6.2;

  var globe=new THREE.Group();scene.add(globe);
  var R=2.2;
  // wireframe sphere
  var sphere=new THREE.Mesh(new THREE.SphereGeometry(R,36,28),
    new THREE.MeshBasicMaterial({color:0x2a5bd7,wireframe:true,transparent:true,opacity:0.28}));
  globe.add(sphere);
  // glow points
  var ptsGeo=new THREE.BufferGeometry(),arr=[];
  for(var i=0;i<420;i++){var t=Math.acos(2*Math.random()-1),p=2*Math.PI*Math.random();
    arr.push(R*Math.sin(t)*Math.cos(p),R*Math.sin(t)*Math.sin(p),R*Math.cos(t));}
  ptsGeo.setAttribute('position',new THREE.Float32BufferAttribute(arr,3));
  globe.add(new THREE.Points(ptsGeo,new THREE.PointsMaterial({color:0xE9B24A,size:0.03,transparent:true,opacity:0.7})));

  function ll(lat,lon,r){var la=lat*Math.PI/180,lo=lon*Math.PI/180;
    return new THREE.Vector3(r*Math.cos(la)*Math.cos(lo),r*Math.sin(la),-r*Math.cos(la)*Math.sin(lo));}
  var india=ll(22,78,R),china=ll(23,113,R); // India (Gujarat-ish) -> Guangzhou
  [india,china].forEach(function(v){var m=new THREE.Mesh(new THREE.SphereGeometry(0.06,12,12),new THREE.MeshBasicMaterial({color:0xE9A020}));m.position.copy(v);globe.add(m);});
  // arc
  var mid=india.clone().add(china).multiplyScalar(0.5).setLength(R*1.5);
  var curve=new THREE.QuadraticBezier3?null:null;
  var pts=[];for(var s=0;s<=40;s++){var tt=s/40;
    var a=india.clone().lerp(mid,tt),b=mid.clone().lerp(china,tt);pts.push(a.lerp(b,tt));}
  var arc=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:0xE9B24A,transparent:true,opacity:0.9}));
  globe.add(arc);

  globe.rotation.x=0.35;
  function animate(){requestAnimationFrame(animate);globe.rotation.y+=0.0016;renderer.render(scene,cam);}
  animate();
  window.addEventListener('resize',function(){w=canvas.clientWidth;h=canvas.clientHeight;cam.aspect=w/h;cam.updateProjectionMatrix();renderer.setSize(w,h,false);});
})();
