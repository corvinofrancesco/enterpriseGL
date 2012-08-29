EntGL.ContainerMng.panels.Distributions = new EntGL.Panel({
    comment: new EntGL.Field(function(){
        return "<span>Select the distribution to use:</span>"
    }),
    select: new EntGL.Field(function(){
        var opt, html = 
            "<select onchange='EntGL.Controller.configuration.distribution = this.value;'>";
        for(opt in EntGL.DistributionAlgs){
            html +=
                "<option value='"+ EntGL.DistributionAlgs[opt] +"' >" + opt + "</option>";
        }
        html +=
            "</select>";
        return html;
    }),
    change: new EntGL.Field(function(){
        var value = EntGL.Controller.configuration.distribution || "DistributionAlg";
        return "<input type='button' value='change' " + 
            "onclick='EntGL.Graphics.system.changeDistribution( new " + 
            value + "())' >";
    })
});