describe("Distribution Suite",function(){
    var DistributionSuite = {
        regionbh: new EntGLTest.RegionBHTest()    
    };

    for(var i in DistributionSuite){
        DistributionSuite[i].run()
    }    
});