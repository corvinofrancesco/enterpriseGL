/**
 * This class manage the enterprise data loading
 */
function Loader(){
    this.callback = EntModel.update;
    // set true when data from model is updated
    this.updated = false;
}

Loader.prototype = {
    /**
     * Start comunications for data exchange
     */
    setup : function() {
        //TODO implement initialization of comunication with server here
        
    },
    
    /**
     * Request for updates and wait response
     */
    wait : function(){
//        if(Loader.count>50) return;
//        //TODO implement ajax request to the server and callback        
//        var part = new EntParticle();
//        var relCasual = [],
//            rndInd = Math.round(Math.random()* 5);
//        for(var i =0;i<rndInd;i++) {
//            var rndId = Math.round(Math.random()*Loader.count);
//            var id = "part" + rndId;
//            if(EntObjects.get(id)) relCasual.push(id);
//        }
//        part.setProperties({
//            id: 'part' + Loader.count++,
//            title: "Particella " + Loader.count,
//            body: "Particella d'esempio numero " + Loader.count,
//            relations: relCasual    
//        });part.register();
//        
//        var firstEv = EntObjects.get("event0");
//        firstEv.objects.push(part);
        
    },
    
    isUpdated: function(){
        return this.updated;
    }
    
}

Loader.count = 20;

