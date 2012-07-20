function SimulationTwoParticles(){    
    var event0 = new EntEvent();
    var part1 = new EntParticle(), 
        part2 = new EntParticle();
        
    part1.setProperties({
        id: 'part1',
        title: "Particella 01",
        definition: "Particella d'esempio numero 01",
        relations: []    
    });
    part1.register();

    part2.setProperties({
        id: 'part2',
        title: "Particella 02",
        definition: "Particella d'esempio numero 02",
        relations: ['part1']    
    });
    part2.register();

    event0.setProperties({
        id: 'event0',
        nametime: new Date(),
        description: "A fist event for testing graphical system",
        objects: ["part1", "part2"]
    });
    event0.register();
}
