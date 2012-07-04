describe('Testing particle', function(){
    var p = new Particle(1);
    p.velocity = {x:2.0, y:4.0, z:6.0};
    p.accelerations = {x:2.0, y:1.0, z:2.0};
    
    describe('Testing advance function', function(){
        p.advance();
        it('Control position x', function(){
            expect(p.x).toBe(0.050625);
        });
//        it('Control position y', function(){
//            expect(p.y).toBe(0.1003125);
//        });
        it('Control position z', function(){
            expect(p.z).toBe(0.150625);
        });
        it('Control velocity x', function(){
            expect(p.velocity.x).toBe(2.05);
        });
        it('Control velocity y', function(){
            expect(p.velocity.y).toBe(4.025);
        });
//        it('Control velocity z', function(){
//            expect(p.velocity.z).toBe(6.05);
//        });
    });
    
    describe('Testing config parameters', function(){
        it('control barnesHutConfig dtime', function(){
           expect(BarnesHutConfig.dtime).toBe(0.025); 
        });
        it('control barnesHutConfig dthf', function(){
           expect(BarnesHutConfig.dthf()).toBe(0.0125); 
        });
    });

    describe('Testing recurseForce function', function(){                
    });

    describe('Testing computeForce function', function(){                
    });
});