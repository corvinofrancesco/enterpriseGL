/*******************************************************************************
 * Simulation
 */
function SimulationLittleSystem(){    
    var event0 = new EntEvent();
    var part1 = new EntParticle(), 
    part2 = new EntParticle(), 
    part3 = new EntParticle(),
    part4 = new EntParticle(),
    part5 = new EntParticle(),
    part6 = new EntParticle();

    part1.setProperties({
        id: 'part1',
        title: "Particella 01",
        definition: "Particella d'esempio numero 01",
        relations: ['part2','part3']    
    });
    part1.register();

    part2.setProperties({
        id: 'part2',
        title: "Particella 02",
        definition: "Particella d'esempio numero 02",
        relations: ['part3']    
    });
    part2.register();

    part3.setProperties({
        id: 'part3',
        title: "Particella 03",
        definition: "Particella d'esempio numero 03",
        relations: []    
    });
    part3.register();

    part4.setProperties({
        id: 'part4',
        title: "Particella 04",
        definition: "Particella d'esempio numero 04",
        relations: ['part1','part2']    
    });
    part4.register();

    part5.setProperties({
        id: 'part5',
        title: "Particella 05",
        definition: "Particella d'esempio numero 05",
        relations: ['part3','part2']    
    });
    part5.register();

    part6.setProperties({
        id: 'part6',
        title: "Particella 06",
        definition: "Particella d'esempio numero 06",
        relations: ['part1']    
    });
    part6.register();

    event0.setProperties({
        id: 'event0',
        nametime: new Date(),
        description: "A fist event for testing graphical system",
        objects: [part1, part2, part3,part4,part5,part6]
    });
    event0.register();
}