
function SimulationRandomGraph(){    
    var event0 = new EntEvent(),
    parts = [],
    numPart = 5000;

    for(var i =0;i<numPart;i++){
        var part = new EntParticle();        
        var relCasual = [],
        rndInd = Math.round(Math.random()* 5);
        for(var j =0;j<rndInd;j++) {
            var rndId = Math.round(Math.random()*numPart);
            var id = "part" + rndId;
            if(EntObjects.get(id)) relCasual.push(id);
        }
        part.setProperties({
            id: 'part' + i,
            title: "Particella "+ i,
            body: "Particella d'esempio numero "+i,
            relations: relCasual    
        });
        part.register();
        
        parts.push(part);
    }


    event0.setProperties({
        id: 'event0',
        nametime: new Date(),
        description: "A fist event for testing graphical system",
        objects: parts
    });
    event0.register();
}

