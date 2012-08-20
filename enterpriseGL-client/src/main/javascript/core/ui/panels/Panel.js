EntGL.Panel = function(){
    this.panelName = "unknow";
    this.panelId = "unknow"
    this.fields = {};
}

EntGL.Panel.Style = {
    Class: "EntGLPanel",
}

EntGL.Panel.prototype = {
    /**
     * Take object properties init for <code>change</code>
     */
    linkTo: function(object){
        for(var p in object){
            if(object[p] instanceof Function)
                if(p.search("change") != -1){
                    
                }
        }
    },
    
    toString: function(){
        var html = 
            "<div " +
                "id='" + this.panelId + "' " +
                "class='" + EntGL.Panel.Style.Class + "'>" +
                "<h3>" + this.panelName + "</h3>";
        for(var f in this.fields){
            
        }
        html+= "</div>";
        return html;
    }
}