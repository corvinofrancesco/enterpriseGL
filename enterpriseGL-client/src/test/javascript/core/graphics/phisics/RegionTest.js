describe('Region Testing', function(){
    var p = [
        {position: new THREE.Vector3(15,15,15)},
        {position: new THREE.Vector3(12, 8, 8), getMass:function(){return 4;}},
        {position: new THREE.Vector3( 8,12, 8), getMass:function(){return 4;}},
        {position: new THREE.Vector3(12,12, 8)},
        {position: new THREE.Vector3( 8, 8,12)},
        {position: new THREE.Vector3(12, 8,12)},
        {position: new THREE.Vector3( 8,12,12)},
        {position: new THREE.Vector3(12,12,12)}
    ];
    
    describe('Testing constutor', function(){
        var r = new Region(9,4,4);
        it('Control number of childs', function(){
            expect(r.childs.length).toBe(0);
        });
       
    });
    
    describe('insert() Test', function(){
        var r1 = new Region(20,20,20);
        r1.insert(p[0],40);
        it('Control number of childs', function(){
           expect(r1.childs.length).toBe(1);
        });
    });
       
});