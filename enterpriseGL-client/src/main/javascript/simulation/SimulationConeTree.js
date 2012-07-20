function SimulationConeTree(){
    var event0 = new EntEvent(),
    parts = [],
    numPart = 100,
    numLiv = 10,
    childMax = 5,
    levelDef = [{
        estr:1,
        row:1
    }],
    level = [1,0];
    
    for(var j=1; j<=numLiv; j++) {
        var numEstr = Math.floor(Math.random()*levelDef[j-1].estr * childMax + 1);
        var initRow = levelDef[j-1].estr + levelDef[j-1].row;
        levelDef[j] = {
            estr: numEstr,
            row: initRow
        };
    }
    for(var i =0;i<numPart;i++){
        var part = new EntParticle(),
        rel = [];
        if(i!=0){
            var succLev = level[i-1]+1, succ = levelDef[succLev];
            level[i] = (succ.row == i+1)?succLev:level[i-1];
            var idF = 0;
            if(level[i]!=1){
                var precLev = level[i]-1;
                idF = levelDef[precLev].row +
                    Math.floor(Math.random() * levelDef[precLev].estr);
            }
            var idFather = 'part' + idF;
            if(EntObjects.get(idFather)) rel.push(idFather);
            else alert(idFather + " non esiste!: " + levelDef[precLev].row + " - " 
                + (Math.floor(Math.random() * levelDef[precLev].estr)) );
        }
        part.setProperties({
            id: 'part' + i,
            title: "Particella "+ i,
            definition: "Particella d'esempio numero " + i,
            relations: rel
        });
        part.register();
        parts.push(part.id);
    }

    event0.setProperties({
        id: 'event0',
        nametime: new Date(),
        description: "Event for testing cone tree relations",
        objects: parts
    });
    event0.register();

}
