//
//describe("Try jasmine", function(){
//   describe("Simulation of error ", function(){
//       it("Control if false is true", function(){
//          expect(false).toBe(true);          
//       });
//       
//       it("Control if false is not false", function(){
//          expect(false).not.toBe(false);                     
//       });
//   });
//   
//   describe("Correct test", function(){
//      var a = 45, b = 44;
//      
//      it("Control Math.min",function(){
//          expect(Math.min(a, b)).toBe(b);
//      });
//   });
//});












////describe('Testing simulation', function(){
//    var  sSystem = new SimulSystem();
//    var sys = new GraphicalSystem();
//    var numPar = 100, numRel = 120;
//
//    describe('Control particles creation', function(){
//        sSystem.createPart(sys,numPar);
//
//        it('Control number of particles created',function(){
//            expect(sys.size()).toBe(numPar);
//        });
//      
//    });
//    
//    describe('Control relations creation', function(){
//       sSystem.createRel(sys,numRel);
//       
//       it('Control number of relations created', function(){
//           expect(sys.relations.length).toBe(numRel);
//       })
//    });
//    
//    describe('Control verify indices', function() {
//        sSystem.createPart(sys, numPar);
//        var rels = new Array();
//        rels[0] = new Relation(1,2);
//        rels[1] = new Relation(4,6);
//        rels[2] = new Relation(3,5);
//        rels[3] = new Relation(7,2);
//        
//        it('Control function areIndexIn', function(){
//            expect(rels[1].areIndexIn(4,3)).toBe(false);
//            expect(rels[2].idD).toBe(5);
//            expect(rels[2].idS).toBe(3);            
//            expect(rels[2].areIndexIn(5,3)).toBe(true);
//            expect(rels[2].areIndexIn(3,5)).toBe(true);
//        });
//    })
//    
//});