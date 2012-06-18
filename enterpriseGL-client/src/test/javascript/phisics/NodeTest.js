describe('Testing class Node',function(){
		
        afterEach(function(){
            
        });
        
        beforeEach(function() {

        });

        describe('Testing method add', function(){
            var n = new Node();
            it('Control if the init number is 0', function(){
                expect( n.size()).toBe(0);
            });

            it('Control if the array length is the same of the child numbers',function(){
                n.add("c");            
                expect(n.size()).toBe(1); 
            });

            it('Control if the array length is the same of the child numbers',function(){
               n.add("cd");            
               expect(n.size()).toBe(2); 
            });
            
        });
        
        describe('Testing method distance', function(){

            it('First control on y axis an no parameter', function(){
                var n = new Node();
                n.move(0,-10,0);
                expect(n.distance()).toBe(10);
            });
            
            it('Second control on x axis an parameters', function(){
                var n = new Node();
                n.move(-5,0,0);
                expect(n.distance({x:5,y:0,z:0})).toBe(10);
            });

            it('Third control general position', function(){
                var n = new Node();
                n.move(3,3,3);
                expect(n.quadDistance({x:-1,y:-1,z:-1})).toBe(48);
            });
            
        });
        
        describe('Testing method move', function(){
            var n = new Node();
            n.move(30,20,10);
            it('Control x position', function(){
                expect(n.x).toBe(30);
            });
            
            it('Controll y position', function(){
                expect(n.z).toBe(10);                
            });
            
            if('Control successive moviment', function(){
                n.move(0,0,10);
                expect(n.z).toBe(20);
            });
        });
        
        describe('Testing method forEach', function(){
            var n = new Node();
            for(var i =0;i<40; i++){
                var  c = new Node();
                c.id= "Node" + i;
                n.add(c);
            }
            n.forEach(function(subn){
               subn.move(10,10,10); 
            });
            
            it('Control if the position is changed for the first node',function(){
                expect(n.nodes[0].x).toBe(10);                            
            });
            
            it('Controll if the position is changed for the last note', function(){
               expect(n.nodes.pop().z).toBe(10);
            });
        });
        
        describe('Testing method contains', function(){
            var n = new Node();
            for(var i =0;i<40; i++){
                var  c = new Node();
                c.id= "Node" + i;                
                n.add(c);
            }
            
            it('Control if there is the node "Node34"', function(){
               expect(n.contains("Node34")).toBe(true); 
            });
            
            it('Control if there is the node "Node60"', function(){
               expect(n.contains("Node60")).toBe(false); 
            });                        
            
        });
        
});