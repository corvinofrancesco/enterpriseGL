describe("Distribution Suite",function(){
    var DistributionSuite = {
        regionbh: new EntGLTest.RegionBHTest(),
        graph: new EntGLTest.DistributionGraphTest()
        
    }, Configurations = {
        Points: [
            {position: new THREE.Vector3(15,15,15), relations: [], modelReference:"part1"},
            {position: new THREE.Vector3( 8, 8, 8), relations: ["part1"], modelReference:"part2"},
            {position: new THREE.Vector3(12, 8, 8), relations: ["part1"], modelReference:"part3"},
            {position: new THREE.Vector3( 8,12, 8), relations: ["part2"], modelReference:"part4"},
            {position: new THREE.Vector3(12,12, 8), relations: ["part2"], modelReference:"part5"},
            {position: new THREE.Vector3( 8, 8,12), relations: ["part2"], modelReference:"part6"},
            {position: new THREE.Vector3(12,12,16), relations: ["part3"], modelReference:"part7"},
            {position: new THREE.Vector3(12,12,16), relations: ["part3"], modelReference:"part9"},
            {position: new THREE.Vector3(12,12,17), relations: ["part3","part2"], modelReference:"part8"}
        ],
        
        Origin: { position: new THREE.Vector3(0,0,0),relations: [], modelReference:"0"},
    };

    for(var i in DistributionSuite){
        DistributionSuite[i].configure(Configurations);
        DistributionSuite[i].run()
    }    
});