EntGL.ContainerMng.panels.Simulations = new EntGL.Panel({
    comment: new EntGL.Field(function(){
        return "<span>Select the simulation to load:</span>"
    }),
    select: new EntGL.Field(function(){
        var opt, html = 
            "<select onchange='EntGL.Controller.configuration.simulations = this.value;'>";
        for(opt in EntGL.Simulations){
            html +=
                "<option value='"+ EntGL.Simulations[opt] +"' >" + opt + "</option>";
        }
        html +=
            "</select>";
        return html;
    }),
    change: new EntGL.Field(function(){
        var value = EntGL.Controller.configuration.simulations || "DistributionAlg";
        return "<input type='button' value='change' " + 
            "onclick='EntGL.System.changeDistribution( new " + 
            value + "())' >";
    })
});