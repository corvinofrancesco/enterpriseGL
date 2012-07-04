describe('Testing region', function(){
    var p1 = new Particle(1);
    var p2 = new Particle(2);
    var p3 = new Particle(3);
    var p4 = new Particle(4);
    var p5 = new Particle(5);
    var p6 = new Particle(6);
    var p7 = new Particle(7);
    var p8 = new Particle(8);
    p1.move(15,15,15);
    p2.move(12,8,8);
    p2.mass = 4;
    p3.move(8,12,8);
    p3.mass = 4;
    p4.move(12,12,8);
    p5.move(8,8,12);
    p6.move(12,8,12);
    p7.move(8,12,12);
    p8.move(12,12,12);
    
    describe('Initial number of childs', function(){
        var r = new Region(9,4,4);
        it('Control number of childs', function(){
            expect(r.childs.length).toBe(0);
        });
        it('Control childs undefined', function(){
            expect(r.testVar).toBe(false);
        });        
    });
    
    describe('Insert test of one particle', function(){
        var r1 = new Region(20,20,20);
       r1.insert(p1,40);
       it('Control number of childs', function(){
           expect(r1.childs.length).toBe(1);
       });
       it('Control childs undefined', function(){
           expect(r1.testVar).toBe(true);
       });        
    });
    
//    describe('Final number of childs', function(){
//        var r3 = new Region(10,10,10);        
//       it('Control number of childs', function(){
//           for(var i=0; i<8; i++) {
//               var p = new Particle(i).move(5+i,5,8);
//               r3.insert(p, 20);
//                expect(r3.childs.length).toBe(i+1);             
//           }
//       });        
//       it('Control childs undefined', function(){
//           expect(r3.testVar).toBe(true);
//       });        
//    });
    
    describe('Control child', function(){
        var r1 = new Region(20,20,20);
       r1.insert(p1,40);       
       it('Control child defined', function(){
           expect(r1.childs[0]).not.toBe(undefined);
       }); 
       it('Control child position', function(){
           expect(r1.childs[0].x).toBe(p1.x);
       });        
    });

    describe('Control two childs', function(){
        var r2 = new Region(10,10,10);
        r2.insert(p2,20);       
        r2.insert(p3,20);       
        it('Control child defined', function(){
            expect(r2.childs[1]).not.toBe(undefined);
        }); 
        it('Control child position', function(){
            expect(r2.childs[1].x).toBe(p2.x);
        });        

        it('Control child defined', function(){
             expect(r2.childs[2]).not.toBe(undefined);
        }); 
        it('Control child position', function(){
            expect(r2.childs[2].x).toBe(p3.x);
        });  
        it('Control center of mass', function(){
            var rr = r2.computeCenterOfMass();
            expect(rr.mass).toBe(8);
            expect(rr.x).toBe(10);
            expect(rr.y).toBe(10);
            expect(rr.z).toBe(8);
        });  
        

    });
       
});