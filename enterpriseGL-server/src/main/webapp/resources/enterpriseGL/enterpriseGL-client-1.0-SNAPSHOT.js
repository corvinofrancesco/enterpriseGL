function EntController(b){var a=new ContainerManager({info:"descriptionBox",main:"container"});
this.model=new EntModel();
this.graphics=new EntGraphics();
a.add(this.graphics.renderer.domElement);
this.ui=new EntInteraction(this.graphics);
this.ui.containerManager=a;
this.configuration=b||{};
if(!this.configuration.defaultModel){this.configuration.defaultModel=SimulationLittleSystem
}EntController.instance=this;
this.configuration.defaultModel();
EntController.update()
}EntController.update=function(){requestAnimationFrame(EntController.update);
var a=EntController.instance;
a.ui.update();
if(a.model.hasChange()){a.graphics.updateModel(a.model.currentEventId)
}a.graphics.update()
};
EntController.changeModel=function(b){var a=EntController.instance.configuration;
EntController.instance.model.reset();
EntController.instance.graphics.reset();
if(a.infoModelUrl){$.getJSON(a.infoModelUrl(b),function(c){EntController.instance.graphics.system.changeDistribution(DistributionAlg.Algoritms(c.typeDiagram))
})
}else{a.defaultModel()
}if(a.infoModelLoad){EntController.instance.downloadIndex=0;
EntController.instance.downloadModel()
}};
EntController.completeDownload=function(){EntController.instance.model.init();
var b=EntController.instance.graphics,a=EntController.instance.model.currentEventId;
b.updateModel(a);
EntController.instance.ui.mouse=b.createMouseSelector()
};
EntController.prototype={downloadModel:function(){var b=this.configuration.infoModelLoad(this.downloadIndex);
var a=this.model;
$.getJSON(b,function(c){a.addObjects(c.items);
if(!c.idPacket==0){}if(!c.lastPacket){EntController.instance.downloadModel()
}else{EntController.completeDownload()
}});
this.downloadIndex++
}};
var EntGL=function(){};
EntGL.ElementType={PARTICLE:"particle",EVENT:"event",RELATION:"relation",AGGREGATION:"aggregation"};
EntGL.SettingsDefault=function(){};
EntGL.SettingsDefault.prototype={createParticleFunctions:{particleGeom:function(){var b=function(h,i,e,g){if(e instanceof EntElement){var d=new ParticleGeomPrimitive();
d.linkToModel(e);
var f=Math.random();
if(f<0.5){d.typePrimitive=ParticleGeomPrimitive.Primitive.SPHERE
}else{d.dimension=1
}if(d.create()==null){return
}h._element=d;
h.settingGen="createParticleGeom";
i.add(d.getElement());
g.add(d.getElement());
return
}};
var c=function(d){return true
};
var a=new EntSetting(c,b);
a.id="createParticleGeom";
return a
},particleAthom:function(){var a=new EntSetting(function(b){return false
},function(d,e,b,c){});
a.id="createParticleAthom";
return a
}},createFunctions:{relationAdding:function(){var b=new EntSetting(null,function(g,h,e,f){if(e instanceof RelationBase){var d=e.getElemInSystem(f);
e.update(d[0],d[1])
}else{if(e instanceof EntRelation){var c=new RelationBase();
c.linkToModel(e);
if(c.create()==null){return
}g._element=c
}}});
var a=function(f,h,d){var g=f.getElement();
if(g instanceof RelationBase){var c=g.getElemInSystem(d);
if((c[0]==null)||(c[1]==null)){return true
}h.add(g.getElement())
}return false
};
b.configureForAdvEvent(EntGraphicalEventControlledEnd,a);
b.elementType=EntGL.ElementType.RELATION;
b.id="createSimpleRelation";
return b
}},removeFunctions:{removeSimple:function(){var a=new EntSetting(null,function(d,e,b,c){e.remove(b.element)
});
a.id="remove";
return a
}},popolate:function(){var a=[],d,b;
for(b in this.createParticleFunctions){d=this.createParticleFunctions[b]();
d.eventType=GraphicalSettings.EventType.ADD;
d.elementType=EntGL.ElementType.PARTICLE;
a.push(d)
}for(b in this.createFunctions){d=this.createFunctions[b]();
d.eventType=GraphicalSettings.EventType.ADD;
a.push(d)
}for(b in this.removeFunctions){for(var c in EntGL.ElementType){d=this.removeFunctions[b]();
d.eventType=GraphicalSettings.EventType.REMOVE;
d.elementType=EntGL.ElementType[c];
d.id=d.id+c;
a.push(d)
}}return a
}};
function EntGraphics(b){this.width=800;
this.height=600;
if(!b){b=new EntGraphicsConfig()
}this.configuration=b;
this.renderer=new THREE.WebGLRenderer({antialias:true});
this.renderer.sortObjects=false;
this.renderer.setSize(this.width,this.height);
this.renderer.shadowMapEnabled=true;
this.renderer.shadowMapSoft=true;
this.scene=new THREE.Scene();
this.camera=b.cameraConfig(this.scene,this.width,this.height);
this.controls=b.controlsConfig(this.camera,this.renderer.domElement);
this.scene.add(new THREE.AmbientLight(5263440));
this.scene.add(b.lightConfig(this.camera));
this.scene.add(this.plane=b.planeConfig());
this.projector=new THREE.Projector();
this.system=new GraphicalSystem();
this.settings=new GraphicalSettings();
var a=new EntGL.SettingsDefault();
this.settings.addSettings(a.popolate());
this.relations={}
}EntGraphics.prototype={get objectsfunction(){return this.system.objects
},reset:function(){for(var a in this.system.particles){var b=this.system.particles[a];
this.removeParticle(b)
}this.system=new GraphicalSystem();
this.settings.clearDiedEvents()
},createMouseSelector:function(){return new MouseSelector(this.camera,this.plane,this.system.objects,this.width,this.height)
},update:function(){this.controls.update();
this.system.update();
var b=this.settings.getEvents(),a=0;
while(b.length>0){var c=b.shift();
if(c.isDied()){}else{c.applyOn(this.scene,this.system)
}a++
}this.renderer.render(this.scene,this.camera)
},updateModel:function(g){var d=EntObjects.get(g);
if(!d){return
}var e=(new Array()).concat(d.objects);
for(var b in this.system.particles){var f=d.posInObjects(b);
if(f!=-1){e.splice(f,1);
var a=EntObjects.get(f);
this.settings.register(GraphicalSettings.EventType.UPDATE,a)
}else{var a=EntObjects.get(f);
this.settings.register(GraphicalSettings.EventType.REMOVE,a)
}}for(var b in e){var c=EntObjects.get(e[b]);
if(c){this.addParticle(c)
}}},updateParticle:function(a){},removeParticle:function(d){var b=this.system.particles[d.modelReference];
this.system.remove(d.modelReference);
this.scene.remove(b);
for(var a in this.relations[d.modelReference]){var c=this.relations[d.modelReference][a];
if(c.isOnScene){this.scene.remove(c)
}}this.relations[d.modelReference]=undefined
},addParticle:function(d){var a=this.settings.register(GraphicalSettings.EventType.ADD,d);
if(a==null){return
}for(var b in d.relations){var c=new EntRelation(d.id,d.relations[b]);
this.settings.register(GraphicalSettings.EventType.ADD,c)
}}};
function EntGraphicsConfig(){}EntGraphicsConfig.prototype={lightConfig:function(b){var a=new THREE.SpotLight(16777215,1.5);
a.position.set(0,5,20);
a.castShadow=true;
a.shadowCameraNear=2;
a.shadowCameraFar=b.far;
a.shadowCameraFov=20;
a.shadowBias=-0.00022;
a.shadowDarkness=0.5;
a.shadowMapWidth=1024;
a.shadowMapHeight=1024;
return a
},controlsConfig:function(b,c){var a=new THREE.TrackballControls(b,c);
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
function GraphicalSettings(){this.settings={};
this.events=[]
}GraphicalSettings.EventType={ADD:"add",REMOVE:"remove",UPDATE:"update"};
GraphicalSettings.prototype={register:function(b,a){var e=this.getSettings(),c;
while(e.length>0){c=e.shift();
if(b==c.eventType){if(a.type==c.elementType){if(c.verifyCondition(a)){var d=c.create(a);
this.events.push(d);
return d
}}}}return null
},remove:function(a){if(a<this.events.length){this.events.splice(a,1)
}},clearDiedEvents:function(){var a=[];
for(var b in this.events){if(!this.events[b].isDied()){a.push(this.events[b])
}}this.events=a
},getEvents:function(){var a=(new Array()).concat(this.events);
return a
},changeSetting:function(a){if(a instanceof EntSetting){this.settings[a.id]=a
}},removeSetting:function(a){this.settings[a.id]=undefined
},getSettings:function(){var a=[];
for(var b in this.settings){if(this.settings[b] instanceof EntSetting){a.push(this.settings[b])
}}return a
},addSettings:function(b){for(var a in b){this.changeSetting(b[a])
}}};
function GraphicalSystem(){this.particles={};
this.objects=[];
this._distributionAlg=new DistributionGraph();
this._distributionAlg.setSystemRepos(this);
this.forces={relAttr:attractionForce(0.02,2),centreforce:gravitation(0.009)};
this.numparticles=0
}GraphicalSystem.prototype={getFreeSpace:function(a){return this._distributionAlg.getPositionFor(a)
},findParticle:function(b){for(var a in this.particles){var c=this.particles[a];
if(c.modelReference==b){return c
}}return null
},size:function(){return this.numparticles
},add:function(a){if(this.particles[a.id]!=undefined){}else{this.numparticles++;
this.objects.push(a)
}this.particles[a.modelReference]=a
},remove:function(b){var a=this.particles[b];
if(a){this.particles[b]=undefined;
this.numparticles--
}return a
},update:function(){this.updateAccelerations();
var a=0.5;
for(var c in this.particles){var d=this.particles[c];
var e=d.accelerations.clone().multiplyScalar(0.5*a*a);
e.addSelf(d.velocity.clone().multiplyScalar(a));
var b=d.accelerations.clone().multiplyScalar(a);
d.velocity.addSelf(b);
d.position.addSelf(e)
}},updateAccelerations:function(){for(var f in this.particles){this.particles[f].accelerations=new THREE.Vector3(0,0,0);
this.particles[f].velocity=new THREE.Vector3(0,0,0)
}this._distributionAlg.update(this);
for(var d in this.forces){var g=this.forces[d].force;
switch(this.forces[d].type){case Force.types.GLOBAL:this.globalAlg.configureFor(this.forces[d]);
for(var e in this.particles){var b=this.globalAlg.getForceFor(this.particles[e]);
this.particles[e].accelerations.addSelf(b)
}break;
case Force.types.ONRELATIONS:for(var c in this.particles){g(this.particles[c],this)
}break;
case Force.types.LOCAL:default:for(var c in this.particles){g(this.particles[c])
}break
}}},changeDistribution:function(a){if(!(a instanceof DistributionAlg)){return false
}this._distributionAlg=a;
this._distributionAlg.setSystemRepos(this);
for(var c in this.particles){var b=this.particles[c];
b.position.copy(this._distributionAlg.getPositionFor(b));
this._distributionAlg.insert(b)
}return true
},reset:function(){this.particles={};
this.objects=[];
this._distributionAlg=new DistributionAlg();
this._distributionAlg.setSystemRepos(this);
this.forces={relAttr:attractionForce(0.02,2),centreforce:gravitation(0.009)};
this.numparticles=0
}};
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
},build:function(b){var a=this.generator(this.geometry,this.properties);
a.modelReference=b.id;
a.type="particle";
a.relations=b.relations;
a.position=this.system.getFreeSpace(a);
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
function Region(a,c,b){this.type="defcube";
this.centre=new THREE.Vector3(a,c,b);
this.position=new THREE.Vector3(a,c,b);
this.mass=1;
this.range=10;
this.parent=null;
this.childs=[];
this.index=0
}Region.prototype={contains:function(c){var b=this.range;
var g=c.position.clone().subSelf(this.centre);
if(this.type=="spherical"){return(b*b>=g.lengthSq())
}var f=Math.abs(g.x),e=Math.abs(g.y),d=Math.abs(g.z);
var a=Math.max(f,e,d);
if(this.type=="defcube"){return b>=a
}else{return b>a
}},move:function(a,c,b){this.centre.set(a,c,b)
},resize:function(a){this.range=a
},remove:function(b){for(var a in this.childs){if(this.childs[a]==b){this.childs[a]=undefined;
return
}}},forEach:function(a){this.childs.forEach(function(d,c,b){a(d)
})
},insert:function(a){a.parent=this;
this.childs.push(a)
},computeCenterOfMass:function(){var c=0,e=new THREE.Vector3(0,0,0);
for(var b in this.childs){var d=this.childs[b],a=0;
if(d==null||d==undefined){continue
}if(d instanceof Region){d.computeCenterOfMass()
}if(d.getMass instanceof Function){a=d.getMass()
}c+=a;
e.addSelf(d.position.clone().multiplyScalar(a))
}this.position=e.multiplyScalar(1/c);
this.mass=c
},getMass:function(){return this.mass
},isEmpty:function(){if(this.childs.length==0){return true
}for(var a in this.childs){if(this.childs[a]){return false
}}return true
}};
function RegionLeaf(b){var a=b||{position:null,modelReference:null};
this.parent=null;
this.position=a.position||new THREE.Vector3(0,0,0);
this._container=a.modelReference?[b.modelReference]:[];
this.error=0.009;
this.mass=0
}RegionLeaf.prototype={getMass:function(){return this.mass
},getOrigin:function(){return this._container
},samePosition:function(a){var b=this.position.clone().subSelf(a.position).lengthSq();
if(b<=this.error){return true
}return false
},unionWith:function(b){var a,c;
if(b instanceof RegionLeaf){a=b._container;
c=b.position
}else{a=b.modelReference;
c=b.position;
if(a==null||a==undefined){return
}a=[a]
}this._container=this._container.concat(a);
this.position.addSelf(c).multiplyScalar(0.5);
this.mass++
},isOnlyFor:function(a){if(this._container.length>1){return false
}if(this._container[0]==a.modelReference){return true
}return false
},have:function(b){for(var a in this._container){if(this._container[a]==b.modelReference){return true
}}return false
},remove:function(b){for(var a in this._container){if(this._container[a]==b.modelReference){this._container.splice(a,1);
return true
}}return false
},isEmpty:function(){if(this._container.length==0){return true
}return false
},update:function(b){this.position=new THREE.Vector3(0,0,0);
if(b.length==0){return
}var c=0;
for(var a in b){if(!this.have(b[a])){continue
}this.position.addSelf(b[a].position);
c++
}if(c>1){this.position.multiplyScalar(1/b.length)
}}};
function DistributionAlg(){this._root=new Region(0,0,0);
this._root.range=100;
this._regions=[this._root];
this._leaves=[];
this._infoRepository=null
}DistributionAlg.Algoritms=function(a){switch(a){case"graph":return new DistributionGraph();
case"conetree":return new DistributionConeTree();
default:return new DistributionAlg()
}};
DistributionAlg.prototype={setSystemRepos:function(a){this._infoRepository=a
},_getInfoFor:function(c){var b=null;
try{b=this._infoRepository.particles[c]
}catch(a){return null
}return b
},_remove:function(c){var b=[];
if(c instanceof Region){b=this._regions
}else{if(c instanceof RegionLeaf){b=this._leaves
}}if(c.parent!=null){c.parent.remove(c)
}for(var a in b){if(b[a]==c){b.splice(a,1);
return
}}},_updateLeaf:function(a,c){for(var b in c){var d=c[b];
if(a.samePosition(d)){continue
}else{if(a.isOnlyFor(d)){a.update(c)
}else{a.remove(d);
this.insert(d)
}}}if(a.isEmpty()){this._remove(a)
}},_insert:function(a,b){var f=[this._root],e=null,g;
while(f.length>0){g=f.shift();
if(g instanceof Region){if(g.contains(a)){e=g;
for(var h in g.childs){f.push(h)
}}}}if(e!=null){e.insert(a)
}else{var d=this.createRegion(a);
this._root.insert(d);
this._regions.push(d)
}},_search:function(d){if(d==undefined||d==null){return null
}var a=[this._root],b=null;
while(a.length>0){b=a.shift();
if(b instanceof Region){if(b.contains(d)){for(var e in b.childs){a.push(b.childs[e])
}}}if(b instanceof RegionLeaf){if(b.have(d)){return b
}}}return null
},getPositionFor:function(a){return new THREE.Vector3(0,0,0)
},update:function(c){if(arguments.length>0){this.setSystemRepos(c)
}var d=[this.root()];
while(d.length>0){var b=d.shift();
if(b instanceof Region){b.computeCenterOfMass();
if(b.isEmpty()){this._remove(b)
}else{d=d.concat(b.childs)
}}else{if(b instanceof RegionLeaf){var a=[],e=this;
b.getOrigin().forEach(function(g){var f=e._getInfoFor(g);
if(!f){b.remove({modelReference:g})
}else{a.push(f)
}});
this._updateLeaf(b,a)
}}}},insert:function(g){var d,h=null;
if(!(g.position instanceof THREE.Vector3)){g.position=this.getPositionFor(g)
}d=this.createLeafRegion(g);
if(this._leaves.length>0){var b=2000,c=0;
if(this._leaves.length>1){for(var a in this._leaves){var f=this._leaves[a];
var e=f.position.clone().subSelf(d.position).lengthSq();
if(e<b){b=e;
c=a
}}}h=this._leaves[c];
if(this._leaves[c].samePosition(d)){return h.unionWith(d)
}}this._leaves.push(d);
this._insert(d,h);
return d
},remove:function(b){for(var a in this._leaves){if(this._leaves[a].have(b)){if(this._leaves[a].isOnlyFor(b)){this._remove(this._leaves[a])
}else{this._leaves[a].remove(b)
}return
}}},reset:function(){this._root=new Region(0,0,0);
this._root.range=100;
this._regions=[];
this._leaves=[]
},root:function(){return this._root
},createLeafRegion:function(b){var a=new RegionLeaf(b);
return a
},createRegion:function(b){var c=b.position,a=new Region(c.x,c.y,c.z);
a.parent=b.parent||this._root;
a.insert(b);
return a
}};
DistributionConeTree.prototype=new DistributionAlg();
DistributionConeTree.constructor=DistributionConeTree;
DistributionConeTree.superclass=DistributionAlg.prototype;
function DistributionConeTree(){};
DistributionGraph.prototype=new DistributionAlg();
DistributionGraph.constructor=DistributionGraph;
DistributionGraph.superclass=DistributionAlg.prototype;
function DistributionGraph(){}DistributionGraph.centerVectors=[new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,-1,-1),new THREE.Vector3(-1,1,-1),new THREE.Vector3(1,1,-1),new THREE.Vector3(-1,-1,1),new THREE.Vector3(1,-1,1),new THREE.Vector3(-1,1,1),new THREE.Vector3(1,1,1)];
DistributionGraph.prototype.getPositionFor=function(e){switch(e.relations.length){case 0:case undefined:case null:return this.euristicFreePosition();
case 1:var b=this._getInfoFor(e.relations[0]),a=null;
a=this._search(b);
if(a==null){return this.euristicFreePosition()
}return this.euristicNextPosition(b,a.parent);
default:var f=new THREE.Vector3(0,0,0),g=0;
for(var c in e.relations){var d=this._getInfoFor(e.relations[c]);
if(d!=null){f.addSelf(d.position);
g++
}}if(g<2){return this.euristicFreePosition()
}f.multiplyScalar(1/g);
return f
}};
DistributionGraph.prototype.euristicFreePosition=function(g){var e=[g||this.root()],b=[],c;
while(e.length>0){var f=e.shift();
if(f.isEmpty()){return f.centre
}for(var a=0;
a<8;
a++){var d=f.childs[a];
if(d instanceof Region){e.push(d)
}else{if(d instanceof RegionLeaf){b.push({region:f,index:a,particle:d})
}else{return this.getCentreFor(a,f)
}}}if(b.length>0){c=b[0];
return this.euristicNextPosition(c.particle,c.region,c.index)
}}return new THREE.Vector3(0,0,0)
};
DistributionGraph.prototype.euristicNextPosition=function(b,e,a){e=e||this.root();
if(arguments.length>=2){a=this.getIndexFor(b,e)
}var d={centre:this.getCentreFor(a,e),range:e.range*0.5};
var c=this.getIndexFor(b,d);
return this.getCentreFor((c+1)%8,d)
};
DistributionGraph.prototype.getIndexFor=function(a,c){var b=0;
if(c.centre.x<a.position.x){b=1
}if(c.centre.y<a.position.y){b+=2
}if(c.centre.z<a.position.z){b+=4
}return b
};
DistributionGraph.prototype.getCentreFor=function(a,b){var c=DistributionGraph.centerVectors[a].clone().multiplyScalar(b.range*0.5);
return b.centre.clone().addSelf(c)
};
DistributionGraph.prototype._insert=function(a,c){var e=[this._root],f,d;
while(e.length>0){f=e.shift();
var b=this.getIndexFor(a,f);
d=f.childs[b];
if(d instanceof Region){e.push(d)
}else{if(d instanceof RegionLeaf){var g=this.createRegion(d,false,false,a);
this._regions.push(g);
return
}else{f.childs[b]=a;
a.parent=f;
return
}}}};
DistributionGraph.prototype._search=function(c){if(c==undefined||c==null){return null
}for(var a in this._leaves){var b=this._leaves[a];
if(b.have(c)){return b
}}return null
};
DistributionGraph.prototype.createRegion=function(f,d,a,k){var l=f.parent||this._root;
var b=d||this.getIndexFor(f,l);
var h=a||this.getCentreFor(b,l);
var j=new Region(h.x,h.y,h.z);
j.parent=l;
j.range=l.range*0.5;
var e=this.getIndexFor(f,j);
j.childs[e]=f;
f.parent=j;
l.childs[b]=j;
if(k){var g=this.getIndexFor(k,j);
if(g!=e){l.childs[g]=k;
k.parent=j
}else{k.parent=j;
f.unionWith(k)
}}return j
};
function EntGraphicalEvent(a,b,c){this._element=a;
this._duration=c;
this._timeStart=null;
this._runningFunction=b
}EntGraphicalEvent.prototype={isDied:function(){if(this._timeStart==null){return false
}var a=(new Date())-this._timeStart;
return a>this._duration
},applyOn:function(b,a){if(this._timeStart==null){this.startTimer()
}this._runningFunction(this,b,this._element,a)
},startTimer:function(){this._timeStart=new Date()
},getElement:function(){return this._element
}};
var EntGraphicalEventControlledEnd=function(a,c,b){this._element=a;
this._duration=0;
this._timeStart=null;
this._runningFunction=c;
this._endCondition=b||function(){return false
};
this._numIteration=0
};
EntGraphicalEventControlledEnd.prototype=new EntGraphicalEvent(null,null,0);
EntGraphicalEventControlledEnd.constructor=EntGraphicalEventControlledEnd;
EntGraphicalEventControlledEnd.superclass=EntGraphicalEvent.prototype;
EntGraphicalEventControlledEnd.prototype.applyOn=function(b,a){if(this._endCondition(this,b,a)){this.startTimer()
}this._runningFunction(this,b,this._element,a);
this._numIteration++
};
function EntSetting(c,b,a){this.id="new";
this.eventType=GraphicalSettings.EventType.ADD;
this.elementType=EntGL.ElementType.Particle;
this.defaultAction=b||function(f,g,d,e){};
this._condition=c||function(d){return true
};
this.duration=0;
this._isAdvancedEvent=false;
this._advConstructor=EntGraphicalEvent;
this._advProps=[]
}EntSetting.prototype={verifyCondition:function(a){return this._condition(a)
},configureForAdvEvent:function(b,a){this._advConstructor=b;
this._advProps=a;
this._isAdvancedEvent=true
},create:function(a){var b=null;
if(this._isAdvancedEvent){b=new this._advConstructor(a,this.defaultAction,this._advProps)
}else{b=new EntGraphicalEvent(a,this.defaultAction,this.duration)
}b.settingGen=this.id;
return b
}};
function ParticleCube(){this.dimension=1;
this.colorMaterial=Math.random()*16777215;
this.element=null
}ParticleCube.prototype={geometries:{CUBE01:new THREE.CubeGeometry(1,1,1),CUBE10:new THREE.CubeGeometry(10,10,10),CUBE20:new THREE.CubeGeometry(20,20,20),CUBE40:new THREE.CubeGeometry(40,40,40)},generator:function(b,d){var c=new THREE.MeshLambertMaterial({color:Math.random()*16777215});
var a=new THREE.Mesh(b,c);
a.material.ambient=a.material.color;
a.rotation=new THREE.Vector3(0,0,0);
a.scale=new THREE.Vector3(1,1,1);
a.castShadow=true;
a.receiveShadow=true;
return a
},create:function(){var b=new THREE.MeshLambertMaterial({color:this.colorMaterial});
var a=new THREE.Mesh(new THREE.CubeGeometry(this.dimension,this.dimension,this.dimension),b);
a.rotation=new THREE.Vector3(0,0,0);
a.scale=new THREE.Vector3(1,1,1);
a.castShadow=true;
a.receiveShadow=true;
this.element=a;
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
function ParticleBase(){this.entParticle=null;
this.element=null
}ParticleBase.prototype={create:function(){if((this.element!=null)&&(this.entParticle!=null)){this.linkToModel(this.entParticle)
}return this.element
},linkToModel:function(a){this.entParticle=a;
if(this.element==null){return
}this.element.relations=a.relations||[];
this.element.modelReference=a.id;
this.element.accelerations=new THREE.Vector3(0,0,0);
this.element.velocity=new THREE.Vector3(0,0,0)
},getElement:function(){return this.element
}};
ParticleGeomPrimitive.prototype=new ParticleBase();
ParticleGeomPrimitive.constructor=ParticleGeomPrimitive;
ParticleGeomPrimitive.superclass=ParticleBase.prototype;
function ParticleGeomPrimitive(){this.typePrimitive=null;
this.colorMaterial=Math.random()*16777215;
this.typeMaterial=null
}ParticleGeomPrimitive.Primitive={CUBE:"cube",SPHERE:"sphere"};
ParticleGeomPrimitive.Material={LAMBERT:"lambert",PHONG:"phong"};
ParticleGeomPrimitive.prototype.create=function(){var e=null,c=null;
switch(this.typeMaterial){case ParticleGeomPrimitive.Material.PHONG:e=new THREE.MeshPhongMaterial({color:this.colorMaterial});
break;
case ParticleGeomPrimitive.Material.LAMBERT:default:e=new THREE.MeshLambertMaterial({color:this.colorMaterial})
}switch(this.typePrimitive){case ParticleGeomPrimitive.Primitive.SPHERE:var a=this.radius||0.7,b=this.segments||10,f=this.rings||6;
c=new THREE.Mesh(new THREE.SphereGeometry(a,b,f),e);
break;
default:case ParticleGeomPrimitive.Primitive.CUBE:var g=this.dimension||1;
c=new THREE.Mesh(new THREE.CubeGeometry(g,g,g),e);
break
}c.rotation=new THREE.Vector3(0,0,0);
c.scale=new THREE.Vector3(1,1,1);
c.castShadow=true;
c.receiveShadow=true;
this.element=c;
return ParticleGeomPrimitive.superclass.create.call(this)
};
var RelationBase=function(){this.geometry=RelationBase.defaultGeometry;
this.entRelation=null;
this.lineColor={color:16724991};
this.material=new THREE.LineBasicMaterial(this.lineColor);
this.element=null
};
RelationBase.defaultGeometry=new THREE.Geometry();
RelationBase.defaultGeometry.vertices.push(new THREE.Vector3(0,0,0));
RelationBase.defaultGeometry.vertices.push(new THREE.Vector3(0,1,0));
RelationBase.prototype={createElement:function(){this.element=new THREE.Line(this.geometry,this.material)
},create:function(){if(this.entRelation==null){return null
}if(this.element==null){return null
}return this.element
},linkToModel:function(a){this.entRelation=a;
if(this.element==null){this.createElement()
}this.element.modelReference=[this.entRelation.idSource,this.entRelation.idDestination];
this.element.position=new THREE.Vector3(0,0,0)
},changeExtremis:function(a){this.linkToModel(a)
},getElemInSystem:function(c){var b,f,a=[null,null];
try{b=this.entRelation.idSource;
f=this.entRelation.idDestination;
a[0]=c.particles[b];
a[1]=c.particles[f]
}catch(d){}return a
},update:function(e,b){if(b==null){return
}var i=e.position,g=b.position;
this.element.position=i;
var h=g.clone().subSelf(i);
var a=h.length(),d=h.normalize();
var c=new THREE.Vector3(0,1,0).crossSelf(h);
var f=Math.acos(new THREE.Vector3(0,1,0).dot(d));
this.element.matrix=new THREE.Matrix4().makeRotationAxis(c.normalize(),f);
this.element.scale.set(a,a,a);
this.element.rotation.getRotationFromMatrix(this.element.matrix)
},getElement:function(){return this.element
}};
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
}}return h
},getForce:function(e,g,f){var d=1/Math.sqrt(f+BarnesHutConfig.epssq()),c=g.clone(),b=e.getMass();
if(c.lengthSq()<0.01){c.set(Math.random(),Math.random(),Math.random()).normalize()
}c.multiplyScalar(b*d*d*d/100);
return c
},configureFor:function(a){}};
var BarnesHutConfig={dtime:0.025,dthf:function(){return 0.5*BarnesHutConfig.dtime
},tol:0.5,itolsq:function(){return 1/(BarnesHutConfig.tol*BarnesHutConfig.tol)
},eps:0.5,epssq:function(){return BarnesHutConfig.eps*BarnesHutConfig.eps
}};
function Force(){this.selector=function(){return true
};
this.force=function(){};
this.type=Force.types.LOCAL
}Force.types={GLOBAL:"global",LOCAL:"local",ONRELATIONS:"onRelations"};
function attractionForce(a,c){var b=new Force();
b.type=Force.types.ONRELATIONS;
b.force=function(i,h){for(var f in i.relations){var g=i.relations[f],j=h.particles[g],e=0;
if(!j){return
}var k=j.position.clone().subSelf(i.position);
e=k.length();
if(e==0){k.set(Math.random(),Math.random(),Math.random())
}if(e<c-0.5){k.negate()
}else{if(e<c+0.5){continue
}}k.multiplyScalar(a);
i.accelerations.addSelf(k)
}log(i.modelReference+" -> "+i.accelerations.length(),"LOG"+i.modelReference,true)
};
return b
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
function EntElement(){this.type=EntGL.ElementType.PARTICLE;
this.description="This is an empty object of enterprise";
this.id=0
}EntElement.prototype={getDescription:function(){return this.getDescription()
},getId:function(){return this.id
},setId:function(a){this.id=a
},register:function(){EntObjects.register(this)
},unregister:function(){EntObjects.unregister(this)
}};
function EntEvent(){EntElement.call(this);
this.type=EntGL.ElementType.EVENT;
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
function EntModel(){this.timeline=[];
this.currentEventId="event0";
this.currentEventPos=0;
this.lastCheckSize=0;
this._hasChange=false;
new EntObjects()
}EntModel.prototype={init:function(){this.getTimeLine();
this.currentEventPos=0;
this.currentEventId=this.timeline[0].id
},getTimeLine:function(){this.timeline=EntObjects.instance.getEvents();
if(this.timeline.length==0){this.timeline=[new EntEvent()]
}return this.timeline.sort(function(d,c){return(d.date>c.date)-(d.date<c.date)
})
},getNextEvent:function(){if(this.timeline.length<=this.currentEventPos){return this.currentEventId
}var a=this.currentEventPos+1;
return this.timeline[a].id
},getPrevEvent:function(){if(this.currentEventPos<=0){return this.currentEventId
}var a=this.currentEventPos-11;
return this.timeline[a].id
},setToEvent:function(b,c){this._hasChange=true;
if(EntObjects.get(b)){this.currentEventId=b;
if(c){if(this.timeline[c].id==b){this.currentEventPos=c;
return c
}}for(var a in this.timeline){if(this.timeline[a].id==b){this.currentEventPos=a;
return a
}}}return null
},update:function(){},reset:function(){EntObjects.instance.objects={};
this.lastCheckSize=0
},addObjects:function(b){for(var a in b){var c=null;
switch(b[a].type){case"particle":c=new EntParticle();
break;
case"event":c=new EntEvent();
break;
default:continue
}c.setProperties(b[a]);
c.register()
}},hasChange:function(){if(this._hasChange){this._hasChange=false;
return true
}var a=0;
for(key in EntObjects.instance.objects){a++
}if(this.lastCheckSize!=a){this.lastCheckSize=a;
return true
}return false
}};
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
function EntRelation(a,b){this.type=EntGL.ElementType.RELATION;
this.idSource=a;
this.idDestination=b
}EntRelation.prototype=new EntElement();
EntRelation.prototype.constructor=EntRelation;
EntRelation.prototype.getSource=function(){return EntObjects.get(this.idSource)
};
EntRelation.prototype.getDestination=function(){return EntObject.get(this.idDestination)
};
function ContainerManager(a){this.container=document.getElementById(a.main);
this.infoContainer=document.getElementById(a.info)
}ContainerManager.prototype={writeInfo:function(a){this.infoContainer.innerHTML=a;
this.infoContainer.style.dysplay=true
},hiddenInfo:function(){this.infoContainer.style.dysplay=false
},add:function(a){this.container.appendChild(a)
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
n.push(p.id)
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
d.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:["part1","part2","part3","part4","part5","part6"]});
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
d.push(b.id)
}l.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:d});
l.register()
};
function SimulationTwoParticles(){var a=new EntEvent();
var c=new EntParticle(),b=new EntParticle();
c.setProperties({id:"part1",title:"Particella 01",definition:"Particella d'esempio numero 01",relations:[]});
c.register();
b.setProperties({id:"part2",title:"Particella 02",definition:"Particella d'esempio numero 02",relations:["part1"]});
b.register();
a.setProperties({id:"event0",nametime:new Date(),description:"A fist event for testing graphical system",objects:["part1","part2"]});
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
