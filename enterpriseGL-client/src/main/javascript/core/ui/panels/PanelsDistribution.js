EntGL.ContainerMng.panels.Distributions = new EntGL.Panel({
    comment: EntGL.Fields.Comment("Select the distribution to use:"),
    select: EntGL.Fields.Select("distribution", EntGL.DistributionAlgs),
    change: new EntGL.Field(function(){
        var value = EntGL.Controller.configuration.distribution || "DistributionAlg";
        return "<input type='button' value='change' " + 
            "onclick='EntGL.System.changeDistribution( new " + 
            value + "())' >";
    })
});