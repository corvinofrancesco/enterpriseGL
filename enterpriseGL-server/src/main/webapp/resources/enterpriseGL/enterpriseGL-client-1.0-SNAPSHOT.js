function EntController(a){var b=new ContainerManager({info:"descriptionBox",main:"container"});
this.configuration=a||{};
this.model=new EntModel();
if(!a.defaultModel){SimulationLittleSystem()
}else{a.defaultModel()
}this.graphics=new EntGraphics();
this.model.init(this.graphics);
b.add(this.graphics.renderer.domElement);
this.ui=new EntInteraction(this.graphics);
this.ui.containerManager=b;
EntController.instance=this;
EntController.update()
}EntController.update=function(){requestAnimationFrame(EntController.update);
var a=EntController.instance;
a.ui.update();
a.graphics.update()
};
EntController.changeModel=function(b){var a=EntController.instance.configuration;
$.getJSON(a.infoModelUrl(b),function(c){});
EntController.instance.downloadIndex=0;
EntController.instance.downloadModel();
EntController.instance.model.reset();
EntController.instance.graphics.reset()
};
EntController.prototype={downloadModel:function(){var b=this.configuration.infoModelLoad(this.downloadIndex);
var a=this.model;
$.getJSON(b,function(c){a.addObjects(c.items);
if(!c.lastPacket){EntController.instance.downloadModel()
}});
this.downloadIndex++
}};
function EntGraphics(a){this.width=800;
this.height=600;
if(!a){a=new EntGraphicsConfig()
}this.configuration=a;
this.scene=new THREE.Scene();
this.camera=a.cameraConfig(this.scene,this.width,this.height);
this.controls=a.controlsConfig(this.camera);
this.scene.add(new THREE.AmbientLight(5263440));
this.scene.add(a.lightConfig(this.camera));
this.scene.add(this.plane=a.planeConfig());
this.projector=new THREE.Projector();
this.renderer=new THREE.WebGLRenderer({antialias:true});
this.renderer.sortObjects=false;
this.renderer.setSize(this.width,this.height);
this.renderer.shadowMapEnabled=true;
this.renderer.shadowMapSoft=true;
this.system=new GraphicalSystem();
this.context=new ModelConfiguration(this.system);
this.context.configure({});
this.relations={}
}EntGraphics.prototype={get objectsfunction(){return this.system.objects
},reset:function(){for(var a in this.system.particles){var b=this.system.particles[a];
this.removeParticle(b)
}this.system=new GraphicalSystem()
},createMouseSelector:function(){return new MouseSelector(this.camera,this.plane,this.system.objects,this.width,this.height)
},update:function(){this.controls.update();
this.system.update();
this.updateRelations();
this.renderer.render(this.scene,this.camera)
},updateModel:function(f){var c=EntObjects.get(f);
if(!c){return
}var d=(new Array()).concat(c.objects);
for(var a in this.system.particles){var e=c.posInObjects(a);
if(e!=-1){d.split(e,1);
this.updateParticle(e)
}else{this.removeParticle(e)
}}for(var a in d){var b=d[a];
if(b){this.addParticle(b)
}}this.updateRelations()
},updateParticle:function(a){},removeParticle:function(d){var b=this.system.particles[d.modelReference];
this.system.remove(d.modelReference);
this.scene.remove(b);
for(var a in this.relations[d.modelReference]){var c=this.relations[d.modelReference][a];
if(c.isOnScene){this.scene.remove(c)
}}this.relations[d.modelReference]=undefined
},addParticle:function(g){var f=this.context.elaborate(g);
this.system.add(f);
this.scene.add(f);
this.relations[g.id]=[];
var a=this.context.relationBuilder();
a.reset(f);
for(var c in g.relations){var e=this.system.findParticle(g.relations[c]);
var d=a.build(e);
if(!d.hasExtremis){d.modelReference[1]=g.relations[c]
}this.relations[g.id].push(d)
}},updateRelations:function(){for(var a in this.relations){for(var b in this.relations[a]){var c=this.relations[a][b];
if(!c.isOnScene){if(!c.hasExtremis){var d=this.system.findParticle(c.modelReference[1]);
if(!d){continue
}c.change(d)
}this.scene.add(c);
c.isOnScene=true
}c.update()
}}}};
function EntGraphicsConfig(){}EntGraphicsConfig.prototype={lightConfig:function(b){var a=new THREE.SpotLight(16777215,1.5);
a.position.set(0,500,2000);
a.castShadow=true;
a.shadowCameraNear=200;
a.shadowCameraFar=b.far;
a.shadowCameraFov=50;
a.shadowBias=-0.00022;
a.shadowDarkness=0.5;
a.shadowMapWidth=1024;
a.shadowMapHeight=1024;
return a
},controlsConfig:function(b){var a=new THREE.TrackballControls(b);
a.rotateSpeed=1;
a.zoomSpeed=1.2;
a.panSpeed=0.8;
a.noZoom=false;
a.noPan=false;
a.staticMoving=true;
a.dynamicDampingFactor=0.3;
return a
},cameraConfig:function(d,a,c){var b=new THREE.PerspectiveCamera(70,a/c,1,10000);
b.position.z=10;
d.add(b);
return b
},planeConfig:function(){var a=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000,8,8),new THREE.MeshBasicMaterial({color:0,opacity:0.25,transparent:true,wireframe:true}));
a.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
a.visible=false;
return a
}};
function EntInteraction(a){var b=a.renderer.domElement;
b.addEventListener("mousemove",EntInteraction.onMouseMove,false);
b.addEventListener("mousedown",EntInteraction.onMouseDown,false);
b.addEventListener("mouseup",EntInteraction.onMouseUp,false);
this.mouse=a.createMouseSelector();
this.offset=new THREE.Vector3();
this.intersectedElem=null;
this.selectElem=null;
this.graphicsManager=a;
this.containerManager=null;
EntInteraction.instance=this
}EntInteraction.changeModel=function(a){EntController.changeModel(a)
};
EntInteraction.onMouseMove=function(f){f.preventDefault();
var d=EntInteraction.instance.mouse;
var c=EntInteraction.instance.graphicsManager;
var a=EntInteraction.instance;
d.update(f.clientX,f.clientY);
if(a.selectElem){var e=d.getPlane();
var g=e[0].point.subSelf(a.offset);
a.moveObject(g);
return
}var b=d.getObjects();
if(b.length>0){if(a.intersectedElem!=b[0].object){a.passOverObject();
a.passOnObject(b[0].object);
c.plane.position.copy(a.intersectedElem.position);
c.plane.lookAt(c.camera.position)
}}else{a.passOverObject()
}};
EntInteraction.onMouseDown=function(f){f.preventDefault();
var c=EntInteraction.instance.graphicsManager;
var d=EntInteraction.instance.mouse;
var a=EntInteraction.instance;
var b=d.getObjects();
if(b.length>0){c.controls.enabled=false;
a.selectObject(b[0].object);
var e=d.getPlane();
if(e[0]){a.offset.copy(e[0].point).subSelf(c.plane.position)
}else{}}};
EntInteraction.onMouseUp=function(c){c.preventDefault();
var b=EntInteraction.instance.graphicsManager;
var a=EntInteraction.instance;
b.controls.enabled=true;
if(a.intersectedElem){b.plane.position.copy(a.intersectedElem.position)
}a.deselectObject()
};
EntInteraction.clickOnObject=function(c){var a=EntInteraction.instance;
if(a.containerManager){var b=EntObjects.getInfo(c);
a.containerManager.writeInfo(b)
}};
EntInteraction.prototype={passOnObject:function(a){this.intersectedElem=a;
this.intersectedElem.currentHex=this.intersectedElem.material.color.getHex();
this.intersectedElem.material.color.setHex(16711680);
EntInteraction.clickOnObject(a.modelReference)
},passOverObject:function(){if(!this.intersectedElem){return
}var a=this.intersectedElem;
a.material.color.setHex(a.currentHex);
this.intersectedElem=null;
if(this.containerManager){this.containerManager.hiddenInfo()
}},selectObject:function(a){this.selectElem=a;
EntInteraction.clickOnObject(a.modelReference);
if(this.containerManager){this.containerManager.container.style.cursor="move"
}},deselectObject:function(){this.selectElem=null;
if(this.containerManager){this.containerManager.container.style.cursor="auto";
this.containerManager.hiddenInfo()
}},moveObject:function(a){this.selectElem.position.copy(a);
if(this.containerManager){this.containerManager.container.style.cursor="move"
}},update:function(){}};
function EntModel(){this.timeline=[];
this.loader=new Loader();
this.loader.callback=this.update;
this.graphics=null;
this.currentEventId="event0";
this.currentEventPos=0;
new EntObjects()
}EntModel.prototype={init:function(b){this.graphics=b;
var a=EntObjects.get(this.currentEventId);
if(a){this.graphics.updateModel(this.currentEventId)
}else{this.loader.wait()
}},getTimeLine:function(){this.timeline=EntObjects.instance.getEvents();
return this.timeline.sort(function(d,c){return(d.date>c.date)-(d.date<c.date)
})
},getNextEvent:function(){if(this.timeline.length<=this.currentEventPos){return this.currentEventId
}var a=this.currentEventPos+1;
return this.timeline[a].id
},getPrevEvent:function(){if(this.currentEventPos<=0){return this.currentEventId
}var a=this.currentEventPos-11;
return this.timeline[a].id
},setToEvent:function(b,c){if(EntObjects.get(b)){this.currentEventId=b;
if(c){if(this.timeline[c].id==b){this.currentEventPos=c;
return c
}}for(var a in this.timeline){if(this.timeline[a].id==b){this.currentEventPos=a;
return a
}}}return null
},update:function(){},reset:function(){EntObjects.instance.objects={}
},addObjects:function(b){for(var a in b){var c=null;
switch(b[a].type){case"particle":c=new EntParticle();
break;
case"event":c=new EntEvent();
break;
default:continue
}c.setProperties(b[a]);
c.register()
}}};
function GraphicalSystem(){this.particles={};
this.objects=[];
this.forces={barneshut:new Force(),relAttr:attractionForce(this.particles,0.02,2),centreforce:gravitation(0.009)};
this.numparticles=0;
this.forces.barneshut.type=Force.types.GLOBAL;
this.globalAlg=new BarnesHut()
}GraphicalSystem.events={ADD:"add",MODIFY:"modify",REMOVE:"remove",ERROR:"error"};
GraphicalSystem.prototype={getFreeSpace:function(){if(this.size()>0){var a=this.globalAlg.getFreeRegion();
if(!(a instanceof THREE.Vector3)){a=new THREE.Vector3(2,2,0);
a.addSelf(this.objects[this.size()-1].position)
}return a
}return new THREE.Vector3(0,0,0)
},getSpaceNextTo:function(b){var d=this.particles[b],a=new THREE.Vector3(0,0,2);
try{var f=this.globalAlg.getFreeRegion(d.barneshut.region);
if(f instanceof THREE.Vector3){return f
}return a.addSelf(d.position)
}catch(c){}return null
},findParticle:function(b){for(var a in this.particles){var c=this.particles[a];
if(c.modelReference==b){return c
}}return null
},size:function(){return this.numparticles
},add:function(c){var b=GraphicalSystem.events.ADD,a={primitive:c};
if(this.particles[c.id]!=undefined){b=GraphicalSystem.events.MODIFY
}else{this.numparticles++;
this.objects.push(c)
}this.particles[c.modelReference]=c;
this.event(b,a)
},remove:function(d){var b=GraphicalSystem.events.REMOVE,c=this.particles[d],a={primitive:c};
if(c){this.particles[d]=undefined;
this.numparticles--
}else{b=GraphicalSystem.events.ERROR
}this.event(b,a);
return c
},event:function(b,a){switch(b){case GraphicalSystem.events.ADD:this.globalAlg.insert(a.primitive);
break;
case GraphicalSystem.events.MODIFY:break;
case GraphicalSystem.events.REMOVE:break;
default:}},update:function(){this.updateAccelerations();
var a=0.5;
for(var c in this.particles){var d=this.particles[c];
var e=d.accelerations.clone().multiplyScalar(0.5*a*a);
e.addSelf(d.velocity.clone().multiplyScalar(a));
var b=d.accelerations.clone().multiplyScalar(a);
d.velocity.addSelf(b);
d.position.addSelf(e)
}},updateAccelerations:function(){for(var e in this.particles){this.particles[e].accelerations=new THREE.Vector3(0,0,0);
this.particles[e].velocity=new THREE.Vector3(0,0,0)
}this.globalAlg.update();
for(var d in this.forces){var f=this.forces[d].force;
var b=this.forces[d].selector;
switch(this.forces[d].type){case Force.types.GLOBAL:this.globalAlg.configureFor(this.forces[d]);
for(var e in this.particles){var c=this.globalAlg.getForceFor(this.particles[e]);
log(c.length(),"LOG",true);
this.particles[e].accelerations.addSelf(c)
}break;
case Force.types.LOCAL:default:for(var e in this.particles){f(this.particles[e])
}break
}}}};
function ModelConfiguration(a){this.pbuilder=new ParticleBuilder(a);
this.rbuilder=new RelationBuilder(a);
this.system=a
}ModelConfiguration.prototype={elaborate:function(a){var b=this.pbuilder.build(a);
return b
},elaborateRelation:function(c,b){var a=this.rbuilder.build(c,b);
return a
},relationBuilder:function(){return this.rbuilder
},configure:function(a){var c=new ParticleCube();
this.pbuilder.setGeometry(c.geometries.CUBE01);
this.pbuilder.setGenerator(c.generator);
this.pbuilder.setProperties(a);
var b=new Relation();
this.rbuilder.setGeometry(b.geometry);
this.rbuilder.setGenerator(b.generator);
this.rbuilder.setProperties(a)
}};
function ParticleBuilder(a){this.geometry=null;
this.generator=null;
this.properties=null;
this.system=a
}ParticleBuilder.prototype={setGeometry:function(a){this.geometry=a
},setGenerator:function(a){this.generator=a
},setProperties:function(a){this.properties=a
},build:function(c){var a=this.generator(this.geometry,this.properties);
var d=null;
if(c.relations.length>0){for(var b in c.relations){d=this.system.getSpaceNextTo(c.relations[b]);
if(d!=null){break
}}}if(d==null){d=this.system.getFreeSpace()
}a.position=d;
a.modelReference=c.id;
a.type="particle";
a.relations=c.relations;
a.accelerations=new THREE.Vector3(0,0,0);
a.velocity=new THREE.Vector3(0,0,0);
return a
}};
function RelationBuilder(a){this.geometry=null;
this.generator=null;
this.properties=null;
this.system=a;
this.object=null;
this.originPoint=null
}RelationBuilder.prototype={setGeometry:function(a){this.geometry=a
},setGenerator:function(a){this.generator=a
},setProperties:function(a){this.properties=a
},reset:function(a){this.originPoint=a
},build:function(a){this.object=this.generator(this.geometry,this.properties);
this.object.type="relation";
this.object.modelReference=[this.originPoint.modelReference];
this.object.hasExtremis=false;
this.object.isOnScene=false;
this.object.position=this.originPoint.position;
this.object.change=RelationBuilder.changeExtremis;
this.object.update=RelationBuilder.updateRelation;
this.object.change(a);
return this.object
}};
RelationBuilder.changeExtremis=function(a){this.extremis=a;
if(a!=null){this.modelReference[1]=a.modelReference;
this.update();
this.hasExtremis=true
}};
RelationBuilder.updateRelation=function(){var g=this.extremis;
var f=g.position.clone().subSelf(this.position);
var c=f.length(),a=f.normalize();
var b=new THREE.Vector3(0,1,0).crossSelf(f);
var d=Math.acos(new THREE.Vector3(0,1,0).dot(a));
this.matrix=new THREE.Matrix4().makeRotationAxis(b.normalize(),d);
this.scale.set(c,c,c);
this.rotation.getRotationFromMatrix(this.matrix)
};
function ParticleCube(){}ParticleCube.prototype={geometries:{CUBE01:new THREE.CubeGeometry(1,1,1),CUBE10:new THREE.CubeGeometry(10,10,10),CUBE20:new THREE.CubeGeometry(20,20,20),CUBE40:new THREE.CubeGeometry(40,40,40)},generator:function(b,d){var c=new THREE.MeshLambertMaterial({color:Math.random()*16777215});
var a=new THREE.Mesh(b,c);
a.material.ambient=a.material.color;
a.rotation=new THREE.Vector3(0,0,0);
a.scale=new THREE.Vector3(1,1,1);
a.castShadow=true;
a.receiveShadow=true;
return a
}};
function ParticleStar(){this.geometry=new THREE.Geometry();
this.geometry.vertices.push(new THREE.Vector3(0,0,0))
}ParticleStar.prototype={generator:function(d,h){var c=THREE.ImageUtils.loadTexture("ball.png");
var a=[0.2,0.5,0.9];
var b=20;
var e=new THREE.ParticleBasicMaterial({size:b,map:c,blending:THREE.AdditiveBlending,depthTest:false,transparent:false});
e.color.setHSV(a[0],a[1],a[2]);
var g=new THREE.Geometry();
g.vertices.push(new THREE.Vector3(0,0,0));
var f=new THREE.ParticleSystem(g,e);
f.constructor=THREE.Particle;
f.scale=new THREE.Vector3(1,1,1);
return f
}};
function Relation(){var a=new THREE.Geometry();
a.vertices.push(new THREE.Vector3(0,0,0));
a.vertices.push(new THREE.Vector3(0,1,0));
this.geometry=a
}Relation.prototype={generator:function(c,e){var a={color:16724991};
if(e.color){a={color:e.color}
}var d=new THREE.LineBasicMaterial(a);
var b=new THREE.Line(c,d);
return b
},};
function Force(){this.selector=function(){return true
};
this.force=function(){};
this.type=Force.types.LOCAL
}Force.types={GLOBAL:"global",LOCAL:"local",ONRELATIONS:"onRelations"};
function attractionForce(b,a,d){var c=new Force();
c.type=Force.types.LOCAL;
c.force=function(h){for(var f in h.relations){var g=h.relations[f],i=b[g],e=0;
var j=i.position.clone().subSelf(h.position);
e=j.length();
if(e==0){j.set(Math.random(),Math.random(),Math.random())
}if(e<d-0.5){j.negate()
}else{if(e<d+0.5){continue
}}j.multiplyScalar(a);
h.accelerations.addSelf(j)
}log(h.modelReference+" -> "+h.accelerations.length(),"LOG"+h.modelReference,true)
};
return c
}function gravitation(a){var b=new Force();
b.type=Force.types.LOCAL;
b.force=function(c){var d=c.position.clone().normalize();
d.multiplyScalar(-a);
c.accelerations.addSelf(d)
};
return b
}function attrito(b){var a=new Force();
a.type=Force.types.LOCAL;
a.force=function(d){var c=d.accelerations.clone().multiplyScalar(b);
d.accelerations.subSelf(c)
};
return a
};
function BarnesHut(){this.root=new Region(0,0,0);
this.root.range=100
}BarnesHut.prototype={insert:function(a){if(!a.position){return false
}if(!this.root.contains(a)){this.root.resize(a.position.length()+50)
}a.barneshut={region:this.root,insertPos:a.position.clone()};
if(!a.getMass){a.getMass=function(){return 1
}
}this.root.insert(a);
return true
},remove:function(b){if(!b.barneshut){return false
}var d=b.barneshut.region.childs;
for(var a in d){if(d[a]==b){d.splice(a,1);
if(d.length==0){var c=b.barneshut.region;
if(c.parent){c.parent.childs[c.index]=undefined
}}return true
}}return false
},update:function(){var d=[this.root],a=[];
while(d.length>0){var c=d.shift();
if(c instanceof Region){c.computeCenterOfMass();
d.push(c.childs)
}else{if(c!=undefined){if(c.barneshut!=undefined){var b=c.barneshut.region;
if(!b.contains(c)){a.push(c);
if(b.parent){b.parent.reinsert(c,b)
}}}}}}},getForceFor:function(e){var f=[{elem:this.root,dsq:this.root.range*2}],h=new THREE.Vector3(0,0,0);
while(f.length>0){var k=f.shift();
var c=k.elem,j=k.dsq,b=e.position.clone().subSelf(c.position);
var g=b.lengthSq();
if(g<j){if(c instanceof Region){for(var d in c.childs){f.push({elem:c.childs[d],dsq:j*0.25})
}}else{if(c!=this){h.addSelf(this.getForce(c,b,g))
}}}else{h.addSelf(this.getForce(c,b,g))
}}return h.multiplyScalar(e.getMass())
},getForce:function(e,g,f){var d=1/Math.sqrt(f+BarnesHutConfig.epssq()),c=g.clone(),b=e.getMass();
if(c.lengthSq()<0.01){c.set(Math.random(),Math.random(),Math.random()).normalize()
}c.multiplyScalar(b*d*d*d/100);
return c
},getFreeRegion:function(g){var f=[g||this.root],b=[],d=0,c;
while(f.length>0){var h=f.shift();
if(!h.childs){return h.centre
}if(h.childs.length==0){return h.centre
}for(var a=0;
a<8;
a++){var e=h.childs[a];
if(!e){return h.getCentreForSubRegion(a)
}else{if(e instanceof Region){d+=0.125;
f.push(e);
if(b.length>0){c=b[0];
if(c.peso-d>=1){return c.region.getPosNextTo(c.index,c.particle)
}}}else{b.push({region:h,index:a,level:Math.round(d),particle:e})
}}}}c=b[0];
return c.region.getPosNextTo(c.index,c.particle)
},configureFor:function(a){}};
var BarnesHutConfig={dtime:0.025,dthf:function(){return 0.5*BarnesHutConfig.dtime
},tol:0.5,itolsq:function(){return 1/(BarnesHutConfig.tol*BarnesHutConfig.tol)
},eps:0.5,epssq:function(){return BarnesHutConfig.eps*BarnesHutConfig.eps
}};
function Particle(a){this.x=0;
this.y=0;
this.z=0;
this.velocity={x:0,y:0,z:0};
this.directions={x:0,y:0,z:0};
this.accelerations={x:0,y:0,z:0};
this.color={r:0,g:1,b:0.5};
this.energy=1;
this.mass=1;
this.id=a;
this.propertyCallBack=null
}Particle.prototype={move:function(a,c,b){this.x+=a;
this.y+=c;
this.z+=b;
return this
},quadDistance:function(c){var b=c||{x:0,y:0,z:0};
var a={x:(this.x-b.x),y:(this.y-b.y),z:(this.z-b.z)};
return a.x*a.x+a.y*a.y+a.z*a.z
},distance:function(a){return Math.sqrt(this.quadDistance(a))
},getProperty:function(a){},dirArray:function(){return new Array(this.directions.x,this.directions.y,this.directions.z)
},velArray:function(){return new Array(this.velocity.x,this.velocity.y,this.velocity.z)
},accArray:function(){return new Array(this.accelerations.x,this.accelerations.y,this.accelerations.z)
},colArray:function(){return new Array(this.color.r,this.color.g,this.color.b)
},advance:function(){var d,b,a;
var f,e,c;
d=this.accelerations.x*BarnesHutConfig.dthf();
b=this.accelerations.y*BarnesHutConfig.dthf();
a=this.accelerations.z*BarnesHutConfig.dthf();
f=this.velocity.x+d;
e=this.velocity.y+b;
c=this.velocity.z+a;
this.x+=f*BarnesHutConfig.dtime;
this.y+=e*BarnesHutConfig.dtime;
this.z+=c*BarnesHutConfig.dtime;
this.velocity.x=f+d;
this.velocity.y=e+b;
this.velocity.z=c+a
},computeForce:function(a,b){var e,d,c;
e=this.accelerations.x;
d=this.accelerations.y;
c=this.accelerations.z;
this.accelerations.x=0;
this.accelerations.y=0;
this.accelerations.z=0;
this.recurseForce(a,b*b*BarnesHutConfig.itolsq());
this.velocity.x+=(this.accelerations.x-e)*BarnesHutConfig.dthf();
this.velocity.y+=(this.accelerations.y-d)*BarnesHutConfig.dthf();
this.velocity.z+=(this.accelerations.z-c)*BarnesHutConfig.dthf()
},recurseForce:function(d,i){var j;
var h,k,e,b,c=d.point.clone().subSelf(j),g=new THREE.Vector3(0,0,0);
h=c.lengthSq();
var f=this;
if(h<i){if(d instanceof Region){i*=0.25;
d.childs.forEach(function(a){if(a!=undefined){f.recurseForce(a,i)
}})
}else{if(d!=this){h+=BarnesHutConfig.epssq();
b=1/Math.sqrt(h);
e=d.mass*b*b*b;
c.multiplyScalar(e);
g.addSelf(c)
}}}else{h+=BarnesHutConfig.epssq();
b=1/Math.sqrt(h);
e=d.mass*b*b*b;
c.multiplyScalar(e);
g.addSelf(c)
}}};
function Region(a,c,b){this.type="defcube";
this.centre=new THREE.Vector3(a,c,b);
this.position=new THREE.Vector3(a,c,b);
this.mass=1;
this.range=10;
this.parent=null;
this.childs=[];
this.index=0
}Region.centerVectors=[new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,-1,-1),new THREE.Vector3(-1,1,-1),new THREE.Vector3(1,1,-1),new THREE.Vector3(-1,-1,1),new THREE.Vector3(1,-1,1),new THREE.Vector3(-1,1,1),new THREE.Vector3(1,1,1)];
Region.prototype={contains:function(c){var b=this.range;
var g=c.position.clone().subSelf(this.centre);
if(this.type=="spherical"){return(b*b>=g.lengthSq())
}var f=Math.abs(g.x),e=Math.abs(g.y),d=Math.abs(g.z);
var a=Math.max(f,e,d);
if(this.type=="defcube"){return b>=a
}else{return b>a
}},move:function(a,c,b){this.centre.set(a,c,b)
},resize:function(a){this.range=a
},forEach:function(a){this.childs.forEach(function(d,c,b){a(d)
})
},getPosNextTo:function(a,e){var c=this.getCentreForSubRegion(a);
var b=new Region(c.x,c.y,c.z);
var d=b.getIndexRegionForParticle(e);
return b.getCentreForSubRegion((d+1)%8)
},getCentreForSubRegion:function(a){var b=Region.centerVectors[a].clone().multiplyScalar(this.range*0.5);
return this.centre.clone().addSelf(b)
},getIndexRegionForParticle:function(a){var b=0;
if(this.centre.x<a.position.x){b=1
}if(this.centre.y<a.position.y){b+=2
}if(this.centre.z<a.position.z){b+=4
}return b
},createSubRegion:function(d,f){var c=new Region(),e=this.childs[d],b=this.range*0.5;
var g=Region.centerVectors[d].clone().multiplyScalar(b);
c.centre=this.centre.clone().addSelf(g);
c.range=b;
c.parent=this;
c.index=d;
var h=new THREE.Vector3().copy(e.position).subSelf(f.position);
if(h.lengthSq()<1){c.insert(e);
var a=Math.max(7,this.childs.length);
this.childs[a++]=f;
return
}c.insert(e);
c.insert(f);
this.childs[d]=c
},insert:function(a){var b=this.getIndexRegionForParticle(a);
a.barneshut.region=this;
if(this.childs[b]==undefined){this.childs[b]=a
}else{if(this.childs[b] instanceof Region){this.childs[b].insert(a,this.range)
}else{this.createSubRegion(b,a)
}}},reinsert:function(a,c){if(c){for(var b in c.childs){if(c.childs[b]==a){c.childs[b]=undefined
}}}if(!this.contains(a)){if(this.parent){this.parent.reinsert(a)
}return
}this.insert(a)
},computeCenterOfMass:function(){var c=0,e=new THREE.Vector3(0,0,0);
for(var b in this.childs){var d=this.childs[b];
if(d instanceof Region){d.computeCenterOfMass()
}var a=d.getMass();
c+=a;
e.addSelf(d.position.clone().multiplyScalar(a))
}this.position=e.multiplyScalar(1/c);
this.mass=c
},getMass:function(){return this.mass
}};
function EntElement(){this.type="particle";
this.description="This is an empty object of enterprise";
this.id=0
}EntElement.prototype={getDescription:function(){return this.getDescription()
},getId:function(){return this.id
},setId:function(a){this.id=a
},register:function(){EntObjects.register(this)
},unregister:function(){EntObjects.unregister(this)
}};
function EntEvent(){EntElement.call(this);
this.type="event";
this.graphicalModel=null;
this.title="event";
this.date=new Date();
this.objects=[]
}EntEvent.prototype=new EntElement();
EntEvent.prototype.constructor=EntEvent;
EntEvent.prototype.getDescription=function(){var c="";
c+="<h1>"+this.date+": "+this.title+"</h1>";
c+="<p>"+this.description+"</p>";
if(this.relations.length>0){c+="<ul>";
for(var a in this.objects){var b=EntObjects.instance.generateLink(this.objects[a]);
c+="<li>"+b+"</li>"
}c+="</ul>"
}return c
};
EntEvent.prototype.posInObjects=function(a){if(a instanceof EntParticle){a=a.id
}return $.inArray(a,this.objects)
};
EntEvent.prototype.setProperties=function(a){this.setId(a.id);
this.title=a.nametime||this.title;
this.date=a.date||this.date;
this.description=a.description;
this.objects=a.objects
};
function EntObjects(){this.objects={};
this.array=[];
this.undefLink="Undefined Object";
this.callbackName="EntInteraction.clickOnObject";
EntObjects.instance=this
}EntObjects.prototype={generateLink:function(e){if(!this.objects[e]){return this.undefLink
}var a=this.objects[e],b="",d="object "+e,c="";
if(a.title){d=a.title
}if(a.shortDescription){b=a.shortDescription()
}c+="<a onclick='"+this.callbackName+'("'+e+"\");'>";
c+=d+"</a>:"+b;
return c
},getParticles:function(){var a=[];
for(var b in this.objects){var c=this.objects[b];
if(c instanceof EntElement){a.push(c)
}}return a
},getEvents:function(){var a=[];
for(var b in this.objects){var c=this.objects[b];
if(c instanceof EntEvent){a.push(c)
}}return a
}};
new EntObjects();
EntObjects.register=function(a){EntObjects.instance.objects[a.id]=a
};
EntObjects.unregister=function(a){EntObjects.instance.objects[a.id]=undefined
};
EntObjects.get=function(a){if(EntObjects.instance.objects[a]){return EntObjects.instance.objects[a]
}else{return null
}};
EntObjects.getInfo=function(a){return EntObjects.get(a).getDescription()
};
EntObjects.getLink=function(a){return EntObjects.instance.generateLink(a)
};
function EntParticle(){EntElement.call(this);
this.graphicalModel=new ParticleCube();
this.title="empty";
this.body="empty";
this.relations=[];
this.changes={}
}EntParticle.prototype=new EntElement();
EntParticle.prototype.constructor=EntParticle;
EntParticle.prototype.getDescription=function(){var c="";
c+="<h1>"+this.title+"</h1>";
c+="<p>"+this.definition+"</p>";
c+="<p>"+this.description+"</p>";
if(this.relations.length>0){c+="<ul>";
for(var a in this.relations){var b=EntObjects.instance.generateLink(this.relations[a]);
c+="<li>"+b+"</li>"
}c+="</ul>"
}return c
};
EntParticle.prototype.setProperties=function(a){this.setId(a.id);
this.title=a.title||this.title;
this.relations=this.relations.concat(a.relations);
this.description=a.description||"there isn't description for this element!";
this.definition=a.definition||"not defined!"
};
EntParticle.prototype.getChange=function(b){if(!this.changes[b]){return this
}var a=new EntParticle();
a.id=this.id;
a.relations=this.changes[b].relations;
a.properties=this.changes[b].properties;
return a
};
function Loader(){this.callback=EntModel.update;
this.updated=false
}Loader.prototype={setup:function(){},wait:function(){},isUpdated:function(){return this.updated
}};
Loader.count=20;
function ContainerManager(a){this.container=document.getElementById(a.main);
this.infoContainer=document.getElementById(a.info)
}ContainerManager.prototype={writeInfo:function(a){this.infoContainer.innerHTML=a;
this.infoContainer.style.dysplay=true
},hiddenInfo:function(){this.infoContainer.style.dysplay=false
},add:function(a){this.container.appendChild(a)
}};
function MouseSelector(d,b,e,a,c){this.camera=d;
this.plane=b;
this.objects=e;
this.width=a;
this.height=c;
this.projector=new THREE.Projector();
this.ray=null
}MouseSelector.prototype={update:function(d,c){var a=(d/this.width)*2-1;
var e=-(c/this.height)*2+1;
var b=new THREE.Vector3(a,e,1);
this.projector.unprojectVector(b,this.camera);
this.ray=new THREE.Ray(this.camera.position,b.subSelf(this.camera.position).normalize())
},getObjects:function(){if(this.ray==null){return null
}var a=this.ray.intersectObjects(this.objects);
return a
},getPlane:function(){if(this.ray==null){return null
}var a=this.ray.intersectObject(this.plane);
return a
}};
function SimulationConeTree(){var l=new EntEvent(),n=[],f=100,d=10,e=5,b=[{estr:1,row:1}],a=[1,0];
for(var q=1;
q<=d;
q++){var h=Math.floor(Math.random()*b[q-1].estr*e+1);
var t=b[q-1].estr+b[q-1].row;
b[q]={estr:h,row:t}
}for(var r=0;
r<f;
r++){var p=new EntParticle(),c=[];
if(r!=0){var o=a[r-1]+1,g=b[o];
a[r]=(g.row==r+1)?o:a[r-1];
var m=0;
if(a[r]!=1){var s=a[r]-1;
m=b[s].row+Math.floor(Math.random()*b[s].estr)
}var k="part"+m;
if(EntObjects.get(k)){c.push(k)
}else{alert(k+" non esiste!: "+b[s].row+" - "+(Math.floor(Math.random()*b[s].estr)))
}}p.setProperties({id:"part"+r,title:"Particella "+r,definition:"Particella d'esempio numero "+r,relations:c});
p.register();
n.push(p)
}l.setProperties({id:"event0",nametime:new Date(),description:"Event for testing cone tree relations",objects:n});
l.register()
};
function SimulationLittleSystem(){var d=new EntEvent();
var g=new EntParticle(),f=new EntParticle(),e=new EntParticle(),c=new EntParticle(),b=new EntParticle(),a=new EntParticle();
g.setProperties({id:"part1",title:"Particella 01",definition:"Particella d'esempio numero 01",relations:["part2","part3"]});
g.register();
f.setProperties({id:"part2",title:"Particella 02",definition:"Particella d'esempio numero 02",relations:["part3"]});
f.register();
e.setProperties({id:"part3",title:"Particella 03",definition:"Particella d'esempio numero 03",relations:[]});
e.register();
c.setProperties({id:"part4",title:"Particella 04",definition:"Particella d'esempio numero 04",relations:["part1","part2"]});
c.register();
b.setProperties({id:"part5",title:"Particella 05",definition:"Particella d'esempio numero 05",relations:["part3","part2"]});
b.register();
a.setProperties({id:"part6",title:"Particella 06",definition:"Particella d'esempio numero 06",relations:["part1"]});
a.register();
d.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:[g,f,e,c,b,a]});
d.register()
};
function SimulationRandomGraph(){var l=new EntEvent(),d=[],h=5000;
for(var f=0;
f<h;
f++){var b=new EntParticle();
var k=[],g=Math.round(Math.random()*5);
for(var e=0;
e<g;
e++){var c=Math.round(Math.random()*h);
var a="part"+c;
if(EntObjects.get(a)){k.push(a)
}}b.setProperties({id:"part"+f,title:"Particella "+f,definition:"Particella d'esempio numero "+f,relations:k});
b.register();
d.push(b)
}l.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:d});
l.register()
};
function SimulationTwoParticles(){var a=new EntEvent();
var c=new EntParticle(),b=new EntParticle();
c.setProperties({id:"part1",title:"Particella 01",definition:"Particella d'esempio numero 01",relations:["part2","part3"]});
c.register();
b.setProperties({id:"part2",title:"Particella 02",definition:"Particella d'esempio numero 02",relations:["part3"]});
b.register();
a.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:[c,b]});
a.register()
};
function FixedParticles(){}FixedParticles.prototype={popolate:function(a){a.add((new Particle(0)),null);
a.add((new Particle(1)).move(2,0,0),null);
a.add((new Particle(2)).move(0,2,0),null);
a.add((new Particle(3)).move(0,0,2),null);
a.add((new Particle(4)).move(0,0,4),null);
a.add((new Particle(5)).move(2,2,0),null);
a.relations=[new Relation(0,1),new Relation(0,2),new Relation(0,3),new Relation(3,4),new Relation(2,5)]
}};
function SimulSystem(){}SimulSystem.prototype={createPart:function(c,b){for(i=0;
i<b;
i++){var a=new Particle(i).move(this.randNum(-1,1)+0.1,this.randNum(-1,1)+0.1,this.randNum(-1,1)+0.1);
a.accelerations={x:this.randNum(-10,10)+0.1,y:this.randNum(1,10)+0.1,z:this.randNum(1,10)+0.1};
c.add(a,null)
}},randNum:function(b,a){return b+Math.random()*a
},createRel:function(c,d){rels=new Array();
var a=0;
for(j=0;
j<d;
){idS=Math.round(this.randNum(0,d-1));
idD=Math.round(this.randNum(0,d-1));
if(idS!=idD){var b=false;
rels.forEach(function(e){if(e.areIndexIn(idS,idD)){b=true
}});
if(!b){rels[j]=new Relation(idS,idD);
j++;
a=0
}else{a++;
if(a>20){break
}}}}c.relations=rels
},popolate:function(d){var b=new Particle(0).move(3,1,0);
var a=new Particle(1).move(-3,2,0);
var c=new Relation(0,1);
d.add(b,c);
d.add(a,c)
}};
